import { actionTypes } from './actionTypes';

export const actionCreators = {
	getCourses: (data) => ({ type: actionTypes.GET_COURSES, payload: data }),
	deleteCourse: (id) => ({ type: actionTypes.DELETE_COURSE, payload: id }),
};
