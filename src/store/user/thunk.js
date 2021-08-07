import { REACT_APP_BASE_URL } from '../../env-config';
import { actionCreators } from './actionCreators';

export function getUser(user) {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	};
	return async function getUserThunk(dispatch) {
		const response = await fetch(`${REACT_APP_BASE_URL}/login`, options);
		const res = await response.json();
		try {
			dispatch(actionCreators.login(res));
		} catch (error) {
			alert('Error');
		}
	};
}

export function logOutThunk(token) {
	const options = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${token}`,
		},
	};
	return function (dispatch) {
		return fetch(`${REACT_APP_BASE_URL}/logout`, options).then(() =>
			dispatch(actionCreators.logout())
		);
	};
}
