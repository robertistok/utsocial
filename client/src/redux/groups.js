import axios from 'axios';

import { getToken } from '../utils/sessionOperations';

const ROOT_URL = '/api/groups';

const FETCH_GROUPS = 'utsocial/schedule/fetchgroups';
const FETCH_GROUPS_SUCCESS = 'utsocial/schedule/fetchgroups_succes';
const FETCH_GROUPS_ERROR = 'utsocial/schedule/fetchgroups_error';

const FETCH_GROUP = 'utsocial/schedule/fetchgroup';
const FETCH_GROUP_SUCCESS = 'utsocial/schedule/fetchgroup_succes';
const FETCH_GROUP_ERROR = 'utsocial/schedule/fetchgroup_error';

export function getGroups(year) {
  return (dispatch) => {
    dispatch({ type: FETCH_GROUPS });
    axios({
      method: 'get',
      url: `${ROOT_URL}/groupsFromYear/${year}`,
      headers: {
        authorization: getToken()
      }
    })
      .then((response) => {
        dispatch({
          type: FETCH_GROUPS_SUCCESS,
          payload: response.data
        });
      })
      .catch(err => dispatch({ type: FETCH_GROUPS_ERROR, payload: err }));
  };
}

export function getGroup(id) {
  return (dispatch) => {
    dispatch({ type: FETCH_GROUP });
    axios({
      method: 'post',
      url: `${ROOT_URL}/getbyid`,
      data: {
        id
      },
      headers: {
        authorization: getToken()
      }
    })
      .then(response =>
        dispatch({ type: FETCH_GROUP_SUCCESS, payload: response.data }))
      .catch(err => dispatch({ type: FETCH_GROUP_ERROR, payload: err }));
  };
}

const INITIAL_STATE = { all: [], selected: null, loading: false, error: '' };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_GROUPS:
      return { ...state, loading: true };
    case FETCH_GROUPS_SUCCESS:
      return { ...state, loading: false, all: action.payload, error: 'error' };
    case FETCH_GROUPS_ERROR:
      return { ...state, loading: false, error: action.payload };
    case FETCH_GROUP:
      return { ...state, loading: true, error: '' };
    case FETCH_GROUP_SUCCESS:
      return { ...state, loading: false, selected: action.payload, error: '' };
    case FETCH_GROUP_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
