import { useDispatch } from 'react-redux';
const baseUrl = 'https://norma.nomoreparties.space/api';

const checkResponse = (response: Response) => {
  if (!response.ok) {
      // throw new Error('ошибка ' + response.status);
  }
  return response.json();
}

export const getIngredientsRequest = () => {
  return fetch(`${baseUrl}/ingredients`)
    .then(checkResponse);
};

export const getCreateOrderRequest = (ids: string[], accessToken: string) => {
  const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'authorization': accessToken
    },
    body: JSON.stringify({"ingredients": ids})
  };

  return fetch(`${baseUrl}/orders`, options)
    .then(checkResponse);
};

export const getForgotPasswordRequest = (email: string) => {
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({"email": email})
  };

  return fetch(`${baseUrl}/password-reset`, options)
    .then(checkResponse);
}

export const getResetPasswordRequest = (password: string, token: string) => {
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({"password": password, "token": token})
  };

  return fetch(`${baseUrl}/password-reset/reset`, options)
    .then(checkResponse);
}

// AUTH

// login
export const getLoginRequest = (password: string, email: string) => {
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({"password": password, "email": email})
  };

  return fetch(`${baseUrl}/auth/login`, options)
    .then(checkResponse);
}

// regiseter
export const getRegisterRequest = (name: string, email: string, password: string) => {
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({"name": name,"email": email,  "password": password})
  };

  return fetch(`${baseUrl}/auth/register`, options)
    .then(checkResponse);
}

// logout
export const getLogoutRequest = (accessToken: string, refreshToken: string) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': accessToken
    },
    body: JSON.stringify({"token": refreshToken})
  };

  return fetch(`${baseUrl}/auth/logout`, options)
    .then(checkResponse);
}

// token
export const getTokenRequest = (accessToken: string, refreshToken: string) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': accessToken
    },
    body: JSON.stringify({"token": refreshToken})
  };

  return fetch(`${baseUrl}/auth/token`, options)
    .then(checkResponse);
}

// get user data
export const getUserRequest = (accessToken: string,) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': accessToken
    },
  };

  return fetch(`${baseUrl}/auth/user`, options)
    .then(checkResponse);
}

// patch user data
export const getPatchUserRequest = (accessToken: string, data: any) => {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': accessToken
    },
    body: JSON.stringify(data)
  };

  return fetch(`${baseUrl}/auth/user`, options)
    .then(checkResponse);
}