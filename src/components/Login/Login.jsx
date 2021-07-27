import React, { useState } from 'react';
import InputField from '../Input/Input';
import { Button } from '../Button/Button';
import { Link, useHistory } from 'react-router-dom';
import { fetchLogin } from '../../utils/api';
import styled from 'styled-components';

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

		await fetchLogin(user, history);
		changeLog(true);
	};

	return (
		<FormStyled onSubmit={submitForm}>
			<h1>Login</h1>
			<div>
				<div>Email</div>
				<InputField
					type='emai'
					placeholder='enter email'
					onChange={handleEmail}
				/>
			</div>
			<div>
				<div>Password</div>
				<InputField
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
