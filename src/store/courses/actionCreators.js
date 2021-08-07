import { actionTypes } from './actionTypes';

export const actionCreators = {
	getCourse: (id) => ({ type: actionTypes.GET_COURSE, payload: id }),
	setCourses: (data) => ({ type: actionTypes.SET_COURSES, payload: data }),
	deleteCourse: (id) => ({ type: actionTypes.DELETE_COURSE, payload: id }),
	setNewCourse: (data) => ({ type: actionTypes.SET_NEW_COURSE, payload: data }),
};
