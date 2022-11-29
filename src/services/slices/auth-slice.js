import { createSlice } from "@reduxjs/toolkit";
import { setCookie } from "../../utils/cookie";
import { handleError } from "../../utils/request";
import { fetchLogout, fetchToken } from "../actions/auth-actions";

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

function match(action, value) {
  if (action.type.startsWith("auth")) {
    if (Array.isArray(value)) {
      for (const v of value) {
        if (action.type.endsWith(v)) return true;
      }
    } else if (action.type.endsWith(value)) return true;
  }
  //   return action.type.startsWith("auth") && action.type.endsWith(value);
  return false;
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
          setCookie("refreshToken", refreshToken);
          return {
            ...state,
            accessToken: removeBearer(accessToken),
            refreshToken: refreshToken,
            loading: false,
          };
        }
      )
      .addCase(fetchLogout.fulfilled, () => {
        setCookie("refreshToken", "");
        return initialState;
      })
      .addMatcher(
        (action) => match(action, ["login/fulfilled", "register/fulfilled"]),
        (state, { payload: { accessToken, refreshToken, user } }) => {
          setCookie("refreshToken", refreshToken, { expires: 20 * 60 });
          return {
            ...state,
            accessToken: removeBearer(accessToken),
            refreshToken: refreshToken,
            user,
            loading: false,
          };
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
