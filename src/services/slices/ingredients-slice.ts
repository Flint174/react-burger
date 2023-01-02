import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleError } from "../../utils/request";
import { IngredientType } from "../../utils/types";
import { fetchIngredients } from "../actions/ingredients-actions";

interface IngredientsStoreState {
  loading: boolean;
  error: boolean;
  data: IngredientType[];
}

const initialState: IngredientsStoreState = {
  loading: false,
  error: false,
  data: [],
};

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<IngredientType[]>) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchIngredients.fulfilled, (_, { payload: { data } }) => {
        return {
          data,
          error: false,
          loading: false,
        };
      })
      .addCase(fetchIngredients.rejected, (_, { error: { message } }) => {
        handleError(message || "Get ingredeints error");
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
