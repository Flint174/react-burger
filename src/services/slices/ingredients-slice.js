import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";
import { nameGenerator } from "../../utils/store-utils";
import {
    request,
    handleError
} from "../../utils/request";
import { INGREDIENTS_URL } from "../../utils/constants";

const name = 'ingredients'

const ingredientsNameGenerator = nameGenerator(name)

export const fetchData = createAsyncThunk(
    ingredientsNameGenerator('request'),
    async () => await request(INGREDIENTS_URL)
)

const initialState = {
    loading: false,
    error: false,
    data: []
}

export const ingredientsSlice = createSlice({
    name,
    initialState,
    reducers: {
        setData (state, { payload }) {
            state.data = payload
        }
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchData.fulfilled, (_, action) => {
                return {
                    data: action.payload.data,
                    error: false,
                    loading: false
                }
            })
            .addCase(fetchData.rejected, (_, action) => {
                handleError(action.error.message)
                return {
                    ...initialState,
                    error: true
                }
            })
            .addCase(fetchData.pending, (state) => {
                state.error = false
                state.loading = true
            })
})

export const { setData } = ingredientsSlice.actions

export const ingredientsReducer = ingredientsSlice.reducer
