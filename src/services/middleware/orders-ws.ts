import { createListenerMiddleware } from "@reduxjs/toolkit";
import { RequestDataOrders, RequestDataMessage } from "../../utils/types";
import { fetchUserGet } from "../actions/auth-actions";
import {
  ordersWsConnect,
  ordersWsDisconnect,
} from "../actions/orders-ws-actions";
import { clear, set } from "../slices/orders-feed-slice";

function isOrders(
  data: RequestDataOrders | RequestDataMessage
): data is RequestDataOrders {
  return data.success;
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
          reconnect = true;
          dispatch(clear());
        };

        ws.onclose = (e) => {
          setTimeout(() => {
            if (reconnect) {
              ws = createSocket();
            }
          }, 1000);
        };

        ws.onmessage = (e: MessageEvent<string>) => {
          try {
            const data = JSON.parse(e.data) as
              | RequestDataOrders
              | RequestDataMessage;
            if (isOrders(data)) {
              dispatch(set(data));
            } else if (data.message === "Invalid or missing token") {
              dispatch(fetchUserGet());
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
        effect: async () => {
          reconnect = false;
          ws.close();
        },
      });
    },
  });

  return ordersFeedWs;
};

export const ordersFeedWs = createOrdersFeedWs();
