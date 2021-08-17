import React from 'react';
import ReactDOM from 'react-dom';
import Courses from '../Courses';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

it('renders without courses', () => {
	const initialState = {
		authentication: {
			role: 'admin',
		},
		courses: {
			courses: [],
		},
		authors: {
			authors: [],
			enabledAuthors: [],
			authorsForm: [],
		},
	};
	const store = mockStore(initialState);
	const { container } = render(
		<Provider store={store}>
			<MemoryRouter>
				<Courses />
			</MemoryRouter>
		</Provider>
	);
	expect(container.getElementsByClassName('course-card').length).toBe(0);
});

it('renders with courses', () => {
	const handleClick = jest.fn();
	const initialState = {
		authentication: {
			role: 'admin',
		},
		courses: {
			courses: [
				{
					title: 'Final Test 2425',
					description: 'loremIPSUMasdsadsad',
					duration: 125,
					authors: [
						'a05f68be-2361-4ed9-9fc6-f6ba98938672',
						'6a5aeba9-2072-4f79-96f2-09b04919e8a5',
					],
					creationDate: '10/08/2021',
					id: '2ceaf3e7-7f66-4c58-b4bc-aabf93d2e841',
				},
				{
					title: 'Coder',
					description: 'loremIPSUM',
					duration: 150,
					authors: [
						'dc95c3c6-23e8-46ab-84e1-5e8bd04f46af',
						'334b3db3-7077-43da-8869-f817e8287b37',
					],
					creationDate: '10/08/2021',
					id: 'ecfd6b0c-2f51-4282-987d-762134829050',
				},
				{
					title: 'Witcher',
					description: 'loremIPSUM',
					duration: 420,
					authors: [
						'dbfa628f-e8c1-4075-8dbf-6b33bdd1eca3',
						'90f4b713-b7ff-4af8-9de3-fa52c1e9dd7c',
						'007f783b-fd6e-4ab0-837a-18d36a347bf7',
					],
					creationDate: '10/08/2021',
					id: 'a8d5bc52-4c33-4809-b7c5-7547e69b89bf',
				},
			],
		},
		authors: {
			authors: [],
			enabledAuthors: [],
			authorsForm: [],
		},
	};
	const store = mockStore(initialState);
	const { container, queryByTestId } = render(
		<Provider store={store}>
			<MemoryRouter>
				<Courses />
			</MemoryRouter>
		</Provider>
	);
	expect(container.getElementsByClassName('course-card').length).toBe(3);
	expect(queryByTestId('add-course')).toHaveTextContent('Add course');

	fireEvent.click(queryByTestId('add-course'));

	expect(handleClick).toHaveBeenCalledTimes(0);
});
