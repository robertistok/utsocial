import axios from 'axios';

const ROOT_URL = '/api/teachers';

const FETCH_TEACHERS = 'utsocial/teachers/fetchteachers';
const FETCH_TEACHERS_SUCCESS = 'utsocial/teachers/fetchteachers_succes';
const FETCH_TEACHERS_ERROR = 'utsocial/teachers/fetchteachers_error';

const FETCH_TEACHINGS = 'utsocial/teachers/fetch-teachings-teacher';
const FETCH_TEACHINGS_SUCCESS = 'utsocial/teachers/fetch-teachings-teacher-success';
const FETCH_TEACHINGS_ERROR = 'utsocial/teachers/fetch-teachings-teacher-error';

export function getTeachers() {
  return (dispatch) => {
    dispatch({ type: FETCH_TEACHERS });
    axios
      .get(`${ROOT_URL}/getall`)
      .then((response) => {
        dispatch({
          type: FETCH_TEACHERS_SUCCESS,
          payload: response.data
        });
      })
      .catch(err => dispatch({ type: FETCH_TEACHERS_ERROR, payload: err }));
  };
}

export function fetchTeachingOfTeacher(id) {
  return (dispatch) => {
    dispatch({ type: FETCH_TEACHINGS });
    axios({
      method: 'get',
      url: `${ROOT_URL}/getTeaching/${id}`,
      headers: {
        authorization: sessionStorage.getItem('token')
      }
    })
      .then(response =>
        dispatch({
          type: FETCH_TEACHINGS_SUCCESS,
          payload: {
            courses: response.data.courses,
            schedule: response.data.schedule
          }
        }))
      .catch(err => dispatch({ type: FETCH_TEACHINGS_ERROR, payload: err }));
  };
}

const INITIAL_STATE = {
  all: [],
  courses: [],
  schedule: [],
  loading: false,
  error: ''
};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    case FETCH_TEACHERS:
      return { ...state, loading: true };
    case FETCH_TEACHERS_SUCCESS:
      return { ...state, loading: false, all: action.payload };
    case FETCH_TEACHERS_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, loading: false, error };
    case FETCH_TEACHINGS:
      return { ...state, loading: true, error: '' };
    case FETCH_TEACHINGS_SUCCESS:
      return {
        ...state,
        courses: action.payload.courses,
        schedule: action.payload.schedule,
        loading: false
      };
    case FETCH_TEACHINGS_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, error, loading: false };
    default:
      return state;
  }
}
