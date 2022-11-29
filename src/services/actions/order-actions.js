import { createAsyncThunk } from "@reduxjs/toolkit";
import { request, requestHeaders } from "../../utils/request";
import { ORDERS_URL } from "../../utils/constants";

export const fetchOrder = createAsyncThunk(`order/request`, async (body) =>
  request(ORDERS_URL, {
    method: "POST",
    headers: requestHeaders.post,
    body: JSON.stringify(body),
  })
);
