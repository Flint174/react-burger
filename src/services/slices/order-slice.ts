import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { handleError } from "../../utils/request";
import { Order } from "../../utils/types";
import { fetchOrderGet, fetchOrderRegister } from "../actions/order-actions";

interface OrderStoreState {
  order: Order | null;
  loading: boolean;
  error: boolean;
}

const initialState: OrderStoreState = {
  order: null,
  loading: false,
  error: false,
};

const isAFulfilledAction = isFulfilled(fetchOrderGet, fetchOrderRegister);

const isARejectedAction = isRejected(fetchOrderGet, fetchOrderRegister);

const isAPendingdAction = isPending(fetchOrderGet, fetchOrderRegister);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrder() {
      return initialState;
    },
  },
  extraReducers: (builder) =>
    builder
      .addMatcher(isAFulfilledAction, (_, { payload: { order } }) => ({
        order,
        error: false,
        loading: false,
      }))
      .addMatcher(isAPendingdAction, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addMatcher(isARejectedAction, (_, action) => {
        handleError(action.error.message || "GerOrderError");
        return {
          ...initialState,
          error: true,
        };
      }),
});

export const { clearOrder } = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
