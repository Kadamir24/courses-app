import React, { useState } from 'react';
import InputField from '../Input/Input';
import { Button } from '../Button/Button';
import { Link, useHistory } from 'react-router-dom';
import { fetchLogin } from '../../utils/api';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../../store/user/actionCreators';

const FormStyled = styled.form`
	width: 80%;
	margin: 20px auto;
	border: 2px solid red;
	text-align: center;
`;

const Login = ({ changeLog }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();
	const dispatch = useDispatch();

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

		const res = await fetchLogin(user, history);
		if (res) {
			dispatch(actionCreators.login(res));
		}
		await localStorage.setItem('token', res.result);
		if (localStorage.getItem('token') !== 'undefined') {
			history.push('/courses');
		}
		changeLog(true);
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
