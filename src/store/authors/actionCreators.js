import { actionTypes } from './actionTypes';

export const actionCreators = {
	getAuthors: (data) => ({ type: actionTypes.GET_AUTHORS, payload: data }),
	addAuthor: (author) => ({ type: actionTypes.ADD_AUTHOR, payload: author }),
	deleteAuthor: (id) => ({ type: actionTypes.DELETE_AUTHOR, payload: id }),
};
