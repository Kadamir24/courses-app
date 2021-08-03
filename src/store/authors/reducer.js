import { actionTypes } from './actionTypes';

const authorsInitialState = {
	authors: [],
	authorsForm: [],
	enabledAuthors: [],
};

const authors = (state = authorsInitialState, action) => {
	switch (action.type) {
		case actionTypes.SET_AUTHORS:
			return {
				...state,
				authors: action.payload,
				enabledAuthors: action.payload,
			};
		case actionTypes.ADD_AUTHOR:
			return {
				...state,
				authorsForm: [...state.authorsForm, action.payload],
				enabledAuthors: state.enabledAuthors.filter(
					(item) => item.id !== action.payload.id
				),
			};
		case actionTypes.DELETE_AUTHOR:
			return {
				...state,
				authorsForm: state.authorsForm.filter(
					(item) => item.id !== action.payload.id
				),
				enabledAuthors: [...state.enabledAuthors, action.payload],
			};
		case actionTypes.RESET_FORM:
			return {
				...state,
				authorsForm: [],
				enabledAuthors: [],
			};
		default:
			return state;
	}
};

export default authors;
