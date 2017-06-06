import axios from 'axios';
import { createSelector } from 'reselect';

import { getToken } from '../utils/sessionOperations';

const FETCH_NOTIFICATIONS = 'redux/notifications/fetch-notifications';
const FETCH_NOTIFICATIONS_SUCCESS = 'redux/notifications/fetch-notifications-success';
const FETCH_NOTIFICATIONS_ERROR = 'redux/notifications/fetch-notifications-error';

const MARK_AS_SEEN = 'redux/notifications/mark-as-seen';
const MARK_AS_SEEN_SUCCESS = 'redux/notifications/mark-as-seen-success';
const MARK_AS_SEEN_ERROR = 'redux/notifications/mark-as-seen-error';

const OPEN_NOTIFICATIONS = 'redux/notifications/open';
const ADD_NOTIFICATION = 'redux/notificatiosn/add';

export function openNotifications() {
  return {
    type: OPEN_NOTIFICATIONS
  };
}

export function addNotification(notification) {
  return {
    type: ADD_NOTIFICATION,
    payload: notification
  };
}

export function fetchNotifications(props) {
  return (dispatch) => {
    dispatch({ type: FETCH_NOTIFICATIONS });
    axios({
      method: 'post',
      url: '/api/notifications/fetch',
      data: { ...props },
      headers: {
        authorization: getToken('token')
      }
    })
      .then(response =>
        dispatch({ type: FETCH_NOTIFICATIONS_SUCCESS, payload: response.data }))
      .catch(err =>
        dispatch({ type: FETCH_NOTIFICATIONS_ERROR, payload: err }));
  };
}

export function markAsSeen(props) {
  return (dispatch) => {
    dispatch({ type: MARK_AS_SEEN });
    axios({
      method: 'put',
      url: '/api/notifications/markAsSeen',
      data: { ...props },
      headers: {
        authorization: getToken('token')
      }
    })
      .then(() =>
        dispatch({
          type: MARK_AS_SEEN_SUCCESS,
          payload: { userID: props.userID }
        }))
      .catch(err => dispatch({ type: MARK_AS_SEEN_ERROR, payload: err }));
  };
}

const INITIAL_STATE = {
  items: [],
  opened: false,
  loading: true,
  error: undefined
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_NOTIFICATIONS:
      return { ...state, loading: true, error: undefined };
    case FETCH_NOTIFICATIONS_SUCCESS:
      return { ...state, items: action.payload.notifications, loading: false };
    case FETCH_NOTIFICATIONS_ERROR:
      return { ...state, loading: false, err: action.payload };

    case MARK_AS_SEEN:
      return { ...state, loading: true, error: undefined };
    case MARK_AS_SEEN_SUCCESS:
      return {
        ...state,
        items: state.items.map(
          item =>
            item.seenBy.find(user => user === action.payload.userID) ===
              undefined
              ? { ...item, seenBy: [...item.seenBy, action.payload.userID] }
              : item
        ),
        loading: false
      };
    case MARK_AS_SEEN_ERROR:
      return { ...state, loading: false, err: action.payload };

    case OPEN_NOTIFICATIONS:
      return { ...state, opened: true };
    case ADD_NOTIFICATION: {
      return {
        ...state,
        items: [action.payload, ...state.items],
        opened: false
      };
    }
    default:
      return state;
  }
}

const getNotifications = state => state.notifications.items;
const getUser = state => state.account.auth.user._id;
export const unseenNotificationsSelector = createSelector(
  [getNotifications, getUser],
  (notifications, userID) =>
    notifications.filter(
      n => n.seenBy.find(id => id === userID) === undefined
    ).length
);
