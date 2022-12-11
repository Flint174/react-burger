import { createAsyncThunk } from "@reduxjs/toolkit";
import { request, requestHeaders } from "../../utils/request";
import {
  ACCESS_TOKEN,
  AUTH_LOGIN_URL,
  AUTH_LOGOUT_URL,
  AUTH_REGISTER_URL,
  AUTH_TOKEN_URL,
  AUTH_USER_URL,
  REFRESH_TOKEN,
} from "../../utils/constants";
import { getCookie, setCookie } from "../../utils/cookie";
import { AuthUser, RequestDataBase } from "../../utils/types";

export interface RequestDataUser extends RequestDataBase {
  user: AuthUser;
}

export interface RequestDataToken extends RequestDataBase {
  accessToken: string;
  refreshToken: string;
}

export type RequestDataAuth = RequestDataUser & RequestDataToken;

export interface RequestDataLogout extends RequestDataBase {
  message: string;
}

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

const refreshToken = () => {
  return request<RequestDataToken>(AUTH_TOKEN_URL, {
    method: "POST",
    headers: requestHeaders.post,
    body: JSON.stringify({ token: localStorage.getItem(REFRESH_TOKEN) }),
  });
};

export const fetchLogout = createAsyncThunk(
  `auth/logout`,
  async () =>
    await request<RequestDataLogout>(AUTH_LOGOUT_URL, {
      method: "POST",
      headers: requestHeaders.post,
      body: JSON.stringify({ token: localStorage.getItem(REFRESH_TOKEN) }),
    })
);

const fetchWithRefresh = async <T>(url: string, options: RequestInit) => {
  try {
    return await request<T>(url, options);
  } catch (err) {
    if ((err as Error).message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem(REFRESH_TOKEN, refreshData.refreshToken);
      setCookie(ACCESS_TOKEN, refreshData.accessToken);
      options = {
        ...options,
        headers: {
          ...options.headers,
          authorization: refreshData.accessToken,
        },
      };
      return await request<T>(url, options);
    } else {
    }
  }
};

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
