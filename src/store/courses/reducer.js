import { actionTypes } from './actionTypes';

const courseInitialState = {
	courses: [],
	currentCourse: {},
};

const courses = (state = courseInitialState, action) => {
	switch (action.type) {
		case actionTypes.GET_COURSE:
			return {
				...state,
				currentCourse: action.payload,
			};
		case actionTypes.SET_COURSES:
			return {
				...state,
				courses: action.payload,
			};
		case actionTypes.DELETE_COURSE:
			return {
				...state,
				courses: state.courses.filter((item) => item.id !== action.payload),
			};
		case actionTypes.SET_NEW_COURSE:
			return {
				...state,
				courses: [...state.courses, action.payload],
			};
		default:
			return state;
	}
};

export default courses;
