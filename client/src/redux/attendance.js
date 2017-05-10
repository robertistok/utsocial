import axios from 'axios';

const CHANGE_GROUP = 'redux/attendance/change-group';
const CHANGE_GROUP_SUCCESS = 'redux/attendance/change-group-success';
const CHANGE_GROUP_ERROR = 'redux/attendance/change-group-error';
const RESET_ATTENDANCE = 'redux/attendance/reset-state-attendance';

const CHANGE_TYPE = 'redux/attendance/change-type';
const CHANGE_SEMIGROUP = 'redux/attendance/change-semigroup';

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
        dispatch({ type: CHANGE_GROUP_SUCCESS, payload: response.data }))
      .catch(err => dispatch({ type: CHANGE_GROUP_ERROR, payload: err }));
  };
}

export function changeType(type) {
  return {
    type: CHANGE_TYPE,
    payload: type
  };
}

export function changeSemigroup(semigroup) {
  return {
    type: CHANGE_SEMIGROUP,
    payload: semigroup
  };
}

export function resetAttendance() {
  return {
    type: RESET_ATTENDANCE
  };
}

const INITIAL_STATE = {
  filter: { group: undefined, type: undefined, semigroup: '0' },
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
      return { ...state, students: action.payload.students, loading: false };
    case CHANGE_GROUP_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, loading: false, error };
    case CHANGE_TYPE:
      return { ...state, filter: { ...state.filter, type: action.payload } };
    case CHANGE_SEMIGROUP:
      return {
        ...state,
        filter: { ...state.filter, semigroup: action.payload }
      };
    case RESET_ATTENDANCE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
