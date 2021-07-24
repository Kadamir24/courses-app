import React, { useState } from 'react';
import InputField from '../Input/Input';
import { Button } from '../Button/Button';
import { Link, useHistory } from 'react-router-dom';
import { fetchDataRegister } from '../../utils/functions';

const Registration = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();

	const handleName = (event) => {
		setName(event.target.value);
	};

	const handleEmail = (event) => {
		setEmail(event.target.value);
	};

	const handlePassword = (event) => {
		setPassword(event.target.value);
	};

	const submitForm = (event) => {
		event.preventDefault();
		console.log(name, email, password);
		const newUser = {
			name,
			email,
			password,
		};

		fetchDataRegister(newUser, 'register');
		history.push(`/login`);
	};

	return (
		<form onSubmit={submitForm}>
			<h1>Registration</h1>
			<div>
				<div>Name</div>
				<InputField
					type='name'
					placeholder='enter name'
					onChange={handleName}
				/>
			</div>
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
				If you have an accout you can <Link to='/login'>Login</Link>
			</p>
		</form>
	);
};

export default Registration;
