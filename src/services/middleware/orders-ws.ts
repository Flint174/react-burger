import { createListenerMiddleware } from "@reduxjs/toolkit";
import {
  RequestDataOrders,
  RequestDataMessage,
  Order,
  RequestDataBase,
} from "../../utils/types";
import { fetchUserGet } from "../actions/auth-actions";
import {
  ordersWsConnect,
  ordersWsDisconnect,
} from "../actions/orders-ws-actions";
import { clear, set } from "../slices/orders-feed-slice";

function isDataMessage(data: unknown): data is RequestDataMessage {
  return (
    typeof data === "object" &&
    data !== null &&
    "message" in data &&
    typeof data.message === "string"
  );
}

function isDataSuccess(data: unknown): data is RequestDataBase {
  return (
    typeof data === "object" &&
    data !== null &&
    "success" in data &&
    typeof data.success === "boolean"
  );
}

function isOrder(data: unknown): data is Order {
  return (
    typeof data === "object" &&
    data !== null &&
    "_id" in data &&
    typeof data._id === "string" &&
    "ingredients" in data &&
    Array.isArray(data.ingredients) &&
    "number" in data &&
    typeof data.number === "number" &&
    "status" in data &&
    typeof data.status === "string" &&
    "name" in data &&
    typeof data.name === "string"
  );
}

function isDataOrders(data: unknown): data is RequestDataOrders {
  return (
    typeof data === "object" &&
    data !== null &&
    "orders" in data &&
    Array.isArray(data.orders) &&
    "total" in data &&
    typeof data.total === "number" &&
    "totalToday" in data &&
    typeof data.totalToday === "number"
  );
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
            const data = JSON.parse(e.data);
            if (isDataSuccess(data)) {
              if (data.success) {
                if (isDataOrders(data)) {
                  data.orders = data.orders.filter((order) => isOrder(order));
                  dispatch(set(data));
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
