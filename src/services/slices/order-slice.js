import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";
import { nameGenerator } from "../../utils/store-utils";
import {
    request,
    handleError
} from "../../utils/request";
import { ORDERS_URL } from "../../utils/constants";

const name = 'order'

const orderNameGenerator = nameGenerator(name)

export const fetchOrder = createAsyncThunk(
    orderNameGenerator('request'),
    async (body) =>
        request(ORDERS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        })
)

const initialState = {
    orderNumber: null,
    loading: false,
    error: false
}

export const orderSlice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(fetchOrder.fulfilled, (_, { payload }) => {
                return {
                    orderNumber: payload.order.number,
                    error: false,
                    loading: false
                }
            })
            .addCase(fetchOrder.rejected, (_, action) => {
                handleError(action.error.message)
                return {
                    ...initialState,
                    error: true
                }
            })
            .addCase(fetchOrder.pending, (state) => {
                state.error = false
                state.loading = true
            })
})

export const {

} = orderSlice.actions

export const orderReducer = orderSlice.reducer
