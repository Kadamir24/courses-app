import React from 'react';
import ReactDOM from 'react-dom';
import CourseCard from '../CourseCard';
import { Provider } from 'react-redux';
import store from '../../../store/index';
import { BrowserRouter } from 'react-router-dom';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(
		<Provider store={store}>
			<BrowserRouter>
				<CourseCard
					title={'JavaScript'}
					description={'Lorem'}
					authors={['123123', '123123']}
					duration={500}
					creationDate={'01/01/01'}
					authorsList={['123', '123']}
					id={'123124'}
				></CourseCard>
			</BrowserRouter>
		</Provider>,
		div
	);
});

it('renders without crashing', () => {
	const { getByTestId } = render(
		<Provider store={store}>
			<BrowserRouter>
				<CourseCard
					title={'JavaScript'}
					description={'Lorem'}
					authors={[
						'9b87e8b8-6ba5-40fc-a439-c4e30a373d36',
						'1c972c52-3198-4098-b6f7-799b45903199',
					]}
					duration={500}
					creationDate={'01/01/01'}
					authorsList={[
						{ name: 'author', id: '9b87e8b8-6ba5-40fc-a439-c4e30a373d36' },
						{ name: 'author2', id: '1c972c52-3198-4098-b6f7-799b45903199' },
					]}
					id={'123124'}
				></CourseCard>
			</BrowserRouter>
		</Provider>
	);
	expect(getByTestId('title')).toHaveTextContent('JavaScript');
	expect(getByTestId('description')).toHaveTextContent('Lorem');
	expect(getByTestId('duration')).toHaveTextContent('Duration: 08:20 hours');
	expect(getByTestId('authors')).toHaveTextContent('Authors: author, author2,');
	expect(getByTestId('date-creation')).toHaveTextContent(
		'Created: 01/01/01 hours'
	);
});
