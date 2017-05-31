import axios from 'axios';

const CHANGE_PASSWORD = '/redux/account/preferences/change-password';
const CHANGE_PASSWORD_SUCCESS = '/redux/account/preferences/change-password-success';
const CHANGE_PASSWORD_ERROR = '/redux/account/preferences/change-password-error';

const VALIDATION = '/redux/account/preferences/validation';
const VALIDATION_SUCCESS = '/redux/account/preferences/validation-success';
const VALIDATION_ERROR = '/redux/account/preferences/validation-error';

const CHANGE_ACCOUNT_DETAILS = '/redux/account/preferences/change-account-details';
const CHANGE_ACCOUNT_DETAILS_SUCCESS = '/redux/account/preferences/change-account-details-success';
const CHANGE_ACCOUNT_DETAILS_ERROR = '/redux/account/preferences/change-account-details-error';

const RESET_PREFERENCES_STATE = '/redux/account/preferences/reset';

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

export function resetPreferencesState() {
  return {
    type: RESET_PREFERENCES_STATE
  };
}

const INITIAL_STATE = {
  password: {
    error: false,
    loading: false,
    status: undefined
  },
  account: {
    validation: {
      email: undefined,
      username: undefined,
      phone: undefined
    },
    error: false,
    status: undefined,
    loading: false
  }
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_PASSWORD:
      return { ...state, password: { loading: true } };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        password: {
          error: false,
          status: action.payload.message,
          loading: false
        }
      };
    case CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        password: { error: true, status: action.payload, loading: false }
      };

    case VALIDATION:
      return {
        ...state,
        account: {
          ...state.account,
          validation: {
            ...state.account.validation,
            [action.type.validationType]: { loading: true }
          }
        }
      };
    case VALIDATION_SUCCESS:
      return {
        ...state,
        account: {
          ...state.account,
          validation: {
            ...state.account.validation,
            [action.type.validationType]: {
              loading: false,
              status: action.payload.response
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
              status: action.payload.err
            }
          }
        }
      };

    case CHANGE_ACCOUNT_DETAILS:
      return {
        ...state,
        account: { loading: true }
      };
    case CHANGE_ACCOUNT_DETAILS_SUCCESS:
      return {
        ...state,
        account: {
          error: false,
          status: action.payload.message,
          loading: false
        },
        error: undefined,
        loading: false
      };
    case CHANGE_ACCOUNT_DETAILS_ERROR:
      return {
        ...state,
        account: {
          error: true,
          status: action.payload,
          loading: false
        },
        loading: false
      };

    case RESET_PREFERENCES_STATE:
      return INITIAL_STATE;

    default:
      return state;
  }
}
