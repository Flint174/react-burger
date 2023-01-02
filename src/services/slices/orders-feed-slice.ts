import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../../utils/types";

const initialState: Order[] = [];

function orderValidate(order: Order): boolean {
  return (
    typeof order._id === "string" &&
    Array.isArray(order.ingredients) &&
    typeof order.number === "number" &&
    typeof order.status === "string"
  );
}

export const ordersFeedSlice = createSlice({
  name: "ordersFeed",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Order | Order[]>) => {
      console.log({ action });
      const newState = new Map<string, Order>(
        state.map((order) => [order._id, order])
      );
      if (Array.isArray(action.payload)) {
        action.payload
          .filter((order) => orderValidate(order))
          .forEach((order) => newState.set(order._id, order));
      } else {
        if (orderValidate(action.payload)) {
          newState.set(action.payload._id, action.payload);
        }
      }
      return Array.from(newState.values());
    },
    clear: () => [],
  },
});

export const { set, clear } = ordersFeedSlice.actions;
export const ordersFeedReducer = ordersFeedSlice.reducer;
