import { configureStore } from "@reduxjs/toolkit";
import { ingredientsReducer } from "./slices/ingredients-slice";
import { constructorReducer } from "./slices/constructor-slice";
import { orderReducer } from "./slices/order-slice";
import { ingredientDetailsReducer } from "./slices/ingredient-details-slice";
import { profileReducer } from "./slices/profile-slice";

export const store = configureStore({
  reducer: {
    ingredientsReducer,
    constructorReducer,
    orderReducer,
    ingredientDetailsReducer,
    profileReducer,
  },
});
