import { createSlice } from "@reduxjs/toolkit";

export const ingredientDetailsSlice = createSlice({
    name: 'ingredientDetails',
    initialState: null,
    reducers: {
        setDetails (_, { payload }) {
            return { ...payload }
        }
    }
})

export const {
    setDetails
} = ingredientDetailsSlice.actions

export const ingredientDetailsReducer = ingredientDetailsSlice.reducer
