import { createSlice } from "@reduxjs/toolkit";
import { handleError } from "../../utils/request";
import { fetchIngredients } from "../actions/ingredients-actions";

const initialState = {
  loading: false,
  error: false,
  data: [],
};

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setData(state, { payload }) {
      state.data = payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchIngredients.fulfilled, (_, action) => {
        return {
          data: action.payload.data,
          error: false,
          loading: false,
        };
      })
      .addCase(fetchIngredients.rejected, (_, action) => {
        handleError(action.error.message);
        return {
          ...initialState,
          error: true,
        };
      })
      .addCase(fetchIngredients.pending, (state) => {
        state.error = false;
        state.loading = true;
      }),
});

export const { setData } = ingredientsSlice.actions;

export const ingredientsReducer = ingredientsSlice.reducer;
