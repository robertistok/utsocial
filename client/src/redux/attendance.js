import axios from 'axios';

const CHANGE_GROUP = 'redux/attendance/change-group';
const CHANGE_GROUP_SUCCESS = 'redux/attendance/change-group-success';
const CHANGE_GROUP_ERROR = 'redux/attendance/change-group-error';

const FETCH_ATTENDANCE = 'redux/attendance/fetch-attendance';
const FETCH_ATTENDANCE_SUCCESS = 'redux/attendance/fetch-attendance-success';
const FETCH_ATTENDANCE_ERROR = 'redux/attendance/fetch-attendance-error';

const MARK_AS_PRESENT = 'redux/attendance/mark-as-present';
const MARK_AS_PRESENT_SUCCESS = 'redux/attendance/mark-as-present-success';
const MARK_AS_PRESENT_ERROR = 'redux/attendance/mark-as-present-error';

const REMOVE_ATTENDANCE = 'redux/attendance/remove-attendance';
const REMOVE_ATTENDANCE_SUCCESS = 'redux/attendance/remove-attendance-success';
const REMOVE_ATTENDANCE_ERROR = 'redux/attendance/remove-attendance-error';

const RESET_ATTENDANCE = 'redux/attendance/reset-state-attendance';
const CHANGE_TYPE = 'redux/attendance/change-type';

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

export function fetchAttendance(type, course, group) {
  return (dispatch) => {
    dispatch({ type: FETCH_ATTENDANCE, payload: type });
    axios({
      method: 'post',
      url: '/api/attendance/getAttendanceOfGroupWithCourseType',
      data: { course, type, group },
      headers: {
        authorization: sessionStorage.getItem('token')
      }
    })
      .then(response =>
        dispatch({ type: FETCH_ATTENDANCE_SUCCESS, payload: response.data }))
      .catch(err => dispatch({ type: FETCH_ATTENDANCE_ERROR, payload: err }));
  };
}

export function changeType(type) {
  return {
    type: CHANGE_TYPE,
    payload: type
  };
}

export function markAsPresent({ student, date, course, type, teacher, group }) {
  return (dispatch) => {
    dispatch({ type: MARK_AS_PRESENT });
    axios({
      method: 'post',
      url: '/api/attendance/markAsPresent',
      data: { student, date, course, type, teacher, group },
      headers: {
        authorization: sessionStorage.getItem('token')
      }
    })
      .then(response =>
        dispatch({ type: MARK_AS_PRESENT_SUCCESS, payload: response.data }))
      .catch(err => dispatch({ type: MARK_AS_PRESENT_ERROR, payload: err }));
  };
}

export function removeAttendance(id) {
  return (dispatch) => {
    dispatch({ type: REMOVE_ATTENDANCE });
    axios({
      method: 'get',
      url: `/api/attendance/remove/${id}`,
      headers: {
        authorization: sessionStorage.getItem('token')
      }
    })
      .then(() => dispatch({ type: REMOVE_ATTENDANCE_SUCCESS, payload: id }))
      .catch(err => dispatch({ type: REMOVE_ATTENDANCE_ERROR, payload: err }));
  };
}

// export function markAsPresent(studentList, course, type, teacher, group) {
//   return (dispatch) => {
//     dispatch({ type: MARK_AS_PRESENT });
//     axios({
//       method: 'post',
//       url: '/api/attendance/markAsPresent',
//       data: { studentList, course, type, teacher, group },
//       headers: {
//         authorization: sessionStorage.getItem('token')
//       }
//     })
//       .then(response =>
//         dispatch({ type: MARK_AS_PRESENT_SUCCESS, payload: response.data }))
//       .catch(err => dispatch({ type: MARK_AS_PRESENT_ERROR, payload: err }));
//   };
// }

export function resetAttendance() {
  return {
    type: RESET_ATTENDANCE
  };
}

const INITIAL_STATE = {
  filter: { group: undefined, type: undefined },
  attendanceList: [],
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
        filter: { ...state.filter, group: action.payload },
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
    case CHANGE_TYPE:
      return {
        ...state,
        filter: { ...state.filter, type: action.payload },
        loading: true
      };
    case MARK_AS_PRESENT:
      return { ...state, loading: true };
    case MARK_AS_PRESENT_SUCCESS:
      return {
        ...state,
        attendanceList: [...state.attendanceList, action.payload],
        loading: false
      };
    case MARK_AS_PRESENT_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, loading: false, error };
    case REMOVE_ATTENDANCE:
      return { ...state, loading: true };
    case REMOVE_ATTENDANCE_SUCCESS:
      return {
        ...state,
        attendanceList: [
          ...state.attendanceList.filter(
            attendance => attendance._id !== action.payload
          )
        ],
        laoding: false
      };

    case REMOVE_ATTENDANCE_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, loading: false, error };
    case FETCH_ATTENDANCE:
      return { ...state, loading: true };
    case FETCH_ATTENDANCE_SUCCESS:
      return { ...state, attendanceList: [...action.payload], laoding: false };
    case FETCH_ATTENDANCE_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, loading: false, error };
    case RESET_ATTENDANCE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
