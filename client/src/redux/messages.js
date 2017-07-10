import axios from 'axios';
import { createSelector } from 'reselect';

import { getToken } from '../utils/sessionOperations';

const ROOT_URL = '/api/messages';

const FETCH_CONVERSATIONS_OFUSER = 'redux/messages/fetch-conversations-ofuser';
const FETCH_CONVERSATIONS_OFUSER_SUCCESS = 'redux/messages/fetch-conversations-ofuser-success';
const FETCH_CONVERSATIONS_OFUSER_ERROR = 'redux/messages/fetch-conversations-ofuser-error';

const FETCH_MESSAGES_OF_CONVERSATION = 'redux/messages/fetch-messages-of-conversation';
const FETCH_MESSAGES_OF_CONVERSATION_SUCCESS = 'redux/messages/fetch-messages-of-conversation-success';
const FETCH_MESSAGES_OF_CONVERSATION_ERROR = 'redux/messages/fetch-messages-of-conversation-error';

const SEND_MESSAGE = 'redux/messages/send-message';
const SEND_MESSAGE_ERROR = 'redux/messages/send-message-error';

const NEW_CONVERSATION = 'redux/messages/new-conversation';
const NEW_CONVERSATION_ERROR = 'redux/messages/new-conversation-error';

const READ_MESSAGES_OF_CONVERSATION = 'redux/messages/read-messages-of-conversation';
const STAR_CONVERSATION_FOR_USER = 'redux/messages/star-conversation-for-user';
const FILTER_CONVERSATIONS = 'redux/messages/filter-conversations';
const SEARCH_CONVERSATIONS = 'redux/messages/search-conversations';

const ADD_NEW_CONVERSATON = 'redux/messages/add-new-conversation';
const ADD_NEW_MESSAGE = 'redux/messages/add-new-message';

export function addNewConversation(conversation, userID) {
  return {
    type: ADD_NEW_CONVERSATON,
    payload: { conversation, userID }
  };
}

export function addNewMessage(props) {
  return {
    type: ADD_NEW_MESSAGE,
    payload: { ...props }
  };
}

export function filterConversations(by) {
  return {
    type: FILTER_CONVERSATIONS,
    payload: by
  };
}

export function changeSearchterm(searchTerm) {
  return {
    type: SEARCH_CONVERSATIONS,
    payload: searchTerm
  };
}

