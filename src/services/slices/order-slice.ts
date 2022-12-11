import { createSlice } from "@reduxjs/toolkit";
import { handleError } from "../../utils/request";
import { fetchOrder } from "../actions/order-actions";

interface OrderStoreState {
  orderNumber: number | null;
  loading: boolean;
  error: boolean;
}

const initialState: OrderStoreState = {
  orderNumber: null,
  loading: false,
  error: false,
};

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
      .addCase(
        fetchOrder.fulfilled,
        (
          _,
          {
            payload: {
              order: { number },
            },
          }
        ) => {
          return {
            orderNumber: number,
            error: false,
            loading: false,
          };
        }
      )
      .addCase(fetchOrder.rejected, (_, action) => {
        handleError(action.error.message || "Ger order error");
        return {
          ...initialState,
          error: true,
        };
      })
      .addCase(fetchOrder.pending, (state) => {
        state.error = false;
        state.loading = true;
      }),
});

export const { clearOrder } = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
