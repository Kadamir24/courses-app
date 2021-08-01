import { actionTypes } from './actionTypes';

const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '' || localStorage.getItem('token'),
};

const authentication = (state = userInitialState, action) => {
	switch (action.type) {
		case actionTypes.LOGIN_SUCCESS:
			return {
				...state,
				isAuth: true,
				name: action.payload.user.name,
				email: action.payload.user.email,
				token: action.payload.result,
			};
		case actionTypes.LOGIN_FAIL:
			return {
				...state,
				isAuth: false,
			};
		case actionTypes.LOGOUT:
			return {
				...state,
				isAuth: false,
				name: '',
				email: '',
				token: '',
			};
		default:
			return state;
	}
};

export default authentication;
