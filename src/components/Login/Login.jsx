import React, { useState } from 'react';
import InputField from '../Input/Input';
import { Button } from '../Button/Button';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { getUser } from '../../store/user/thunk';
import { useDispatch } from 'react-redux';
import store from '../../store/index';

const FormStyled = styled.form`
	width: 80%;
	margin: 20px auto;
	border: 2px solid red;
	text-align: center;
`;

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();
	const dispatch = useDispatch();
	// const token = useSelector((state) => state.authentication.token);

	const handleEmail = (event) => {
		setEmail(event.target.value);
	};

	const handlePassword = (event) => {
		setPassword(event.target.value);
	};

	const submitForm = async (event) => {
		event.preventDefault();
		const user = {
			name: '',
			email,
			password,
		};

		await dispatch(getUser(user));
		if (store.getState().authentication.token) {
			history.push('/courses');
		}
	};

	return (
		<FormStyled onSubmit={submitForm}>
			<h1>Login</h1>
			<div>
				<div>Email</div>
				<InputField
					name='email'
					type='emai'
					placeholder='enter email'
					onChange={handleEmail}
				/>
			</div>
			<div>
				<div>Password</div>
				<InputField
					name='password'
					type='password'
					placeholder='enter password'
					onChange={handlePassword}
				/>
			</div>
			<Button>Login</Button>
			<p>
				If you have not an accout you can{' '}
				<Link to='/registration'>Register</Link>
			</p>
		</FormStyled>
	);
};

export default Login;
