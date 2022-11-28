import { createSlice } from "@reduxjs/toolkit";
import { handleError } from "../../utils/request";
// import { fetchLogin, fetchRegister } from "../actions/auth-actions";

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

function match(value, action) {
  return action.type.startsWith("auth") && action.type.endsWith(value);
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // setName(state, { payload }) {
    //   state.name = payload;
    // },
    // setEmail(state, { payload }) {
    //   state.email = payload;
    // },
    // setPassword(state, { payload }) {
    //   state.password = payload;
    // },
  },
  extraReducers: (builder) =>
    builder
      .addMatcher(
        (action) => match("/fulfilled", action),
        (state, { payload: { accessToken, refreshToken, user } }) => {
          const BEARER = "Bearer ";
          const removeBearer = (str) =>
            str.startsWith(BEARER) ? str.slice(BEARER.length) : str;
          return {
            ...state,
            accessToken: removeBearer(accessToken),
            refreshToken: removeBearer(refreshToken),
            email: user.email,
            name: user.name,
            loading: false,
            error: false,
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
