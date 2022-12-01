import { createAsyncThunk } from "@reduxjs/toolkit";
import { request, requestHeaders } from "../../utils/request";
import {
  accessTokenOpts,
  ACCESS_TOKEN,
  AUTH_LOGIN_URL,
  AUTH_LOGOUT_URL,
  AUTH_REGISTER_URL,
  AUTH_TOKEN_URL,
  AUTH_USER_URL,
  REFRESH_TOKEN,
} from "../../utils/constants";
import { getCookie, setCookie } from "../../utils/cookie";

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

const refreshToken = () => {
  return request(AUTH_TOKEN_URL, {
    method: "POST",
    headers: requestHeaders.post,
    body: JSON.stringify({ token: localStorage.getItem(REFRESH_TOKEN) }),
  });
};

export const fetchLogout = createAsyncThunk(
  `auth/logout`,
  async () =>
    await request(AUTH_LOGOUT_URL, {
      method: "POST",
      headers: requestHeaders.post,
      body: JSON.stringify({ token: localStorage.getItem(REFRESH_TOKEN) }),
    })
);

const fetchWithRefresh = async (url, options) => {
  try {
    return await request(url, options);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem(REFRESH_TOKEN, refreshData.refreshToken);
      setCookie(ACCESS_TOKEN, refreshData.accessToken, accessTokenOpts);
      options.headers.authorization = refreshData.accessToken;
      return await request(url, options);
    } else {
      return Promise.reject(err);
    }
  }
};

export const fetchUserGet = createAsyncThunk(`auth/user/get`, async () => {
  return await fetchWithRefresh(AUTH_USER_URL, {
    method: "GET",
    headers: {
      authorization: getCookie(ACCESS_TOKEN),
    },
  });
});

export const fetchUserPatch = createAsyncThunk(
  `auth/user/patch`,
  async (body) =>
    await fetchWithRefresh(AUTH_USER_URL, {
      method: "PATCH",
      headers: {
        ...requestHeaders.post,
        authorization: getCookie(ACCESS_TOKEN),
      },
      body: JSON.stringify(body),
    })
);
