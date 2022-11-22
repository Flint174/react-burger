import { createSlice } from "@reduxjs/toolkit";

export const ingredientDetailsSlice = createSlice({
    name: 'ingredientDetails',
    initialState: null,
    reducers: {
        setDetails (_, { payload }) {
            return payload
        },
        clearDetails () {
            return null
        }
    }
})

export const {
    setDetails,
    clearDetails
} = ingredientDetailsSlice.actions

export const ingredientDetailsReducer = ingredientDetailsSlice.reducer
