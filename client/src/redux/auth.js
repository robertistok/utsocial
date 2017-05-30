import axios from 'axios';

const ROOT_URL = '/api/auth';

const AUTH_USER = 'utsocial/auth/auth';
const AUTH_USER_SUCCESS = 'utsocial/auth/auth-success';
const AUTH_USER_ERROR = 'utsocial/auth/autherror';

const CHANGE_PASSWORD = '/redux/auth/change-password';
const CHANGE_PASSWORD_SUCCESS = '/redux/auth/change-password-success';
const CHANGE_PASSWORD_ERROR = '/redux/auth/change-password-error';

const VALIDATION = './redux/auth/validation';
const VALIDATION_SUCCESS = './redux/auth/validation-success';
const VALIDATION_ERROR = './redux/auth/validation-error';

const CHANGE_ACCOUNT_DETAILS = './redux/auth/change-account-details';
const CHANGE_ACCOUNT_DETAILS_SUCCESS = './redux/auth/change-account-details-success';
const CHANGE_ACCOUNT_DETAILS_ERROR = './redux/auth/change-account-details-error';

const RESET_CHANGE_PASSWORD_STATUS = '/redux/auth/resetChangePasswordStatus';
const RESET_CHANGE_ACCOUNT_STATUS = '/redux/auth/resetChangeAccountStatus';

const DEAUTH_USER = 'utsocial/auth/deauth';
const ME_FROM_TOKEN = 'utsocial/auth/mefromtoken';

export function authError(err) {
  let error;

  if (err.response.status === 401) {
    error = 'Username or password invalid';
  } else if (err.response.status === 500) {
    error = 'Network unavaliable';
  }

  return {
    type: AUTH_USER_ERROR,
    payload: error
  };
}

export function loginUser({ username, password }) {
  return (dispatch) => {
    dispatch({ type: AUTH_USER });
    axios
      .post(`${ROOT_URL}/login`, {
        username: username.toLowerCase().trim(),
        password
      })
      .then((response) => {
        dispatch({
          type: AUTH_USER_SUCCESS,
          payload: {
            token: response.data.token,
            user: response.data.user
          }
        });
        sessionStorage.setItem('token', response.data.token);
      })
      .catch(err => dispatch(authError(err)));
  };
}

export function meFromToken(token) {
  return (dispatch) => {
    axios
      .get(`${ROOT_URL}/mefromtoken`, {
        headers: { authorization: token }
      })
      .then(response =>
        dispatch({ type: ME_FROM_TOKEN, payload: response.data.user }));
  };
}

export function changePassword(formValues, username) {
  const { oldPassword, newPassword, verifyNewPassword } = formValues;
  return (dispatch) => {
    dispatch({ type: CHANGE_PASSWORD });
    axios({
      method: 'post',
      url: '/api/users/changePassword',
      data: {
        oldPassword,
        newPassword,
        verifyNewPassword,
        username
      },
      headers: {
        authorization: sessionStorage.getItem('token')
      }
    })
      .then((response) => {
        sessionStorage.setItem('token', response.data.token);
        return dispatch({
          type: CHANGE_PASSWORD_SUCCESS,
          payload: response.data
        });
      })
      .catch(err =>
        dispatch({ type: CHANGE_PASSWORD_ERROR, payload: err.response.data }));
  };
}

export function validation({ blurredField, value }) {
  const request = {
    method: 'post',
    data: { value },
    headers: {
      authorization: sessionStorage.getItem('token')
    }
  };

  if (blurredField === 'username') {
    request.url = '/api/users/validateUsername';
  } else if (blurredField === 'email') {
    request.url = '/api/users/validateEmail';
  } else if (blurredField === 'phone') {
    request.url = '/api/users/validatePhone';
  }

  return {
    type: VALIDATION,
    payload: axios(request)
  };
}

export function validationSuccess(response, type) {
  return {
    type: VALIDATION_SUCCESS,
    payload: { response, validationType: type }
  };
}

export function validationError(err, type) {
  return {
    type: VALIDATION_ERROR,
    payload: { payload: err.payload.response.data, validationType: type }
  };
}

