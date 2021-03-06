import React from 'react';
import CourseForm from '../CourseForm';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

import { render, fireEvent } from '@testing-library/react';

const middlewares = [];
const mockStore = configureStore(middlewares);

it('renders with courses', () => {
	const initialState = {
		authentication: {
			token: 'Bearer 123123123',
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
			enabledAuthors: [
				{ name: 'author', id: '9b87e8b8-6ba5-40fc-a439-c4e30a373d36' },
				{ name: 'author2', id: '1c972c52-3198-4098-b6f7-799b45903199' },
				{ name: 'author3', id: '072fe3fc-e751-4745-9af5-aa9eed0ea9ed' },
				{ name: 'author4', id: '40b21bd5-cbae-4f33-b154-0252b1ae03a9' },
				{ name: 'author5', id: '5e0b0f18-32c9-4933-b142-50459b47f09e' },
				{ name: 'author6', id: '9987de6a-b475-484a-b885-622b8fb88bda' },
			],
			authorsForm: [],
		},
	};
	const store = mockStore(initialState);
	const { container } = render(
		<Provider store={store}>
			<MemoryRouter>
				<CourseForm />
			</MemoryRouter>
		</Provider>
	);
	expect(container.getElementsByClassName('author-name').length).toBe(6);
});

const setup = () => {
	const initialState = {
		authentication: {
			token: 'Bearer 123123123',
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
			enabledAuthors: [
				{ name: 'author', id: '9b87e8b8-6ba5-40fc-a439-c4e30a373d36' },
				{ name: 'author2', id: '1c972c52-3198-4098-b6f7-799b45903199' },
				{ name: 'author3', id: '072fe3fc-e751-4745-9af5-aa9eed0ea9ed' },
				{ name: 'author4', id: '40b21bd5-cbae-4f33-b154-0252b1ae03a9' },
				{ name: 'author5', id: '5e0b0f18-32c9-4933-b142-50459b47f09e' },
			],
			authorsForm: [
				{ name: 'author6', id: '9987de6a-b475-484a-b885-622b8fb88bda' },
			],
		},
	};
	const store = mockStore(initialState);
	const handleClick = jest.fn();
	const utils = render(
		<Provider store={store}>
			<MemoryRouter>
				<CourseForm onClick={handleClick} />
			</MemoryRouter>
		</Provider>
	);
	const input = utils.getByLabelText('cost-input');
	const authors = utils.container.getElementsByClassName('author-name');
	const buttonCreateAuthor = document.querySelector(
		'[data-testid=create-author]'
	);
	const buttonAddAuthor = document.querySelector('[data-testid=add-author]');
	const buttonDeleteAuthor = document.querySelector(
		'[data-testid=delete-author]'
	);
	return {
		buttonCreateAuthor,
		buttonAddAuthor,
		buttonDeleteAuthor,
		store,
		input,
		authors,
		handleClick,
		...utils,
	};
};

test('It should keep a $ in front of the input', async () => {
	const {
		input,
		authors,
		handleClick,
		store,
		buttonCreateAuthor,
		buttonAddAuthor,
		buttonDeleteAuthor,
	} = setup();
	expect(authors.length).toBe(5);
	fireEvent.change(input, { target: { value: 'New Author' } });
	expect(input.value).toBe('New Author');

	expect(buttonCreateAuthor).toHaveTextContent('create author');
	fireEvent.click(buttonCreateAuthor);
	expect(handleClick).toHaveBeenCalledTimes(1);
	store.dispatch({ type: 'ADD_AUTHOR', payload: 'New Author' });

	expect(buttonAddAuthor).toHaveTextContent('add Author');
	fireEvent.click(buttonAddAuthor);
	expect(handleClick).toHaveBeenCalledTimes(2);
	store.dispatch({
		type: 'ADD_AUTHOR',
		payload: { name: 'author', id: '9b87e8b8-6ba5-40fc-a439-c4e30a373d36' },
	});

	expect(buttonDeleteAuthor).toHaveTextContent('delete Author');
	fireEvent.click(buttonDeleteAuthor);
	expect(handleClick).toHaveBeenCalledTimes(3);
	store.dispatch({
		type: 'DELETE_AUTHOR',
		payload: { name: 'author', id: '9b87e8b8-6ba5-40fc-a439-c4e30a373d36' },
	});

	const expectedActions = [
		{ type: 'RESET_AUTHOR_FORM' },
		{ type: 'ADD_AUTHOR', payload: 'New Author' },
		{
			type: 'ADD_AUTHOR',
			payload: { name: 'author', id: '9b87e8b8-6ba5-40fc-a439-c4e30a373d36' },
		},
		{
			type: 'DELETE_AUTHOR',
			payload: { name: 'author', id: '9b87e8b8-6ba5-40fc-a439-c4e30a373d36' },
		},
	];
	expect(store.getActions()).toEqual(expectedActions);
});
