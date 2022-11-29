export const handleError = (err) => {
  // console.error(err)
  alert(err.message);
};

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};

export const requestHeaders = {
  post: { "Content-Type": "application/json;charset=utf-8" },
  patch: { "Content-Type": "application/json;charset=utf-8" },
};
