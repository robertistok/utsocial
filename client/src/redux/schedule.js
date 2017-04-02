import { SEMIGROUP, FREQUENCY } from '../constants';

const CHANGE_GROUP = 'utsocial/scehdule/changegroup';
const CHANGE_SEMIGROUP = 'utsocial/scehdule/changesemigroup';
const CHANGE_WEEK = 'utsocial/scehdule/changeweek';

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

export function changeGroup(group) {
  return {
    type: CHANGE_GROUP,
    payload: group
  };
}

const INITIAL_STATE = {
  semigroup: SEMIGROUP.BOTH,
  week: FREQUENCY.BOTH
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_SEMIGROUP:
      return { ...state, semigroup: action.payload };
    case CHANGE_WEEK:
      return { ...state, week: action.payload };
    case CHANGE_GROUP:
      return { ...state, group: action.payload };
    default:
      return state;
  }
}
