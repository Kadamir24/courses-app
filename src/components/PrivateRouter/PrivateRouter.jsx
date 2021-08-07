import React from 'react';
import { Redirect, Route } from 'react-router';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({ component: Component, ...rest }) => {
	const admin = useSelector((state) => state.authentication.email);
	return (
		<Route
			{...rest}
			render={(props) =>
				admin === 'admin@email.com' ? (
					<Component {...props} />
				) : (
					<Redirect to='/courses' />
				)
			}
		/>
	);
};
