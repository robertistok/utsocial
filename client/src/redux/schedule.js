import axios from 'axios';

import { SEMIGROUP, FREQUENCY } from '../constants';

const ROOT_URL = '/api/schedules';

const CHANGE_SCHEDULEOF = 'utsocial/scehdule/change-scheduleof';
const CHANGE_SEMIGROUP = 'utsocial/scehdule/changesemigroup';
const CHANGE_WEEK = 'utsocial/scehdule/changeweek';

const ADD_NEW_SCHEDULE = 'utsocial/schedule/add-new-schedule';
const ADD_NEW_SCHEDULE_SUCCESS = 'utsocial/schedule/add-new-schedule-success';
const ADD_NEW_SCHEDULE_ERROR = 'utsocial/schedule/add-new-schedule-error';

const FETCH_SCHEDULE = 'utsocial/schedule/fetch-schedule';
const FETCH_SCHEDULE_SUCCESS = 'utsocial/schedule/fetch-schedule-success';
const FETCH_SCHEDULE_ERROR = 'utsocial/schedule/fetch-schedule-error';

const FETCH_TEACHER_SCHEDULE = 'utsocial/schedule/fetch-teacher-schedule';
const FETCH_TEACHER_SCHEDULE_SUCCESS = 'utsocial/schedule/fetch-teacher-schedule-success';
const FETCH_TEACHER_SCHEDULE_ERROR = 'utsocial/schedule/fetch-teacher-schedule-error';

export function changeSemigroup(semigroup) {
  return {
    type: CHANGE_SEMIGROUP,
    payload: semigroup
  };
}

export function changeWeek(week) {
  return {
    type: CHANGE_WEEK,
    payload: week
  };
}

export function changeScheduleOf(group) {
  return {
    type: CHANGE_SCHEDULEOF,
    payload: group
  };
}

export function addNewSchedule(values) {
  const request = axios({
    method: 'post',
    url: `${ROOT_URL}/new`,
    headers: {
      authorization: sessionStorage.getItem('token')
    },
    data: values
  });
  return {
    type: ADD_NEW_SCHEDULE,
    payload: request
  };
}

export function addNewScheduleSucces(response) {
  return {
    type: ADD_NEW_SCHEDULE_SUCCESS,
    payload: response
  };
}

export function addNewScheduleError(error) {
  return {
    type: ADD_NEW_SCHEDULE_ERROR,
    payload: error
  };
}

export function fetchSchedulesFor(id) {
  return (dispatch) => {
    dispatch({ type: FETCH_SCHEDULE });
    axios({
      method: 'get',
      url: `${ROOT_URL}/get/${id}`,
      headers: {
        authorization: sessionStorage.getItem('token')
      }
    })
      .then(response =>
        dispatch({
          type: FETCH_SCHEDULE_SUCCESS,
          payload: response.data
        }))
      .catch(err => dispatch({ type: FETCH_SCHEDULE_ERROR, payload: err }));
  };
}

const INITIAL_STATE = {
  semigroup: SEMIGROUP.BOTH,
  week: FREQUENCY.BOTH,
  selectedTeacher: undefined,
  newSchedule: undefined,
  scheduleList: [],
  loading: false,
  error: undefined
};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    case CHANGE_SEMIGROUP:
      return { ...state, semigroup: action.payload };
    case CHANGE_WEEK:
      return { ...state, week: action.payload };
    case CHANGE_SCHEDULEOF:
      return { ...state, scheduleOf: action.payload };
    case ADD_NEW_SCHEDULE:
      return { ...state, newSchedule: { ...state.newSchedule, loading: true } };
    case ADD_NEW_SCHEDULE_SUCCESS:
      return {
        ...state,
        scheduleList: [...state.scheduleList, action.payload],
        loading: false
      };
    case ADD_NEW_SCHEDULE_ERROR:
      error = action.payload || { message: action.payload.message };
      return {
        ...state,
        newSchedule: {
          ...state.newSchedule,
          error,
          loading: false
        }
      };
    case FETCH_SCHEDULE:
      return { ...state, loading: true };
    case FETCH_SCHEDULE_SUCCESS:
      return { ...state, scheduleList: action.payload, loading: false };
    case FETCH_SCHEDULE_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, loading: false, error };

    case FETCH_TEACHER_SCHEDULE:
      return { ...state, loading: true };
    case FETCH_TEACHER_SCHEDULE_SUCCESS:
      return { ...state, scheduleList: action.payload, loading: false };
    case FETCH_TEACHER_SCHEDULE_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, loading: false, error };
    default:
      return state;
  }
}
