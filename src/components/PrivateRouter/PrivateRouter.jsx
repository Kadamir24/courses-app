import React from 'react';
import { Redirect, Route } from 'react-router';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({ component: Component, ...rest }) => {
	const admin = useSelector((state) => state.authentication.role);
	return admin === 'admin' ? (
		<Route {...rest} render={(props) => <Component {...props} />} />
	) : (
		<Redirect to='/courses' />
	);
};
