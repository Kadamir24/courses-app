import { REACT_APP_BASE_URL } from '../env-config';

export const fetchDataRegister = (newItem, query) => {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newItem),
	};

	fetch(`${REACT_APP_BASE_URL}/${query}`, options).then((data) => {
		if (!data.ok) {
			alert('Not Ok');
		}
		return data.json();
	});
};

export const fetchLogin = (user, history) => {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	};

	fetch(`${REACT_APP_BASE_URL}/login`, options)
		.then((data) => {
			if (!data.ok) {
				alert('Not found');
			}
			return data.json();
		})
		.then((json) => localStorage.setItem('token', json.result))
		.then(() =>
			localStorage.getItem('token') !== 'undefined'
				? history.push('/courses')
				: ''
		);
};

export const fetchDataGo = async (path) => {
	const fetchData = async () => {
		const result = await fetch(`${REACT_APP_BASE_URL}/${path}`);
		const res = await result.json();
		return res.result;
	};
	const data = await fetchData();
	return data;
};

export const fetchDataWithId = async (id) => {
	const fetchData = async (id) => {
		const result = await fetch(`${REACT_APP_BASE_URL}/courses/${id}`);
		const res = await result.json();
		const newCourse = res.result;
		return newCourse;
	};
	const nCourse = await fetchData(id);
	return nCourse;
};

export const fetchWithToken = (path, item, token) => {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${token}`,
		},
		body: JSON.stringify(item),
	};

	return fetch(`${REACT_APP_BASE_URL}/${path}`, options).then((data) => {
		if (!data.ok) {
			alert('Somethin went wrong');
		}
		return data.json();
	});
};
