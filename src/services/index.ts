import { configureStore } from "@reduxjs/toolkit";
import { ingredientsReducer } from "./slices/ingredients-slice";
import { constructorReducer } from "./slices/constructor-slice";
import { orderReducer } from "./slices/order-slice";
import { authReducer } from "./slices/auth-slice";

export const store = configureStore({
  reducer: {
    ingredientsReducer,
    constructorReducer,
    orderReducer,
    authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
