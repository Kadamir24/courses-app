import { actionTypes } from './actionTypes';

export const actionCreators = {
	login: (user) => ({ type: actionTypes.LOGIN_SUCCESS, payload: user }),
	logout: () => ({ type: actionTypes.LOGOUT }),
	setUserRole: (user) => ({ type: actionTypes.SET_USER_ROLE, payload: user }),
};
