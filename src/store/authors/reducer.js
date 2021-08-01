import { actionTypes } from './actionTypes';

const authorsInitialState = {
	authors: [],
	authorsForm: [],
};

const authors = (state = authorsInitialState, action) => {
	switch (action.type) {
		case actionTypes.GET_AUTHORS:
			return {
				...state,
				authors: action.payload,
			};
		case actionTypes.ADD_AUTHOR:
			return {
				...state,
				authorsForm: [...state.authorsForm, action.payload],
			};
		case actionTypes.DELETE_AUTHOR:
			return {
				...state,
				authorsForm: state.authorsForm.filter(
					(item) => item.id !== action.payload.id
				),
			};
		default:
			return state;
	}
};

export default authors;
