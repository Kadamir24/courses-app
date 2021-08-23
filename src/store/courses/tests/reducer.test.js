import courses from '../reducer';
import actionTypes from '../actionTypes';

test('should return the initial state', () => {
	expect(courses(undefined, {})).toEqual({
		courses: [],
		currentCourse: {},
	});
});

test('should handle a todo being added to an empty list', () => {
	const previousState = [];
	const data = [
		{
			title: 'TypeScript 2.15',
			description: 'loremIPSUM',
			duration: 670,
			authors: [
				'03ebd084-1dfc-41ca-a6c5-2ddd5ebe0fc1',
				'2ab65675-5d00-4671-baa8-05a2b280e391',
			],
			creationDate: '07/08/2021',
			id: 'f18ec27d-f1b0-4a98-8e17-df5252e03b46',
		},
		{
			title: 'Kojima Production',
			description: 'loremIPSUM',
			duration: 777,
			authors: ['09831976-d975-46bc-8bcc-2d7226379fd3'],
			creationDate: '07/08/2021',
			id: '45f1597d-0b67-4f2a-9114-643e1b35e1c8',
		},
		{
			title: 'GoLanguage 24',
			description: 'loremIPSUM',
			duration: 45,
			authors: ['f361eff4-534f-46f1-9d4f-75b09a6e800d'],
			creationDate: '07/08/2021',
			id: 'ccf6612a-57b1-46d4-8d1e-b011274ad763',
		},
	];
	expect(
		courses(previousState, { type: 'SET_COURSES', payload: data })
	).toEqual({
		courses: data,
	});
});

test('should handle a todo being added to an empty list', () => {
	const previousState = {
		courses: [],
	};

	const newData = {
		title: 'React-Redux',
		description: 'loremIPSUM',
		duration: 670,
		authors: [
			'03ebd084-1dfc-41ca-a6c5-2ddd5ebe0fc1',
			'2ab65675-5d00-4671-baa8-05a2b280e391',
		],
		creationDate: '07/08/2021',
		id: 'f18ec27d-f1b0-4a98-8e17-df5252e03123',
	};

	expect(
		courses(previousState, { type: 'SET_NEW_COURSE', payload: newData })
	).toEqual({
		courses: [newData],
	});
});
