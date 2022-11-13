import { createSlice } from "@reduxjs/toolkit";


export const constructorSlice = createSlice({
    name: 'constructor',
    initialState: {
        bun: null,
        ingredients: []
    },
    reducers: {
        setBun (state, { payload }) {
            state.bun = payload
        },
        removeBun (state) {
            state.bun = null
        },
        addIngredient (state, { payload }) {
            state.ingredients.push(payload)
        },
        removeIngredient (state, { payload }) {
            state.ingredients = state.ingredients.filter(el => el.uuid !== payload)
        }
    }
})

export const {
    setBun,
    removeBun,
    addIngredient,
    removeIngredient
} = constructorSlice.actions

export const constructorReducer = constructorSlice.reducer