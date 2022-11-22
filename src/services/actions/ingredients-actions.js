import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../utils/request";
import { INGREDIENTS_URL } from "../../utils/constants";

export const fetchIngredietns = createAsyncThunk(
    `ingredients/request`,
    async () => await request(INGREDIENTS_URL)
)
