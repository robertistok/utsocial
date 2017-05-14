import axios from 'axios';

const CHANGE_GROUP = 'redux/grades/change-group';
const CHANGE_GROUP_SUCCESS = 'redux/grades/change-group-success';
const CHANGE_GROUP_ERROR = 'redux/grades/change-group-error';

const FETCH_GRADES = 'redux/grades/fetch-grades';
const FETCH_GRADES_SUCCESS = 'redux/grades/fetch-grades-success';
const FETCH_GRADES_ERROR = 'redux/grades/fetch-grades';

const INSERT_GRADE = 'redux/grades/insert-grade';
const INSERT_GRADE_SUCCESS = 'redux/grades/insert-grade-success';
const INSERT_GRADE_ERROR = 'redux/grades/insert-grade-error';

const UPDATE_GRADE = 'redux/grades/update-grade';
const UPDATE_GRADE_SUCCESS = 'redux/grades/update-grade-success';
const UPDATE_GRADE_ERROR = 'redux/grades/update-grade-error';

const DELETE_GRADE = 'redux/grades/delete-grade';
const DELETE_GRADE_SUCCESS = 'redux/grades/delete-grade-success';
const DELETE_GRADE_ERROR = 'redux/grades/delete-grade-error';

const ADD_COLUMN_GRADE = 'redux/grades/add-column-grade';
const RESET_GRADES = 'redux/grades/reset-state-grades';

export function changeGroup(group) {
  return (dispatch) => {
    dispatch({ type: CHANGE_GROUP, payload: group });
    axios({
      method: 'get',
      url: `/api/groups/getStudents/${group}`,
      headers: {
        authorization: sessionStorage.getItem('token')
      }
    })
      .then(response =>
        dispatch({
          type: CHANGE_GROUP_SUCCESS,
          payload: response.data.students
        }))
      .catch(err => dispatch({ type: CHANGE_GROUP_ERROR, payload: err }));
  };
}

export function fetchGrades(group, course) {
  return (dispatch) => {
    dispatch({ type: FETCH_GRADES });
    axios({
      method: 'post',
      url: '/api/grades/getGradesListOfGroup/',
      data: { group, course },
      headers: {
        authorization: sessionStorage.getItem('token')
      }
    })
      .then(response =>
        dispatch({
          type: FETCH_GRADES_SUCCESS,
          payload: {
            gradesList: response.data.gradesList,
            numberOfGrades: response.data.numberOfGrades
          }
        }))
      .catch(err => dispatch({ type: FETCH_GRADES_ERROR, payload: err }));
  };
}

export function insertGrade(gradeProps) {
  return (dispatch) => {
    dispatch({ type: INSERT_GRADE });
    axios({
      method: 'post',
      url: '/api/grades/insert',
      data: gradeProps,
      headers: {
        authorization: sessionStorage.getItem('token')
      }
    })
      .then((response) => {
        dispatch({
          type: INSERT_GRADE_SUCCESS,
          payload: response.data.grade
        });
      })
      .catch(err => dispatch({ type: INSERT_GRADE_ERROR, payload: err }));
  };
}

export function updateGrade(id, student, grade, assignor) {
  return (dispatch) => {
    dispatch({ type: UPDATE_GRADE });
    axios({
      method: 'post',
      url: '/api/grades/update',
      data: { id, grade, assignor },
      headers: {
        authorization: sessionStorage.getItem('token')
      }
    })
      .then(response =>
        dispatch({
          type: UPDATE_GRADE_SUCCESS,
          payload: { student, grade: response.data.grade }
        }))
      .catch(err => dispatch({ type: UPDATE_GRADE_ERROR, payload: err }));
  };
}

export function deleteGrade(id, student) {
  return (dispatch) => {
    dispatch({ type: DELETE_GRADE });
    axios({
      method: 'get',
      url: `/api/grades/delete/${id}`,
      headers: {
        authorization: sessionStorage.getItem('token')
      }
    })
      .then(() =>
        dispatch({
          type: DELETE_GRADE_SUCCESS,
          payload: { id, student }
        }))
      .catch(err => dispatch({ type: DELETE_GRADE_ERROR, payload: err }));
  };
}

export function addColumnGrade(type) {
  return {
    type: ADD_COLUMN_GRADE,
    payload: type
  };
}

export function resetGrades() {
  return {
    type: RESET_GRADES
  };
}

const INITIAL_STATE = {
  selectedGroup: undefined,
  gradesList: {},
  numberOfGrades: {},
  students: [],
  loading: false,
  error: ''
};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    case CHANGE_GROUP:
      return {
        ...state,
        selectedGroup: action.payload,
        loading: true
      };
    case CHANGE_GROUP_SUCCESS:
      return {
        ...state,
        students: [...action.payload],
        loading: false
      };
    case CHANGE_GROUP_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, loading: false, error };

    case FETCH_GRADES:
      return { ...state, loading: true };
    case FETCH_GRADES_SUCCESS:
      return {
        ...state,
        gradesList: { ...action.payload.gradesList },
        numberOfGrades: { ...action.payload.numberOfGrades },
        loading: false
      };
    case FETCH_GRADES_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, loading: false, error };

    case INSERT_GRADE:
      return { ...state, loading: true };
    case INSERT_GRADE_SUCCESS:
      return {
        ...state,
        gradesList: {
          ...state.gradesList,
          [action.payload.student]: state.gradesList[action.payload.student] !==
            undefined
            ? [...state.gradesList[action.payload.student], action.payload]
            : [action.payload]
        },
        loading: false
      };
    case INSERT_GRADE_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, loading: false, error };

    case UPDATE_GRADE:
      return { ...state, loading: true };
    case UPDATE_GRADE_SUCCESS:
      return {
        ...state,
        gradesList: {
          ...state.gradesList,
          [action.payload.student]: [
            ...state.gradesList[action.payload.student].map(
              grade =>
                grade._id === action.payload.grade._id
                  ? action.payload.grade
                  : grade
            )
          ]
        },
        loading: false
      };
    case UPDATE_GRADE_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, loading: false, error };

    case DELETE_GRADE:
      return { ...state, loading: true };
    case DELETE_GRADE_SUCCESS:
      return {
        ...state,
        gradesList: {
          ...state.gradesList,
          [action.payload.student]: [
            ...state.gradesList[action.payload.student].filter(
              grade => grade._id !== action.payload.id
            )
          ]
        },
        loading: false
      };
    case DELETE_GRADE_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, loading: false, error };

    case ADD_COLUMN_GRADE:
      return {
        ...state,
        numberOfGrades: {
          ...state.numberOfGrades,
          [action.payload]: state.numberOfGrades[action.payload] + 1
        }
      };

    case RESET_GRADES:
      return INITIAL_STATE;
    default:
      return state;
  }
}
