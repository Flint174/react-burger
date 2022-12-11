import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../utils/request";
import { INGREDIENTS_URL } from "../../utils/constants";
import { IngredientType, RequestDataBase } from "../../utils/types";

export interface RequestDataIngredients extends RequestDataBase {
  data: IngredientType[];
}

export const fetchIngredients = createAsyncThunk(
  `ingredients/request`,
  async () => await request<RequestDataIngredients>(INGREDIENTS_URL)
);
