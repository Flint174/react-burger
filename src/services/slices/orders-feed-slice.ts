import { createSlice } from "@reduxjs/toolkit";
import { Order } from "../../utils/types";

const initialState: Order[] = [];

export const ordersFeedSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    connect: () => {},
    disconnect: () => {},
  },
});

export const { connect, disconnect } = ordersFeedSlice.actions;
export const ordersFeedReducer = ordersFeedSlice.reducer;
