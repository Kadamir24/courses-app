import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import CourseCard from '../CourseCard/CourseCard';
import CreateCourse from '../CreateCourse/CreateCourse';
import { Button } from '../Button/Button';
import { mockedCoursesList } from '../../utils/constants';

const CoursesContainer = styled.div`
	width: 80%;
	margin: 20px auto;
	border: 2px solid red;
`;

const CoursesTop = styled.div`
	width: 80%;
	margin: 20px auto;
	display: flex;
	justify-content: space-between;
`;

const StyledSearch = styled.div`
	width: 30%;
	height: 30%;
`;

const Courses = () => {
	const [search, setSearch] = useState('');
	const [courseCreating, setCourseCreating] = useState(false);
	const textInput = useRef(null);

	const goSearch = (event) => {
		event.preventDefault();
		setSearch(textInput.current.value);
	};

	return (
		<CoursesContainer>
			{!courseCreating ? (
				<>
					<CoursesTop>
						<StyledSearch>
							<form onSubmit={goSearch}>
								<input
									type='text'
									placeholder='Enter course name...'
									ref={textInput}
								/>
								<Button type='submit'>Search</Button>
							</form>
						</StyledSearch>
						<Button onClick={() => setCourseCreating(true)}>
							Add new course
						</Button>
					</CoursesTop>
					<div>
						{mockedCoursesList
							.filter(
								(item) =>
									item.title.toLowerCase().includes(search.toLowerCase()) ||
									item.id.toLowerCase().includes(search.toLowerCase())
							)
							.map((course) => {
								return <CourseCard key={course.id} {...course} />;
							})}
					</div>
				</>
			) : (
				<>
					<CreateCourse close={setCourseCreating} />
				</>
			)}
		</CoursesContainer>
	);
};

export default Courses;
