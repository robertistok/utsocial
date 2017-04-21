import axios from 'axios';

const ROOT_URL = '/api/messages';

const FETCH_CONVERSATIONS_OFUSER = 'redux/messages/fetch-conversations-ofuser';
const FETCH_CONVERSATIONS_OFUSER_SUCCESS = 'redux/messages/fetch-conversations-ofuser-success';
const FETCH_CONVERSATIONS_OFUSER_ERROR = 'redux/messages/fetch-conversations-ofuser-error';
const ADD_NEW_CONVERSATON = 'redux/messages/add-new-conversation';

export function addNewConversation(conversation) {
  return {
    type: ADD_NEW_CONVERSATON,
    payload: conversation
  };
}

export function getConversationsOfUser(user) {
  return (dispatch) => {
    dispatch({ type: FETCH_CONVERSATIONS_OFUSER });
    axios({
      method: 'get',
      url: `${ROOT_URL}/${user}`,
      headers: {
        authorization: sessionStorage.getItem('token')
      }
    })
      .then((response) => {
        dispatch({
          type: FETCH_CONVERSATIONS_OFUSER_SUCCESS,
          payload: response.data
        });
      })
      .catch(err =>
        dispatch({ type: FETCH_CONVERSATIONS_OFUSER_ERROR, payload: err }));
  };
}

const INITIAL_STATE = {
  conversations: [],
  loading: false,
  error: undefined
};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    case ADD_NEW_CONVERSATON:
      return {
        ...state,
        conversations: [...state.conversations, action.payload]
      };
    case FETCH_CONVERSATIONS_OFUSER:
      return { ...state, loading: true };
    case FETCH_CONVERSATIONS_OFUSER_SUCCESS:
      return { ...state, conversations: action.payload, loading: false };
    case FETCH_CONVERSATIONS_OFUSER_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, loading: false, error };
    default:
      return state;
  }
}
