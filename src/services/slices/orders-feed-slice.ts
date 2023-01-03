import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestDataOrders } from "../../utils/types";

type OrdersFeedState = Omit<RequestDataOrders, "success">;

const initialState: OrdersFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
};

export const ordersFeedSlice = createSlice({
  name: "ordersFeed",
  initialState,
  reducers: {
    set: (_, action: PayloadAction<OrdersFeedState>) => action.payload,
    clear: () => initialState,
  },
});

export const { set, clear } = ordersFeedSlice.actions;
export const ordersFeedReducer = ordersFeedSlice.reducer;
