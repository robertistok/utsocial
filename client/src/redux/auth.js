import axios from 'axios';

const ROOT_URL = 'http://localhost:3001/api/auth';

const AUTH_USER = 'utsocial/auth/auth';
const AUTH_ERROR = 'utsocial/auth/autherror';

export function authError(err) {
	return {
		type: AUTH_ERROR,
		payload: err,
	};
}

export function loginUser({ username, password }) {
	return function (dispatch) {
		axios.post(`${ROOT_URL}/login`, { username, password })
			.then((response) => {
				dispatch({ type: AUTH_USER, payload: response.data.user });
				localStorage.setItem('token', response.data.token);
				// redirect to...
			})
			.catch(err => dispatch(authError(err)));
	};
}

const INITIAL_STATE = { authenticated: false };

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case AUTH_USER:
			return { ...state, authenticated: 'true' };
		default:
			return state;
	}
}
