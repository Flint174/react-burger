import { AUTH_TOKEN_URL, REFRESH_TOKEN, ACCESS_TOKEN } from "./constants";
import { setCookie } from "./cookie";
import { RequestDataToken } from "./types";

export const handleError = (err: Error | string) => {
  if (typeof err === "string") {
    alert(err);
  } else {
    alert(err.message);
  }
};

export const request = <T>(url: string, options?: RequestInit) => {
  return fetch(url, options).then((res) => {
    if (res.ok) {
      return res.json() as Promise<T>;
    }
    return (res.json() as Promise<Error>).then((err) => Promise.reject(err));
  });
};

export const requestHeaders = {
  post: { "Content-Type": "application/json;charset=utf-8" },
  patch: { "Content-Type": "application/json;charset=utf-8" },
};

const refreshToken = () => {
  return request<RequestDataToken>(AUTH_TOKEN_URL, {
    method: "POST",
    headers: requestHeaders.post,
    body: JSON.stringify({ token: localStorage.getItem(REFRESH_TOKEN) }),
  });
};

export const fetchWithRefresh = async <T>(
  url: string,
  options: RequestInit
) => {
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
    }
    return Promise.reject(err);
  }
};
