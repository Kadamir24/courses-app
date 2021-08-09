import { REACT_APP_BASE_URL } from '../../env-config';
import { actionCreators } from './actionCreators';

export function getAuthorsThunk() {
	return async function getAuthors(dispatch) {
		const response = await fetch(`${REACT_APP_BASE_URL}/authors/all`);
		const res = await response.json();
		dispatch(actionCreators.setAuthors(res.result));
	};
}

export const addAuthorThunk = (item, token) => {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${token}`,
		},
		body: JSON.stringify(item),
	};
	return function (dispatch) {
		return fetch(`${REACT_APP_BASE_URL}/authors/add`, options)
			.then((data) => {
				if (!data.ok) {
					alert('Somethin went wrong');
				}
				return data.json();
			})
			.then(() => dispatch(getAuthorsThunk()));
	};
};
