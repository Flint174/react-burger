import { createSlice, AnyAction, Action } from "@reduxjs/toolkit";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/constants";
import { deleteCookie, setCookie } from "../../utils/cookie";
import { handleError } from "../../utils/request";
import { AuthUser } from "../../utils/types";
import { fetchLogout, fetchUserPatch } from "../actions/auth-actions";

interface AuthStoreState {
  user: AuthUser | null;
  loading: boolean;
  error: boolean;
}

interface UserFulfilledAction extends Action {
  payload: { user: AuthUser };
}

interface LoginRegisterFulfilledAction extends Action {
  payload: { accessToken: string; refreshToken: string; user: AuthUser };
}

interface RejectedAction extends Action {
  error: Error;
}

const initialState: AuthStoreState = {
  user: null,
  loading: false,
  error: false,
};

function match(action: AnyAction, value: string | string[]) {
  if (action.type.startsWith("auth")) {
    if (Array.isArray(value)) {
      for (const v of value) {
        if (action.type.endsWith(v)) return true;
      }
    } else if (action.type.endsWith(value)) return true;
  }
  return false;
}

function isUserFulfilled(action: AnyAction): action is UserFulfilledAction {
  return match(action, ["user/get/fulfilled", "user/patch/fulfilled"]);
}

function isLoginRegisterFulfilled(
  action: AnyAction
): action is LoginRegisterFulfilledAction {
  return match(action, ["login/fulfilled", "register/fulfilled"]);
}

function isPending(action: AnyAction): action is Action {
  return match(action, "/pending");
}

function isRejected(action: AnyAction): action is RejectedAction {
  return match(action, "/rejected");
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
      .addMatcher(isPending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addMatcher(isRejected, (state, { error }) => {
        handleError(error);
        state.loading = false;
        state.error = true;
      }),
});

export const authReducer = authSlice.reducer;
