import React from 'react';
import ReactDOM from 'react-dom';
import CourseCard from '../CourseCard';
import { Provider } from 'react-redux';
import store from '../../../store/index';
import { BrowserRouter } from 'react-router-dom';

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
