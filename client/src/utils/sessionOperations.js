export const saveToken = (token, remember) => {
  if (remember === true) {
    return localStorage.setItem('token', token);
  }

  return sessionStorage.setItem('token', token);
};

export const deleteToken = () => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
};

export const getToken = () =>
  sessionStorage.getItem('token') || localStorage.getItem('token');
