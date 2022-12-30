import { createListenerMiddleware } from "@reduxjs/toolkit";
import { connect, disconnect } from "../slices/orders-feed-slice";

// export const ordersFeedWsMiddleware = ordersFeedWs.middleware;
export const ordersFeedWsMiddleware = () => {
  const ordersFeedWs = createListenerMiddleware();

  ordersFeedWs.startListening({
    actionCreator: connect,
    effect: async (action, api) => {
      // const ws = new WebSocket()
    },
  });

  return ordersFeedWs.middleware;
};
