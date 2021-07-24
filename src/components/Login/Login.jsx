import React, { useState } from 'react';
import InputField from '../Input/Input';
import { Button } from '../Button/Button';
import { Link, useHistory } from 'react-router-dom';
import { fetchLogin } from '../../utils/functions';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();

	const handleEmail = (event) => {
		setEmail(event.target.value);
	};

	const handlePassword = (event) => {
		setPassword(event.target.value);
	};

	const submitForm = (event) => {
		event.preventDefault();
		const user = {
			name: '',
			email,
			password,
		};

		fetchLogin(user, history);
	};

	return (
		<form onSubmit={submitForm}>
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
		</form>
	);
};

export default Login;
