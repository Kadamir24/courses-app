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
