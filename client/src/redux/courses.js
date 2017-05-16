import axios from 'axios';

const ROOT_URL = '/api/courses';

const RESET_COURSES = 'redux/courses/reset-courses';

const SELECT_COURSE_AND_FETCH_GROUPS = 'redux/courses/fetch-groups-of-course';
const SELECT_COURSE_AND_FETCH_GROUPS_SUCCESS = 'redux/courses/select-course-and-fetch-groups-success';
const SELECT_COURSE_AND_FETCH_GROUPS_ERROR = 'redux/courses/select-course-and-fetch-groups-error';

export function selectCourse(course) {
  const { lang, _id } = course;
  return (dispatch) => {
    dispatch({ type: SELECT_COURSE_AND_FETCH_GROUPS });
    axios({
      method: 'get',
      url: `${ROOT_URL}/getCourseGroups/${_id}/${lang}`,
      headers: {
        authorization: sessionStorage.getItem('token')
      }
    })
      .then(response =>
        dispatch({
          type: SELECT_COURSE_AND_FETCH_GROUPS_SUCCESS,
          payload: {
            lang,
            course,
            groups: response.data.groups,
            schedules: response.data.schedules
          }
        }))
      .catch(err =>
        dispatch({ type: SELECT_COURSE_AND_FETCH_GROUPS_ERROR, payload: err }));
  };
}

export function resetCourses() {
  return {
    type: RESET_COURSES
  };
}

const INITIAL_STATE = {
  selectedCourse: {
    lang: undefined,
    course: {},
    groups: [],
    schedules: []
  },
  activeAccordionElements: [],
  loading: false,
  error: ''
};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    case SELECT_COURSE_AND_FETCH_GROUPS:
      return { ...state, loading: true };
    case SELECT_COURSE_AND_FETCH_GROUPS_SUCCESS:
      return {
        ...state,
        selectedCourse: { ...action.payload },
        loading: false
      };
    case SELECT_COURSE_AND_FETCH_GROUPS_ERROR:
      console.log(action.payload);
      error = action.payload || { message: action.payload.message };
      return { ...state, loading: false, error };
    case RESET_COURSES:
      return INITIAL_STATE;
    default:
      return state;
  }
}
