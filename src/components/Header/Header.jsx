import React from 'react';
import styled from 'styled-components';
import logo from '../../logo.svg';
import { Button } from '../Button/Button';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOutThunk } from '../../store/user/thunk';
import { useSelector } from 'react-redux';

const StyledHeader = styled.div`
	width: 80%;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	border: 2px solid red;
`;

const StyledName = styled.div`
	display: flex;
	justify-content: space-around;
	width: 10%;
	margin-top: 10px;
`;

const Logo = styled.div`
	width: 10%;
	height: 10%;
`;

const Header = ({ name, isLoggedIn }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const token = useSelector((state) => state.authentication.token);

	const logOut = async () => {
		localStorage.removeItem('token');
		await dispatch(logOutThunk(token));
		history.push(`/login`);
		window.location.reload();
		localStorage.removeItem('state');
	};

	const logIn = () => {
		history.push(`/login`);
	};
	return (
		<StyledHeader>
			<Logo>
				<img src={logo} alt='logo' />
			</Logo>
			<StyledName>
				{isLoggedIn ? (
					<>
						<div>{name}</div>
						<Button onClick={logOut}>Logout</Button>
					</>
				) : (
					<Button onClick={logIn}>Login</Button>
				)}
			</StyledName>
		</StyledHeader>
	);
};

export default Header;
