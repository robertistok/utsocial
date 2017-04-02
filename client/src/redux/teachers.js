import axios from 'axios';

const ROOT_URL = 'http://localhost:3001/api/teachers';

const FETCH_TEACHERS = 'utsocial/schedule/fetchteachers';
const FETCH_TEACHERS_SUCCES = 'utsocial/schedule/fetchteachers_succes';
const FETCH_TEACHERS_ERROR = 'utsocial/schedule/fetchteachers_error';

export function getTeachers() {
  return (dispatch) => {
    dispatch({ type: FETCH_TEACHERS });
    axios
      .get(`${ROOT_URL}/getall`)
      .then((response) => {
        dispatch({
          type: FETCH_TEACHERS_SUCCES,
          payload: response.data
        });
      })
      .catch(err => dispatch({ type: FETCH_TEACHERS_ERROR, payload: err }));
  };
}

const INITIAL_STATE = { all: [], loading: false, error: '' };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_TEACHERS:
      return { ...state, loading: true };
    case FETCH_TEACHERS_SUCCES:
      return { ...state, loading: false, all: action.payload };
    case FETCH_TEACHERS_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
