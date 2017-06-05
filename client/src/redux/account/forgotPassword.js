import axios from 'axios';

const VALIDATE_FORGOT_EMAIL = '/redux/account/forgotPassword/validate-forgot-email';

const SEND_RESET_PASSWORD_MAIL = '/redux/account/forgotPassword/send-reset-password-mail';
const SEND_RESET_PASSWORD_MAIL_SUCCESS = '/redux/account/forgotPassword/send-reset-password-mail-success';
const SEND_RESET_PASSWORD_MAIL_ERROR = '/redux/account/forgotPassword/send-reset-password-mail-error';

const CHECK_VALIDITY_OF_TOKEN_SUCCESS = '/redux/account/forgotPassword/check-validity-of-token-success';
const CHECK_VALIDITY_OF_TOKEN_ERROR = '/redux/account/forgotPassword/check-validity-of-token-error';

const RESET_PASSWORD = 'redux/account/forgotPassword/reset-password';
const RESET_PASSWORD_SUCCESS = 'redux/account/forgotPassword/reset-password-success';
const RESET_PASSWORD_ERROR = 'redux/account/forgotPassword/reset-password-error';

const RESET_FORGOT_PASSWORD_STATE = 'redux/acount/forgotPassword/reset-state';

export function validateForgotEmail(email) {
  const request = axios({
    method: 'get',
    url: `/api/auth/validateEmail/${email}`
  });

  return {
    type: VALIDATE_FORGOT_EMAIL,
    payload: request
  };
}

export function sendResetPasswordEmail(email) {
  return (dispatch) => {
    dispatch({ type: SEND_RESET_PASSWORD_MAIL });
    axios({
      method: 'post',
      url: '/api/auth/forgotPassword',
      data: email
    })
      .then(response =>
        dispatch({ type: SEND_RESET_PASSWORD_MAIL_SUCCESS, payload: response }))
      .catch(err =>
        dispatch({ type: SEND_RESET_PASSWORD_MAIL_ERROR, payload: err }));
  };
}

export function checkValidityOfToken(token) {
  return (dispatch) => {
    axios({
      method: 'get',
      url: `/api/auth/checkValidityOfToken/${token}`
    })
      .then(response =>
        dispatch({
          type: CHECK_VALIDITY_OF_TOKEN_SUCCESS,
          payload: response.data
        }))
      .catch(err =>
        dispatch({
          type: CHECK_VALIDITY_OF_TOKEN_ERROR,
          payload: err.response.data
        }));
  };
}

export function resetForgottenPassword(token, newPassword, verifyNewPassword) {
  return (dispatch) => {
    dispatch({ type: RESET_PASSWORD });
    axios({
      method: 'post',
      url: '/api/auth/resetForgottenPassword',
      data: {
        token,
        newPassword,
        verifyNewPassword
      }
    })
      .then(response =>
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: response.data }))
      .catch(err =>
        dispatch({ type: RESET_PASSWORD_ERROR, payload: err.response.data }));
  };
}

export function resetForgotPasswordState() {
  return {
    type: RESET_FORGOT_PASSWORD_STATE
  };
}

const INITIAL_STATE = {
  status: undefined,
  loading: false,
  error: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SEND_RESET_PASSWORD_MAIL: {
      return { ...state, loading: true };
    }
    case SEND_RESET_PASSWORD_MAIL_SUCCESS: {
      return {
        ...state,
        status: action.payload.data.message,
        loading: false
      };
    }
    case SEND_RESET_PASSWORD_MAIL_ERROR: {
      return {
        ...state,
        status: action.payload,
        loading: false
      };
    }

    case CHECK_VALIDITY_OF_TOKEN_SUCCESS: {
      return {
        ...state,
        status: action.payload
      };
    }

    case CHECK_VALIDITY_OF_TOKEN_ERROR: {
      return {
        ...state,
        status: action.payload,
        error: true
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        status: action.payload.message
      };
    }
    case RESET_PASSWORD_ERROR: {
      return {
        ...state,
        status: action.payload,
        error: true
      };
    }

    case RESET_FORGOT_PASSWORD_STATE: {
      return INITIAL_STATE;
    }

    default:
      return state;
  }
}
