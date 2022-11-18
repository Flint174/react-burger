import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    bun: null,
    ingredients: []
}

export const constructorSlice = createSlice({
    name: 'constructor',
    initialState,
    reducers: {
        setBun (state, { payload }) {
            state.bun = payload
        },
        removeBun (state) {
            state.bun = null
        },
        addIngredient: {
            reducer: (state, { payload }) => {
                state.ingredients.push(payload)
            },
            prepare: (ingredient) => ({ payload: { ...ingredient, uuid: uuidv4() } })
        },
        removeIngredient (state, { payload }) {
            state.ingredients = state.ingredients.filter(el => el.uuid !== payload)
        },
        moveIngredient (state, { payload }) {
            const { dragIndex, hoverIndex } = payload
            state.ingredients.splice(hoverIndex, 0, state.ingredients.splice(dragIndex, 1)[0])
        },
        clearConstructor () {
            return { ...initialState }
        }
    }
})

export const {
    setBun,
    removeBun,
    addIngredient,
    removeIngredient,
    moveIngredient,
    clearConstructor
} = constructorSlice.actions

export const constructorReducer = constructorSlice.reducer
