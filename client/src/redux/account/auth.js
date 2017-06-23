import axios from 'axios';

import { deleteToken, saveToken } from '../../utils/sessionOperations';

const ROOT_URL = '/api/auth';

const AUTH_USER = 'redux/account/auth/auth';
const AUTH_USER_SUCCESS = 'redux/account/auth/auth-success';
const AUTH_USER_ERROR = 'redux/account/auth/autherror';

const DEAUTH_USER = 'redux/account/auth/deauth';
const ME_FROM_TOKEN = 'redux/account/auth/mefromtoken';
const RESET_ERROR = 'redux/account/auth/reset-error';
const SET_USER = 'redux/account/auth/set-user';

export function authError(err) {
  let error;

  if (err.response.status === 401) {
    error = 'Username or password invalid';
  } else if (err.response.status === 500) {
    error = 'Network unavaliable';
  }

  return {
    type: AUTH_USER_ERROR,
    payload: error
  };
}

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  };
}

export function loginUser({ username, password, remember = false }) {
  return (dispatch) => {
    dispatch({ type: AUTH_USER });
    axios
      .post(`${ROOT_URL}/login`, {
        username: username.toLowerCase().trim(),
        password
      })
      .then((response) => {
        dispatch({
          type: AUTH_USER_SUCCESS,
          payload: {
            token: response.data.token,
            user: response.data.user
          }
        });
        saveToken(response.data.token, remember);
      })
      .catch(err => dispatch(authError(err)));
  };
}

export function meFromToken(token) {
  return (dispatch) => {
    axios
      .get(`${ROOT_URL}/mefromtoken`, {
        headers: { authorization: token }
      })
      .then(response =>
        dispatch({ type: ME_FROM_TOKEN, payload: response.data.user }));
  };
}

export function logOutUser() {
  deleteToken();
  return {
    type: DEAUTH_USER
  };
}

export function resetError() {
  return {
    type: RESET_ERROR
  };
}

const INITIAL_STATE = {
  user: undefined,
  authenticated: false,
  error: undefined,
  loading: false
};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    case AUTH_USER:
      return { ...state, loading: true };
    case AUTH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        authenticated: true,
        error: undefined,
        loading: false
      };
    case AUTH_USER_ERROR:
      error = action.payload || { message: action.payload.message };
      return {
        ...state,
        authenticated: false,
        error,
        loading: false
      };

    case ME_FROM_TOKEN:
      return {
        ...state,
        user: action.payload,
        authenticated: true,
        error: undefined
      };

    case DEAUTH_USER:
      return {
        ...state,
        user: undefined,
        authenticated: false,
        error: undefined
      };

    case SET_USER: {
      return {
        ...state,
        user: action.payload
      };
    }

    case RESET_ERROR: {
      return { ...state, error: undefined };
    }

    default:
      return state;
  }
}
