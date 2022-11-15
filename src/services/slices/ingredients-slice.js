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
    async () =>
        await request(INGREDIENTS_URL)

    // pending timeout
    // new Promise(resolve => setTimeout(() => resolve(request(INGREDIENTS_URL)), 3000))

    // error
    // await request(INGREDIENTS_URL + 'l')
)

export const ingredientsSlice = createSlice({
    name,
    initialState: {
        loading: false,
        error: false,
        data: []
    },
    reducers: {
        setData (state, { payload }) {
            state.data = payload
        },
        // setLoading (state, { payload }) {
        //     console.log('setLoading', payload)
        //     state.loading = payload
        // }
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchData.fulfilled, (state, action) => {
                return {
                    data: action.payload.data,
                    error: false,
                    loading: false
                }
            })
            .addCase(fetchData.rejected, (state, action) => {
                handleError(action.error.message)
                state.error = true
            })
            .addCase(fetchData.pending, (state, action) => {
                state.error = false
                state.loading = true
            })
})

export const {
    setData,
    setLoading
} = ingredientsSlice.actions

export const ingredientsReducer = ingredientsSlice.reducer
