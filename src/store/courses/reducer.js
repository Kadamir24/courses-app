import { actionTypes } from './actionTypes';

const courseInitialState = {
	courses: [],
};

const courses = (state = courseInitialState, action) => {
	switch (action.type) {
		case actionTypes.GET_COURSES:
			return {
				...state,
				courses: action.payload,
			};
		case actionTypes.DELETE_COURSE:
			return {
				...state,
				courses: state.courses.filter((item) => item.id !== action.payload),
				// courses: state.courses.find(item => item ),
			};
		default:
			return state;
	}
};

export default courses;
