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
        },
        moveIngredient (state, { payload }) {
            const { dragIndex, hoverIndex } = payload
            state.ingredients.splice(hoverIndex, 0, state.ingredients.splice(dragIndex, 1)[0])
        }
    }
})

export const {
    setBun,
    removeBun,
    addIngredient,
    removeIngredient,
    moveIngredient
} = constructorSlice.actions

export const constructorReducer = constructorSlice.reducer
