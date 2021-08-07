import { REACT_APP_BASE_URL } from '../../env-config';
import { actionCreators } from './actionCreators';

export async function thunk_getCourses(dispatch) {
	const response = await fetch(`${REACT_APP_BASE_URL}/courses/all`);
	const res = await response.json();
	dispatch(actionCreators.setCourses(res.result));
}

export function getCourseById(id) {
	return async function thunk_getCourseById(dispatch) {
		const response = await fetch(`${REACT_APP_BASE_URL}/courses/${id}`);
		const res = await response.json();
		dispatch(actionCreators.getCourse(res.result));
	};
}

export function deleteCourseThunk(id, token) {
	const options = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${token}`,
		},
	};
	return function (dispatch) {
		return fetch(`${REACT_APP_BASE_URL}/courses/${id}`, options)
			.then((data) => {
				if (!data.ok) {
					alert('Somethin went wrong');
				}
				return data.json();
			})
			.then(() => dispatch(actionCreators.deleteCourse(id)));
	};
}

export const addCourseThunk = (item, token) => {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${token}`,
		},
		body: JSON.stringify(item),
	};
	return function (dispatch) {
		return fetch(`${REACT_APP_BASE_URL}/courses/add`, options)
			.then((data) => {
				if (!data.ok) {
					alert('Somethin went wrong');
				}
				return data.json();
			})
			.then((data) => dispatch(actionCreators.setNewCourse(data.result)));
	};
};

export const updateCourseThunk = (courseId, item, token) => {
	const options = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `${token}`,
		},
		body: JSON.stringify(item),
	};
	return function (dispatch) {
		return fetch(`${REACT_APP_BASE_URL}/courses/${courseId}`, options)
			.then((data) => {
				if (!data.ok) {
					alert('Somethin went wrong');
				}
				return data.json();
			})
			.then((data) => dispatch(actionCreators.setNewCourse(data.result)));
	};
};
