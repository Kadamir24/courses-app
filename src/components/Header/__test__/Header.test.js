import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../Header';
import { Provider } from 'react-redux';
import store from '../../../store/index';
// import { BrowserRouter } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Logo', () => {
	test('Logo must have src = "logo.svg" and alt = "logo"', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<Header></Header>
				</MemoryRouter>
			</Provider>
		);
		const logo = screen.getByRole('img');
		expect(logo).toHaveAttribute('src', 'logo.svg');
		expect(logo).toHaveAttribute('alt', 'logo');
	});
});

it('renders with Login button', () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<MemoryRouter>
				<Header name={'admin'}></Header>
			</MemoryRouter>
		</Provider>
	);
	expect(getByTestId('login')).toHaveTextContent('Login');
});

it('renders with Logout and name', () => {
	store.getState().authentication.token = 'Bearer 12312321312';
	const { getByTestId } = render(
		<Provider store={store}>
			<MemoryRouter>
				<Header name={'admin'}></Header>
			</MemoryRouter>
		</Provider>
	);
	expect(getByTestId('logout')).toHaveTextContent('Logout');
	expect(getByTestId('username')).toHaveTextContent('admin');
});
