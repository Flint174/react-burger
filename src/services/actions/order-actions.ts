import { createAsyncThunk } from "@reduxjs/toolkit";
import { request, requestHeaders } from "../../utils/request";
import { ACCESS_TOKEN, ORDERS_URL } from "../../utils/constants";
import { getCookie } from "../../utils/cookie";
import { RequestDataBase } from "../../utils/types";

export interface RequestBodyOrder {
  ingredients: number[];
}

export interface RequestDataOrder extends RequestDataBase {
  order: {
    number: number;
  };
}

export const fetchOrder = createAsyncThunk(
  `order/request`,
  async (body: RequestBodyOrder) =>
    request<RequestDataOrder>(ORDERS_URL, {
      method: "POST",
      headers: {
        ...requestHeaders.post,
        authorization: getCookie(ACCESS_TOKEN) || "",
      },
      body: JSON.stringify(body),
    })
);
