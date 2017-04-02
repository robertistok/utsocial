import axios from 'axios';

const ROOT_URL = 'http://localhost:3001/api/auth';

const AUTH_USER = 'utsocial/auth/auth';
const AUTH_ERROR = 'utsocial/auth/autherror';
const DEAUTH_USER = 'utsocial/auth/deauth';
const ME_FROM_TOKEN = 'utsocial/auth/mefromtoken';

export function authError(err) {
  return {
    type: AUTH_ERROR,
    payload: err,
  };
}

export function loginUser({ username, password }) {
  return (dispatch) => {
    axios
      .post(`${ROOT_URL}/login`, { username, password })
      .then((response) => {
        dispatch({
          type: AUTH_USER,
          payload: {
            token: response.data.token,
            user: response.data.user,
          },
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
        headers: { authorization: token },
      })
      .then(response =>
        dispatch({ type: ME_FROM_TOKEN, payload: response.data.user }));
  };
}

const INITIAL_STATE = { user: null, authenticated: false, error: null };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        user: action.payload.user,
        authenticated: true,
        error: '',
      };
    case ME_FROM_TOKEN:
      return { ...state, user: action.payload, authenticated: true, error: '' };
    case AUTH_ERROR:
      return { ...state, authenticated: false, error: action.payload };
    case DEAUTH_USER:
      return { ...state, authenticated: false, error: '' };
    default:
      return state;
  }
}
