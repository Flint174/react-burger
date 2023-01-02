import { createListenerMiddleware } from "@reduxjs/toolkit";
import { RequestDataOrders, RequestDataMessage } from "../../utils/types";
import { fetchUserGet } from "../actions/auth-actions";
import {
  ordersWsConnect,
  ordersWsDisconnect,
} from "../actions/orders-ws-actions";
import { clear, set } from "../slices/orders-feed-slice";

function isDataOrders(
  data: RequestDataOrders | RequestDataMessage
): data is RequestDataOrders {
  return Object.hasOwn(data, "orders");
}

function isDataMessage(
  data: RequestDataOrders | RequestDataMessage
): data is RequestDataMessage {
  return Object.hasOwn(data, "message");
}

export const createOrdersFeedWs = () => {
  const ordersFeedWs = createListenerMiddleware();

  ordersFeedWs.startListening({
    actionCreator: ordersWsConnect,
    effect: async (action, { dispatch }) => {
      const url = action.payload;
      let reconnect = true;

      const createSocket = () => {
        let ws = new WebSocket(url);
        ws.onopen = (e) => {
          //   console.log("open", e);
          reconnect = true;
          dispatch(clear());
        };

        ws.onclose = (e) => {
          //   console.log("close", e);
          setTimeout(() => {
            if (reconnect) {
              ws = createSocket();
            }
          }, 1000);
        };

        ws.onmessage = (e: MessageEvent<string>) => {
          //   console.log("message", e);
          try {
            const data = JSON.parse(e.data) as
              | RequestDataOrders
              | RequestDataMessage;
            if (data) {
              if (data.success) {
                if (isDataOrders(data)) {
                  dispatch(set(data.orders));
                }
              } else if (
                isDataMessage(data) &&
                data.message === "Invalid or missing token"
              ) {
                dispatch(fetchUserGet());
              }
            }
          } catch (error) {
            console.error(error);
          }
        };

        ws.onerror = (e) => {
          console.error(e);
        };
        return ws;
      };

      let ws = createSocket();

      ordersFeedWs.startListening({
        actionCreator: ordersWsDisconnect,
        effect: async (action, api) => {
          reconnect = false;
          ws.close();
        },
      });
    },
  });

  return ordersFeedWs;
};

export const ordersFeedWs = createOrdersFeedWs();
