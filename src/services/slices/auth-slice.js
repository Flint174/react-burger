import { createSlice } from "@reduxjs/toolkit";
import {
  accessTokenOpts,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
} from "../../utils/constants";
import { deleteCookie, setCookie } from "../../utils/cookie";
import { handleError } from "../../utils/request";
import { fetchLogout, fetchUserPatch } from "../actions/auth-actions";

const initialState = {
  user: null,
  loading: false,
  error: false,
};

function match(action, value) {
  if (action.type.startsWith("auth")) {
    if (Array.isArray(value)) {
      for (const v of value) {
        if (action.type.endsWith(v)) return true;
      }
    } else if (action.type.endsWith(value)) return true;
  }
  return false;
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchLogout.fulfilled, () => {
        deleteCookie(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        return initialState;
      })
      .addCase(fetchUserPatch.rejected, (state) => {
        deleteCookie(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        return {
          ...initialState,
          error: true,
        };
      })
      .addMatcher(
        (action) =>
          match(action, ["user/get/fulfilled", "user/patch/fulfilled"]),
        (state, { payload: { user } }) => {
          state.user = user;
        }
      )
      .addMatcher(
        (action) => match(action, ["login/fulfilled", "register/fulfilled"]),
        (state, { payload: { accessToken, refreshToken, user } }) => {
          setCookie(ACCESS_TOKEN, accessToken, accessTokenOpts);
          localStorage.setItem(REFRESH_TOKEN, refreshToken);
          state.user = user;
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => match(action, "/pending"),
        (state) => {
          state.loading = true;
          state.error = false;
        }
      )
      .addMatcher(
        (action) => match(action, "/rejected"),
        (_, { error }) => {
          handleError(error);
        }
      ),
});

export const { setName, setEmail, setPassword } = authSlice.actions;

export const authReducer = authSlice.reducer;
