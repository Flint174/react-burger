export const handleError = (err) => {
  // console.error(err)
  alert(err);
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
