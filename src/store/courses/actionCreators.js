import { actionTypes } from './actionTypes';

export const actionCreators = {
	setCourses: (data) => ({ type: actionTypes.SET_COURSES, payload: data }),
	deleteCourse: (id) => ({ type: actionTypes.DELETE_COURSE, payload: id }),
};
