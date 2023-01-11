import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWithRefresh, request, requestHeaders } from "../../utils/request";
import {
  ACCESS_TOKEN,
  AUTH_LOGIN_URL,
  AUTH_LOGOUT_URL,
  AUTH_REGISTER_URL,
  AUTH_USER_URL,
  REFRESH_TOKEN,
} from "../../utils/constants";
import { getCookie } from "../../utils/cookie";
import {
  RequestDataMessage,
  RequestDataToken,
  RequestDataUser,
} from "../../utils/types";

export type RequestDataAuth = RequestDataUser & RequestDataToken;

export interface RequestBodyLogin {
  email: string;
  password: string;
}

export interface RequestBodyRegister extends RequestBodyLogin {
  name: string;
}

export type RequestBodyUserPatch = Partial<RequestBodyRegister>;

export const fetchLogin = createAsyncThunk(
  `auth/login`,
  async (body: RequestBodyLogin) =>
    await request<RequestDataAuth>(AUTH_LOGIN_URL, {
      method: "POST",
      headers: requestHeaders.post,
      body: JSON.stringify(body),
    })
);

export const fetchRegister = createAsyncThunk(
  `auth/register`,
  async (body: RequestBodyRegister) =>
    await request<RequestDataAuth>(AUTH_REGISTER_URL, {
      method: "POST",
      headers: requestHeaders.post,
      body: JSON.stringify(body),
    })
);

export const fetchLogout = createAsyncThunk(
  `auth/logout`,
  async () =>
    await request<RequestDataMessage>(AUTH_LOGOUT_URL, {
      method: "POST",
      headers: requestHeaders.post,
      body: JSON.stringify({ token: localStorage.getItem(REFRESH_TOKEN) }),
    })
);

export const fetchUserGet = createAsyncThunk(`auth/user/get`, async () => {
  return await fetchWithRefresh<RequestDataUser>(AUTH_USER_URL, {
    method: "GET",
    headers: {
      authorization: getCookie(ACCESS_TOKEN) || "",
    },
  });
});

export const fetchUserPatch = createAsyncThunk(
  `auth/user/patch`,
  async (body: RequestBodyUserPatch) =>
    await fetchWithRefresh<RequestDataUser>(AUTH_USER_URL, {
      method: "PATCH",
      headers: {
        ...requestHeaders.post,
        authorization: getCookie(ACCESS_TOKEN) || "",
      },
      body: JSON.stringify(body),
    })
);
