import axios from 'axios';

const CHANGE_GROUP = 'redux/grades/change-group';
const CHANGE_GROUP_SUCCESS = 'redux/grades/change-group-success';
const CHANGE_GROUP_ERROR = 'redux/grades/change-group-error';

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

export function resetAttendance() {
  return {
    type: RESET_GRADES
  };
}

const INITIAL_STATE = {
  selectedGroup: undefined,
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

    case RESET_GRADES:
      return INITIAL_STATE;
    default:
      return state;
  }
}
