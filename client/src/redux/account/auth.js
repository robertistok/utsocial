import axios from 'axios';

const ROOT_URL = '/api/auth';

const AUTH_USER = 'redux/account/auth/auth';
const AUTH_USER_SUCCESS = 'redux/account/auth/auth-success';
const AUTH_USER_ERROR = 'redux/account/auth/autherror';

const DEAUTH_USER = 'redux/account/auth/deauth';
const ME_FROM_TOKEN = 'redux/account/auth/mefromtoken';

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

export function loginUser({ username, password }) {
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
        sessionStorage.setItem('token', response.data.token);
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
  sessionStorage.removeItem('token');
  return {
    type: DEAUTH_USER
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

    default:
      return state;
  }
}
