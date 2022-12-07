import { createAsyncThunk } from "@reduxjs/toolkit";
import { request, requestHeaders } from "../../utils/request";
import { ACCESS_TOKEN, ORDERS_URL } from "../../utils/constants";
import { getCookie } from "../../utils/cookie";

export const fetchOrder = createAsyncThunk(`order/request`, async (body) =>
  request(ORDERS_URL, {
    method: "POST",
    headers: {
      ...requestHeaders.post,
      authorization: getCookie(ACCESS_TOKEN),
    },
    body: JSON.stringify(body),
  })
);
