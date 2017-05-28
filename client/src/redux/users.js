import axios from 'axios';

const ROOT_URL = '/api/users';

export const FETCH_ALL_USERS = '/redux/users/fetchall';
export const FETCH_ALL_USERS_SUCCESS = '/redux/users/fetchall-success';
export const FETCH_ALL_USERS_ERROR = '/redux/users/fetchall-error';

export const SEARCH_USERS = '/redux/users/searchusers';
export const SEARCH_USERS_SUCCESS = '/redux/users/searchusers-success';
export const SEARCH_USERS_ERROR = '/redux/users/searchusers-error';

export function getAllUsers() {
  return (dispatch) => {
    dispatch({ type: FETCH_ALL_USERS });
    axios({
      method: 'get',
      url: `${ROOT_URL}/all`,
      headers: {
        authorization: sessionStorage.getItem('token')
      }
    })
      .then((response) => {
        dispatch({
          type: FETCH_ALL_USERS_SUCCESS,
          payload: response.data
        });
      })
      .catch(err => dispatch({ type: FETCH_ALL_USERS_ERROR, payload: err }));
  };
}

export function searchUsers(term) {
  return (dispatch) => {
    dispatch({ type: SEARCH_USERS });
    axios({
      method: 'get',
      url: `${ROOT_URL}/autocomplete/${term || 'none'}`,
      headers: {
        authorization: sessionStorage.getItem('token')
      }
    })
      .then((response) => {
        dispatch({
          type: SEARCH_USERS_SUCCESS,
          payload: response.data
        });
      })
      .catch(err => dispatch({ type: SEARCH_USERS_ERROR, payload: err }));
  };
}

const INITIAL_STATE = {
  all: [],
  matched: [],
  loading: false,
  error: undefined
};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    case FETCH_ALL_USERS:
      return { ...state, loading: true };
    case FETCH_ALL_USERS_SUCCESS:
      return { ...state, all: action.payload, loading: false };
    case FETCH_ALL_USERS_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, loading: false, error };
    case SEARCH_USERS:
      return { ...state, loading: true };
    case SEARCH_USERS_SUCCESS:
      return { ...state, matched: action.payload, loading: false };
    case SEARCH_USERS_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, loading: false, error };
    default:
      return state;
  }
}
