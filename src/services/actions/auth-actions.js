import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../utils/request";
import {
  AUTH_LOGIN_URL,
  AUTH_LOGOUT_URL,
  AUTH_REGISTER_URL,
  AUTH_TOKEN_URL,
  AUTH_USER_URL,
} from "../../utils/constants";

export const fetchLogin = createAsyncThunk(
  `auth/login`,
  async (body) =>
    await request(AUTH_LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
);

export const fetchRegister = createAsyncThunk(
  `auth/register`,
  async (body) =>
    await request(AUTH_REGISTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
);

export const fetchToken = createAsyncThunk(
  `auth/token`,
  async (body) =>
    await request(AUTH_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
);

export const fetchLogout = createAsyncThunk(
  `auth/logout`,
  async (body) =>
    await request(AUTH_LOGOUT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
);

export const fetchUserGet = createAsyncThunk(
  `auth/user/get`,
  async (token) =>
    await request(AUTH_USER_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    })
);
