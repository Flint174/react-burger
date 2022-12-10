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
