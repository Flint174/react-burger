import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { IngredientType } from "../../utils/types";

interface IngredientUuidType extends IngredientType {
  uuid: string;
}
type BunType = IngredientType | null;

interface ConstructorStoreState {
  bun: BunType;
  ingredients: IngredientUuidType[];
}

const initialState: ConstructorStoreState = {
  bun: null,
  ingredients: [],
};

export const constructorSlice = createSlice({
  name: "constructor",
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<BunType>) {
      state.bun = action.payload;
    },
    removeBun(state) {
      state.bun = null;
    },
    addIngredient: {
      prepare: (ingredient: IngredientType) => ({
        payload: { ...ingredient, uuid: uuidv4() },
      }),
      reducer: (state, action: PayloadAction<IngredientUuidType>) => {
        state.ingredients.push(action.payload);
      },
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (el) => el.uuid !== action.payload
      );
    },
    moveIngredient(
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) {
      const { dragIndex, hoverIndex } = action.payload;
      state.ingredients.splice(
        hoverIndex,
        0,
        state.ingredients.splice(dragIndex, 1)[0]
      );
    },
    clearConstructor() {
      return initialState;
    },
  },
});

export const {
  setBun,
  removeBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
} = constructorSlice.actions;

export const constructorReducer = constructorSlice.reducer;
