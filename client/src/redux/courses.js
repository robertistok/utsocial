import axios from 'axios';

const ROOT_URL = '/api/courses';

const RESET_COURSES = 'redux/courses/reset-courses';

const SELECT_COURSE_AND_FETCH_GROUPS = 'redux/courses/fetch-groups-of-course';
const SELECT_COURSE_AND_FETCH_GROUPS_SUCCESS = 'redux/courses/select-course-and-fetch-groups-success';
const SELECT_COURSE_AND_FETCH_GROUPS_ERROR = 'redux/courses/select-course-and-fetch-groups-error';

const FETCH_FEED = 'redux/courses/fetch-feed';
const FETCH_FEED_SUCCESS = 'redux/courses/fetch-feed-success';
const FETCH_FEED_ERROR = 'redux/courses/fetch-feed-error';

const ADD_POST = 'redux/courses/add-post';
const ADD_POST_SUCCESS = 'redux/courses/add-post-success';
const ADD_POST_ERROR = 'redux/courses/add-post-error';

export function selectCourse(_id, lang) {
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
            course: response.data.course,
            groups: response.data.groups,
            schedules: response.data.schedules
          }
        }))
      .catch(err =>
        dispatch({ type: SELECT_COURSE_AND_FETCH_GROUPS_ERROR, payload: err }));
  };
}

export function getFeedForCourse(props) {
  return (dispatch) => {
    dispatch({ type: FETCH_FEED });
    axios({
      method: 'post',
      url: '/api/posts/getFeedForCourse',
      data: props,
      headers: {
        authorization: sessionStorage.getItem('token')
      }
    })
      .then(response =>
        dispatch({ type: FETCH_FEED_SUCCESS, payload: response.data.posts }))
      .catch(err => dispatch({ type: FETCH_FEED_ERROR, payload: err }));
  };
}

export function addPost(props) {
  return (dispatch) => {
    dispatch({ type: ADD_POST });
    axios({
      method: 'post',
      url: '/api/posts/addPost',
      data: props,
      headers: {
        authorization: sessionStorage.getItem('token')
      }
    })
      .then(response =>
        dispatch({ type: ADD_POST_SUCCESS, payload: response.data.newPost }))
      .catch(err => dispatch({ type: ADD_POST_ERROR, payload: err }));
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
    schedules: [],
    newsFeed: []
  },
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
        selectedCourse: { ...state.selectedCourse, ...action.payload },
        loading: false
      };
    case SELECT_COURSE_AND_FETCH_GROUPS_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, loading: false, error };

    case FETCH_FEED:
      return { ...state, loading: true };
    case FETCH_FEED_SUCCESS:
      return {
        ...state,
        selectedCourse: {
          ...state.selectedCourse,
          newsFeed: action.payload.sort((a, b) => a.created < b.created)
        },
        loading: false
      };
    case FETCH_FEED_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, loading: false, error };

    case ADD_POST:
      return { ...state, loading: true };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        selectedCourse: {
          ...state.selectedCourse,
          newsFeed: [action.payload, ...state.selectedCourse.newsFeed]
        },
        loading: false
      };
    case ADD_POST_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, loading: false, error };

    case RESET_COURSES:
      return INITIAL_STATE;
    default:
      return state;
  }
}
