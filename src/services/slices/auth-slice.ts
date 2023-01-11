import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/constants";
import { deleteCookie, setCookie } from "../../utils/cookie";
import { handleError } from "../../utils/request";
import { AuthUser } from "../../utils/types";
import {
  fetchLogin,
  fetchLogout,
  fetchRegister,
  fetchUserGet,
  fetchUserPatch,
} from "../actions/auth-actions";

interface AuthStoreState {
  user: AuthUser | null;
  loading: boolean;
  error: boolean;
}

const initialState: AuthStoreState = {
  user: null,
  loading: false,
  error: false,
};

const isUserFulfilled = isFulfilled(fetchUserGet, fetchUserPatch);

const isLoginRegisterFulfilled = isFulfilled(fetchLogin, fetchRegister);

const isAPendingAction = isPending(
  fetchLogin,
  fetchLogout,
  fetchRegister,
  fetchUserGet,
  fetchUserPatch
);

const isARejectedAction = isRejected(
  fetchLogin,
  fetchLogout,
  fetchRegister,
  fetchUserGet,
  fetchUserPatch
);

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
      .addCase(fetchUserPatch.rejected, () => {
        deleteCookie(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        return {
          ...initialState,
          error: true,
        };
      })
      .addMatcher(isUserFulfilled, (state, { payload: { user } }) => {
        state.user = user;
      })
      .addMatcher(
        isLoginRegisterFulfilled,
        (state, { payload: { accessToken, refreshToken, user } }) => {
          setCookie(ACCESS_TOKEN, accessToken);
          localStorage.setItem(REFRESH_TOKEN, refreshToken);
          state.user = user;
          state.loading = false;
        }
      )
      .addMatcher(isAPendingAction, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addMatcher(isARejectedAction, (state, { error }) => {
        handleError(error.message || "AuthFetchError");
        state.loading = false;
        state.error = true;
      }),
});

export const authReducer = authSlice.reducer;
