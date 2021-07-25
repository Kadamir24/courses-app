export const fetchDataRegister = (newItem, query) => {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newItem),
	};

	fetch(`${process.env.REACT_APP_BASE_URL}/${query}`, options).then((data) => {
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

	fetch(`${process.env.REACT_APP_BASE_URL}/login`, options)
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

export const fetchDataGo = (path, setSomething) => {
	const fetchData = async () => {
		const result = await fetch(`${process.env.REACT_APP_BASE_URL}/${path}`);
		const res = await result.json();
		setSomething(res.result);
	};
	fetchData();
};

export const fetchDataWithId = (id, setSomething, setLoading) => {
	const fetchData = async (id) => {
		const result = await fetch(
			`${process.env.REACT_APP_BASE_URL}/courses/${id}`
		);
		const res = await result.json();
		const newCourse = res.result;
		setSomething(newCourse);
		if (newCourse !== undefined) {
			setLoading(false);
		}
	};
	fetchData(id);
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

	fetch(`${process.env.REACT_APP_BASE_URL}/${path}`, options).then((data) => {
		if (!data.ok) {
			alert('Somethin went wrong');
		}
		return data.json();
	});
};
