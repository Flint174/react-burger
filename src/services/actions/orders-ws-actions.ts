import { createAction } from "@reduxjs/toolkit";

export const ordersWsConnect = createAction<string>("ORDERS_WS_CONNECT");
export const ordersWsDisconnect = createAction("ORDERS_WS_DISCONNECT");
export const ordersWsSend = createAction<string>("ORDERS_WS_SEND");
