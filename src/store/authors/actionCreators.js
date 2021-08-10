import { actionTypes } from './actionTypes';

export const actionCreators = {
	setAuthors: (data) => ({ type: actionTypes.SET_AUTHORS, payload: data }),
	addAuthor: (author) => ({ type: actionTypes.ADD_AUTHOR, payload: author }),
	deleteAuthor: (id) => ({ type: actionTypes.DELETE_AUTHOR, payload: id }),
	resetForm: () => ({ type: actionTypes.RESET_FORM }),
	resetAuthorForm: () => ({ type: actionTypes.RESET_AUTHOR_FORM }),
};
