import { createAsyncThunk } from "@reduxjs/toolkit";
import { request, requestHeaders } from "../../utils/request";
import {
  AUTH_LOGIN_URL,
  AUTH_LOGOUT_URL,
  AUTH_REGISTER_URL,
  AUTH_TOKEN_URL,
  AUTH_USER_URL,
} from "../../utils/constants";

const headers = {
  "Content-Type": "application/json;charset=utf-8",
};

export const fetchLogin = createAsyncThunk(
  `auth/login`,
  async (body) =>
    await request(AUTH_LOGIN_URL, {
      method: "POST",
      headers: requestHeaders.post,
      body: JSON.stringify(body),
    })
);

export const fetchRegister = createAsyncThunk(
  `auth/register`,
  async (body) =>
    await request(AUTH_REGISTER_URL, {
      method: "POST",
      headers: requestHeaders.post,
      body: JSON.stringify(body),
    })
);

export const fetchToken = createAsyncThunk(
  `auth/token`,
  async (body) =>
    await request(AUTH_TOKEN_URL, {
      method: "POST",
      headers: requestHeaders.post,
      body: JSON.stringify(body),
    })
);

export const fetchLogout = createAsyncThunk(
  `auth/logout`,
  async (body) =>
    await request(AUTH_LOGOUT_URL, {
      method: "POST",
      headers: requestHeaders.post,
      body: JSON.stringify(body),
    })
);

export const fetchUserGet = createAsyncThunk(
  `auth/user/get`,
  async (token) =>
    await request(AUTH_USER_URL, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
);

export const fetchUserPatch = createAsyncThunk(
  `auth/user/patch`,
  async (token, body) =>
    await request(AUTH_USER_URL, {
      method: "PATCH",
      headers: {
        ...requestHeaders.post,
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    })
);
