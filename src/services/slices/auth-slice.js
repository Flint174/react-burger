import { createSlice } from "@reduxjs/toolkit";
import { handleError } from "../../utils/request";
import { fetchToken } from "../actions/auth-actions";

const initialState = {
  user: {
    name: "",
    email: "",
  },
  accessToken: "",
  refreshToken: "",
  loading: false,
  error: false,
};

const BEARER = "Bearer ";
const removeBearer = (str) =>
  str.startsWith(BEARER) ? str.slice(BEARER.length) : str;

function match(value, action) {
  return action.type.startsWith("auth") && action.type.endsWith(value);
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(
        fetchToken.fulfilled,
        (state, { payload: { accessToken, refreshToken } }) => {
          return {
            ...state,
            accessToken: removeBearer(accessToken),
            refreshToken: refreshToken(refreshToken),
            loading: false,
          };
        }
      )
      .addMatcher(
        (action) => match("/fulfilled", action),
        (state, { payload: { accessToken, refreshToken, user } }) => {
          return {
            ...state,
            accessToken: removeBearer(accessToken),
            refreshToken: removeBearer(refreshToken),
            user,
            loading: false,
          };
        }
      )
      .addMatcher(
        (action) => match("/pending", action),
        (state) => {
          state.loading = true;
          state.error = false;
        }
      )
      .addMatcher(
        (action) => match("/rejected", action),
        (_, { error }) => {
          handleError(error);
        }
      ),
});

export const { setName, setEmail, setPassword } = authSlice.actions;

export const authReducer = authSlice.reducer;
