import axios from 'axios';
import { createSelector } from 'reselect';

const ROOT_URL = '/api/courses';

const RESET_COURSES = 'redux/courses/reset-courses';
const FILTER_NEWSFEED = 'redux/courses/filter-newsfeed';

const SELECT_COURSE_AND_FETCH_GROUPS = 'redux/courses/fetch-groups-of-course';
const SELECT_COURSE_AND_FETCH_GROUPS_SUCCESS = 'redux/courses/select-course-and-fetch-groups-success';
const SELECT_COURSE_AND_FETCH_GROUPS_ERROR = 'redux/courses/select-course-and-fetch-groups-error';

const FETCH_FEED = 'redux/courses/fetch-feed';
const FETCH_FEED_SUCCESS = 'redux/courses/fetch-feed-success';
const FETCH_FEED_ERROR = 'redux/courses/fetch-feed-error';

const FETCH_FEED_FOR_STUDENT = 'redux/courses/fetch-feed';
const FETCH_FEED_FOR_STUDENT_SUCCESS = 'redux/courses/fetch-feed-for-student-success';
const FETCH_FEED_FOR_STUDENT_ERROR = 'redux/courses/fetch-feed-for-student-error';

const ADD_POST = 'redux/courses/add-post';
const ADD_POST_SUCCESS = 'redux/courses/add-post-success';
const ADD_POST_ERROR = 'redux/courses/add-post-error';

const UPDATE_POST = 'redux/courses/update-post';
const UPDATE_POST_SUCCESS = 'redux/courses/update-post-success';
const UPDATE_POST_ERROR = 'redux/courses/update-post-error';

const DELETE_POST = 'redux/courses/delete-post';
const DELETE_POST_SUCCESS = 'redux/courses/delete-post-success';
const DELETE_POST_ERROR = 'redux/courses/delete-post-error';

const MARK = 'redux/courses/mark';
const MARK_SUCCESS = 'redux/courses/mark-success';
const MARK_ERROR = 'redux/courses/mark-error';

const UNMARK = 'redux/courses/unmark';
const UNMARK_SUCCESS = 'redux/courses/unmark-success';
const UNMARK_ERROR = 'redux/courses/unmark-error';

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

