import axios from 'axios';

const ROOT_URL = '/api/messages';

const FETCH_CONVERSATIONS_OFUSER = 'redux/messages/fetch-conversations-ofuser';
const FETCH_CONVERSATIONS_OFUSER_SUCCESS = 'redux/messages/fetch-conversations-ofuser-success';
const FETCH_CONVERSATIONS_OFUSER_ERROR = 'redux/messages/fetch-conversations-ofuser-error';
const FETCH_MESSAGES_OF_CONVERSATION = 'redux/messages/fetch-messages-of-conversation';
const FETCH_MESSAGES_OF_CONVERSATION_SUCCESS = 'redux/messages/fetch-messages-of-conversation-success';
const FETCH_MESSAGES_OF_CONVERSATION_ERROR = 'redux/messages/fetch-messages-of-conversation-error';

const ADD_NEW_CONVERSATON = 'redux/messages/add-new-conversation';
const ADD_NEW_MESSAGE = 'redux/messages/add-new-message';

export function addNewConversation(conversation) {
  return {
    type: ADD_NEW_CONVERSATON,
    payload: conversation
  };
}

export function addNewMessage(message) {
  return {
    type: ADD_NEW_MESSAGE,
    payload: message
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

export function selectConversation(id) {
  return (dispatch) => {
    dispatch({ type: FETCH_MESSAGES_OF_CONVERSATION });
    axios({
      method: 'get',
      url: `${ROOT_URL}/conversation/${id}`,
      headers: {
        authorization: sessionStorage.getItem('token')
      }
    })
      .then((response) => {
        dispatch({
          type: FETCH_MESSAGES_OF_CONVERSATION_SUCCESS,
          payload: response.data
        });
      })
      .catch(err =>
        dispatch({ type: FETCH_MESSAGES_OF_CONVERSATION_ERROR, payload: err }));
  };
}

const INITIAL_STATE = {
  conversations: null,
  selectedConversation: null,
  loading: false,
  error: undefined
};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    case ADD_NEW_CONVERSATON:
      return {
        ...state,
        conversations: [action.payload, ...state.conversations]
      };
    case ADD_NEW_MESSAGE: {
      return {
        ...state,
        selectedConversation: {
          ...state.selectedConversation,
          messages: [action.payload, ...state.selectedConversation.messages]
        },
        conversations: state.conversations.map((c) => {
          if (c._id === state.selectedConversation._id) {
            return Object.assign({}, c, { messages: [action.payload] });
          }
          return c;
        })
      };
    }
    case FETCH_CONVERSATIONS_OFUSER:
      return { ...state, loading: true };
    case FETCH_CONVERSATIONS_OFUSER_SUCCESS:
      return { ...state, conversations: action.payload, loading: false };
    case FETCH_CONVERSATIONS_OFUSER_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, loading: false, error };
    case FETCH_MESSAGES_OF_CONVERSATION:
      return { ...state, loading: true };
    case FETCH_MESSAGES_OF_CONVERSATION_SUCCESS:
      return { ...state, selectedConversation: action.payload, loading: false };
    case FETCH_MESSAGES_OF_CONVERSATION_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, loading: false, error };
    default:
      return state;
  }
}
