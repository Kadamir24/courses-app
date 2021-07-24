export const timeConverter = (num) => {
	let hours = Math.floor(num / 60);
	let minutes = num % 60;
	hours = hours < 10 ? '0' + hours : hours;
	minutes = minutes < 10 ? '0' + minutes : minutes;
	return hours + ':' + minutes;
};

export const createDate = () => {
	let today = new Date();
	const dd = String(today.getDate()).padStart(2, '0');
	const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	const yyyy = today.getFullYear();

	today = mm + '/' + dd + '/' + yyyy;
	return today;
};

export const fetchDataRegister = (newItem, query) => {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newItem),
	};

	fetch(`http://localhost:3000/${query}`, options).then((data) => {
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

	fetch('http://localhost:3000/login', options)
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
		const result = await fetch(`http://localhost:3000/${path}`);
		const res = await result.json();
		setSomething(res.result);
	};
	fetchData();
};