export function getFeedForStudent(groupID) {
  return (dispatch) => {
    dispatch({ type: FETCH_FEED_FOR_STUDENT });
    axios({
      method: 'get',
      url: `/api/posts/getFeedForStudent/${groupID}`,
      headers: {
        authorization: sessionStorage.getItem('token')
      }
    })
      .then(response =>
        dispatch({
          type: FETCH_FEED_FOR_STUDENT_SUCCESS,
          payload: response.data.posts
        }))
      .catch(err =>
        dispatch({ type: FETCH_FEED_FOR_STUDENT_ERROR, payload: err }));
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

export function updatePost(postID, content) {
  return (dispatch) => {
    dispatch({ type: UPDATE_POST });
    axios({
      method: 'put',
      url: '/api/posts/update',
      data: { postID, content },
      headers: {
        authorization: sessionStorage.getItem('token')
      }
    })
      .then(response =>
        dispatch({
          type: UPDATE_POST_SUCCESS,
          payload: response.data.updatedPost
        }))
      .catch(err => dispatch({ type: UPDATE_POST_ERROR, payload: err }));
  };
}

export function deletePost(postID) {
  return (dispatch) => {
    dispatch({ type: DELETE_POST });
    axios({
      method: 'delete',
      url: `/api/posts/delete/${postID}`,
      headers: {
        authorization: sessionStorage.getItem('token')
      }
    })
      .then(response =>
        dispatch({ type: DELETE_POST_SUCCESS, payload: response.data }))
      .catch(err => dispatch({ type: DELETE_POST_ERROR, payload: err }));
  };
}

export function mark(postID, userID, type) {
  return (dispatch) => {
    dispatch({ type: MARK });
    axios({
      method: 'put',
      url: '/api/posts/mark',
      data: { postID, userID, type },
      headers: {
        authorization: sessionStorage.getItem('token')
      }
    })
      .then(response =>
        dispatch({ type: MARK_SUCCESS, payload: response.data }))
      .catch(err => dispatch({ type: MARK_ERROR, payload: err }));
  };
}

export function unMark(postID, userID, type) {
  return (dispatch) => {
    dispatch({ type: UNMARK });
    axios({
      method: 'put',
      url: '/api/posts/unMark',
      data: { postID, userID, type },
      headers: {
        authorization: sessionStorage.getItem('token')
      }
    })
      .then(response =>
        dispatch({ type: UNMARK_SUCCESS, payload: response.data }))
      .catch(err => dispatch({ type: UNMARK_ERROR, payload: err }));
  };
}

export function resetCourses() {
  return {
    type: RESET_COURSES
  };
}

export function filterNewsfeed(filterBy) {
  return {
    type: FILTER_NEWSFEED,
    payload: filterBy
  };
}

const INITIAL_STATE = {
  selectedCourse: {
    lang: undefined,
    course: {},
    groups: [],
    schedules: []
  },
  newsFeed: [],
  newsFeedFilter: 'all',
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
        newsFeed: action.payload.sort((a, b) => a.created < b.created),
        loading: false
      };
    case FETCH_FEED_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, loading: false, error };

    case FETCH_FEED_FOR_STUDENT:
      return { ...state, loading: true };
    case FETCH_FEED_FOR_STUDENT_SUCCESS:
      return {
        ...state,
        newsFeed: action.payload.sort((a, b) => a.created < b.created),
        loading: false
      };
    case FETCH_FEED_FOR_STUDENT_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, loading: false, error };

    case ADD_POST:
      return { ...state, loading: true };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        newsFeed: [action.payload, ...state.selectedCourse.newsFeed],
        loading: false
      };
    case ADD_POST_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, loading: false, error };

    case UPDATE_POST:
      return { ...state, loading: true };
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        newsFeed: state.newsFeed.map((post) => {
          if (post._id === action.payload._id) {
            return {
              ...post,
              content: action.payload.content,
              edited: action.payload.edited
            };
          }

          return { ...post };
        }),
        loading: false
      };
    case UPDATE_POST_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, loading: false, error };

    case DELETE_POST:
      return { ...state, loading: true };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        newsFeed: state.newsFeed.filter(post => post._id !== action.payload.id),
        loading: false
      };
    case DELETE_POST_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, loading: false, error };

    case MARK:
      return { ...state, loading: true };
    case MARK_SUCCESS:
      return {
        ...state,
        newsFeed: state.newsFeed.map((post) => {
          if (post._id === action.payload.postID) {
            return {
              ...post,
              [action.payload.type]: [
                ...post[action.payload.type],
                action.payload.userID
              ]
            };
          }

          return { ...post };
        }),
        loading: false
      };
    case MARK_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, loading: false, error };

    case UNMARK:
      return { ...state, loading: true };
    case UNMARK_SUCCESS:
      return {
        ...state,
        newsFeed: state.newsFeed.map((post) => {
          if (post._id === action.payload.postID) {
            return {
              ...post,
              [action.payload.type]: post[action.payload.type].filter(
                item => item !== action.payload.userID
              )
            };
          }

          return { ...post };
        }),
        loading: false
      };
    case UNMARK_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, loading: false, error };

    case FILTER_NEWSFEED:
      return {
        ...state,
        newsFeedFilter: action.payload
      };

    case RESET_COURSES:
      return INITIAL_STATE;
    default:
      return state;
  }
}

const getFilter = state => state.courses.newsFeedFilter;
const getPosts = state => state.courses.newsFeed;
const getUser = state => state.auth.user._id;

export const postList = createSelector(
  [getFilter, getPosts, getUser],
  (filter, posts, userID) => {
    if (posts) {
      if (filter === 'all') {
        return posts;
      }
      if (filter === 'unseen') {
        return posts.filter(
          post => !post.seenBy.includes(userID) && post.postedBy._id !== userID
        );
      }

      if (filter === 'important') {
        return posts.filter(post => post.marked.includes(userID));
      }

      if (filter === 'own') {
        return posts.filter(post => post.postedBy._id === userID);
      }

      return posts.filter(post => post.target.course.relatedTo === filter);
    }
  }
);
