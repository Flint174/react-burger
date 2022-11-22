import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../utils/request";
import { ORDERS_URL } from "../../utils/constants";

export const fetchOrder = createAsyncThunk(
    `order/request`,
    async (body) =>
        request(ORDERS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
)