export function getConversationsOfUser(userID) {
  return (dispatch) => {
    dispatch({ type: FETCH_CONVERSATIONS_OFUSER });
    axios({
      method: 'get',
      url: `${ROOT_URL}/${userID}`,
      headers: {
        authorization: getToken()
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
        authorization: getToken()
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

export function sendMessage(conversationID, text, sender) {
  return (dispatch) => {
    dispatch({ type: SEND_MESSAGE });
    axios({
      method: 'post',
      url: `${ROOT_URL}/sendMessage`,
      data: { conversationID, text, sender },
      headers: {
        authorization: getToken()
      }
    })
      .then(response =>
        dispatch({
          type: ADD_NEW_MESSAGE,
          payload: response.data
        }))
      .catch(err => dispatch({ type: SEND_MESSAGE_ERROR, payload: err }));
  };
}

export function newConversation(target, sender, text, subject, userID) {
  return (dispatch) => {
    dispatch({ type: NEW_CONVERSATION });
    axios({
      method: 'post',
      url: `${ROOT_URL}/newConversation`,
      data: { target, sender, text, subject },
      headers: {
        authorization: getToken()
      }
    })
      .then(response =>
        dispatch(addNewConversation(response.data.newConversation, userID)))
      .catch(err => dispatch({ type: NEW_CONVERSATION_ERROR, payload: err }));
  };
}

export function readMessages(id) {
  return (dispatch) => {
    axios({
      method: 'get',
      url: `${ROOT_URL}/read/${id}`,
      headers: {
        authorization: getToken()
      }
    }).then(() => {
      dispatch({
        type: READ_MESSAGES_OF_CONVERSATION,
        payload: id
      });
    });
  };
}

export function starConversation(id, user) {
  return (dispatch) => {
    axios({
      method: 'post',
      url: `${ROOT_URL}/star`,
      data: { id, user },
      headers: {
        authorization: getToken()
      }
    }).then((response) => {
      dispatch({
        type: STAR_CONVERSATION_FOR_USER,
        payload: { id, starred: response.data.starred }
      });
    });
  };
}

const INITIAL_STATE = {
  conversations: null,
  selectedConversation: null,
  loading: false,
  sendingMessage: false,
  error: undefined,
  filter: 'all',
  searchTerm: ''
};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    case ADD_NEW_CONVERSATON:
      return {
        ...state,
        conversations: [action.payload.conversation, ...state.conversations],
        selectedConversation: action.payload.userID === undefined
          ? action.payload.conversation
          : state.selectedConversation
      };
    case ADD_NEW_MESSAGE: {
      return {
        ...state,
        selectedConversation: state.selectedConversation !== null &&
          state.selectedConversation._id === action.payload.conversationID
          ? {
              ...state.selectedConversation,
              messages: [
                action.payload.newMessage,
                ...state.selectedConversation.messages
              ]
            }
          : state.selectedConversation,
        conversations: state.conversations
          .map((c) => {
            if (c._id === action.payload.conversationID) {
              return Object.assign({}, c, {
                messages: [action.payload.newMessage]
              });
            }
            return c;
          })
          .slice(0)
          .sort(
            (c1, c2) =>
              Date.parse(c2.messages[0].timestamp) -
              Date.parse(c1.messages[0].timestamp)
          )
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

    case SEND_MESSAGE:
      return { ...state, sendingMessage: true };
    case SEND_MESSAGE_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, sendingMessage: false, error };

    case NEW_CONVERSATION:
      return { ...state, sendingMessage: true };
    case NEW_CONVERSATION_ERROR:
      error = action.payload || { message: action.payload.message };
      return { ...state, sendingMessage: false, error };

    case READ_MESSAGES_OF_CONVERSATION:
      return {
        ...state,
        conversations: state.conversations.map((c) => {
          if (c._id === action.payload) {
            return Object.assign({}, c, {
              messages: c.messages.map(message =>
                Object.assign({}, message, { unread: false }))
            });
          }
          return c;
        })
      };
    case STAR_CONVERSATION_FOR_USER:
      return {
        ...state,
        conversations: state.conversations.map((c) => {
          if (c._id === action.payload.id) {
            return Object.assign({}, c, {
              starred: [...action.payload.starred]
            });
          }
          return c;
        }),
        selectedConversation: state.selectedConversation._id ===
          action.payload.id
          ? {
              ...state.selectedConversation,
              starred: [...action.payload.starred]
            }
          : { ...state.selectedConversation }
      };
    case FILTER_CONVERSATIONS:
      return { ...state, filter: action.payload };
    case SEARCH_CONVERSATIONS:
      return { ...state, searchTerm: action.payload };
    default:
      return state;
  }
}

const getFilter = state => state.messages.filter;
const getSearchTerm = state => state.messages.searchTerm;
const getConversations = state => state.messages.conversations;
const getUser = state => state.account.auth.user._id;

export const conversationsSelector = createSelector(
  [getFilter, getSearchTerm, getConversations, getUser],
  (filter, searchTerm, conversations, user) => {
    if (conversations) {
      let filteredConversations;
      switch (filter) {
        case 'red':
          filteredConversations = conversations.filter(
            c =>
              (!c.messages[0].unread && c.messages[0].sender !== user) ||
              c.messages[0].sender === user
          );
          break;
        case 'unread':
          filteredConversations = conversations.filter(
            c => c.messages[0].unread && c.messages[0].sender !== user
          );
          break;
        case 'star':
          filteredConversations = conversations.filter(
            c => c.starred.indexOf(user) > -1
          );
          break;
        case 'unstar':
          filteredConversations = conversations.filter(
            c => c.starred.indexOf(user) === -1
          );
          break;
        default:
          filteredConversations = conversations;
      }

      if (searchTerm !== '') {
        return filteredConversations.filter((conv) => {
          const partner = conv.participants.find(p => p.username !== user);
          const name = `${partner.firstname} ${partner.lastname}`;

          return name.toLowerCase().includes(searchTerm.trim().toLowerCase());
        });
      }

      return filteredConversations;
    }
    return conversations;
  }
);
