import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../utils/request";
import {
  AUTH_LOGIN_URL,
  AUTH_REGISTER_URL,
  AUTH_TOKEN_URL,
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
