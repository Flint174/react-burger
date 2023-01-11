import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWithRefresh, request, requestHeaders } from "../../utils/request";
import { ACCESS_TOKEN, ORDERS_URL } from "../../utils/constants";
import { getCookie } from "../../utils/cookie";
import { Order, RequestDataBase } from "../../utils/types";

export interface RequestBodyOrder {
  ingredients: string[];
}

export interface RequestDataOrder extends RequestDataBase {
  order: Order;
}

export interface RequestDataOrders extends RequestDataBase {
  orders: Order[];
}

export const fetchOrderRegister = createAsyncThunk(
  `order/register`,
  async (body: RequestBodyOrder) =>
    fetchWithRefresh<RequestDataOrder>(ORDERS_URL, {
      method: "POST",
      headers: {
        ...requestHeaders.post,
        authorization: getCookie(ACCESS_TOKEN) || "",
      },
      body: JSON.stringify(body),
    })
);

export const fetchOrderGet = createAsyncThunk(
  `order/get`,
  async (number: string) =>
    request<RequestDataOrders>(`${ORDERS_URL}/${number}`)
);