export function changeAccountDetails(userID, query) {
  return (dispatch) => {
    dispatch({ type: CHANGE_ACCOUNT_DETAILS });
    axios({
      method: 'put',
      url: '/api/users/changeAccountDetails',
      data: {
        userID,
        query
      },
      headers: {
        authorization: sessionStorage.getItem('token')
      }
    })
      .then((response) => {
        sessionStorage.setItem('token', response.data.token);
        return dispatch({
          type: CHANGE_ACCOUNT_DETAILS_SUCCESS,
          payload: response.data
        });
      })
      .catch(err =>
        dispatch({ type: CHANGE_ACCOUNT_DETAILS_ERROR, payload: err }));
  };
}

export function resetChangePasswordStatus() {
  return {
    type: RESET_CHANGE_PASSWORD_STATUS
  };
}

export function resetChangeAccountStatus() {
  return {
    type: RESET_CHANGE_ACCOUNT_STATUS
  };
}

export function logOutUser() {
  sessionStorage.removeItem('token');
  return {
    type: DEAUTH_USER
  };
}

const INITIAL_STATE = {
  user: undefined,
  authenticated: false,
  error: undefined,
  loading: false,
  changePasswordStatus: undefined,
  changeAccountStatus: {
    validation: {
      email: undefined,
      username: undefined,
      phone: undefined
    },
    error: undefined,
    text: undefined,
    loading: false
  }
};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    case AUTH_USER:
      return { ...state, loading: true };
    case AUTH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        authenticated: true,
        error: undefined,
        loading: false
      };
    case AUTH_USER_ERROR:
      error = action.payload || { message: action.payload.message };
      return {
        ...state,
        authenticated: false,
        error,
        loading: false
      };

    case CHANGE_PASSWORD:
      return { ...state, changePasswordStatus: undefined, loading: true };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        user: action.payload.cleanUser,
        changePasswordStatus: { error: false, text: action.payload.message },
        error: undefined,
        loading: false
      };
    case CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        changePasswordStatus: { error: true, text: action.payload },
        loading: false
      };

    case VALIDATION:
      return {
        ...state,
        changeAccountStatus: {
          ...state.changeAccountStatus,
          validation: {
            ...state.changeAccountStatus,
            [action.type.validationType]: { loading: true }
          }
        }
      };
    case VALIDATION_SUCCESS:
      return {
        ...state,
        changeAccountStatus: {
          ...state.changeAccountStatus,
          validation: {
            ...state.changeAccountStatus,
            [action.type.validationType]: {
              loading: false,
              message: action.payload.response
            }
          }
        }
      };
    case VALIDATION_ERROR:
      return {
        ...state,
        changeAccountStatus: {
          ...state.changeAccountStatus,
          validation: {
            ...state.changeAccountStatus,
            [action.type.validationType]: {
              loading: false,
              message: action.payload.err
            }
          }
        }
      };

    case CHANGE_ACCOUNT_DETAILS:
      return {
        ...state,
        changeAccountStatus: { loading: true }
      };
    case CHANGE_ACCOUNT_DETAILS_SUCCESS:
      return {
        ...state,
        user: action.payload.cleanUser,
        changeAccountStatus: {
          error: false,
          text: action.payload.message,
          loading: false
        },
        error: undefined,
        loading: false
      };
    case CHANGE_ACCOUNT_DETAILS_ERROR:
      return {
        ...state,
        changeAccountStatus: {
          error: true,
          text: action.payload,
          loading: false
        },
        loading: false
      };
    case ME_FROM_TOKEN:
      return {
        ...state,
        user: action.payload,
        authenticated: true,
        error: undefined
      };
    case DEAUTH_USER:
      return {
        ...state,
        user: undefined,
        authenticated: false,
        error: undefined
      };
    case RESET_CHANGE_PASSWORD_STATUS:
      return { ...state, changePasswordStatus: undefined };
    case RESET_CHANGE_ACCOUNT_STATUS:
      return { ...state, changeAccountStatus: undefined };
    default:
      return state;
  }
}
