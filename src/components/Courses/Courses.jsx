import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CourseCard from '../CourseCard/CourseCard';
import { Button } from '../Button/Button';
import InputField from '../Input/Input';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCoursesThunk } from '../../store/courses/thunk';
import { getAuthorsThunk } from '../../store/authors/thunk';
import { setRoleThunk } from '../../store/user/thunk';

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

const ButtonAdd = styled.button`
	background-color: white;
	color: black;
	border: 2px solid #4caf50;
	height: 50px;
	:hover {
		background-color: red;
		cursor: pointer;
	}
`;

const Courses = () => {
	const [search, setSearch] = useState('');
	const [curInput, setCurInput] = useState('');
	const courses = useSelector((state) => state.courses.courses);
	const authors = useSelector((state) => state.authors.authors);
	const admin = useSelector((state) => state.authentication.role);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCoursesThunk());
		dispatch(getAuthorsThunk());
		dispatch(setRoleThunk());
	}, [dispatch]);

	const goSearch = (event) => {
		event.preventDefault();
		setSearch(curInput);
	};

	const handleChange = (event) => {
		setCurInput(event.target.value);
	};

	return (
		<CoursesContainer>
			<>
				<CoursesTop>
					<StyledSearch>
						<form onSubmit={goSearch}>
							<InputField
								type='text'
								placeholder='Enter course name...'
								onChange={handleChange}
							/>
							<Button type='submit'>Search</Button>
						</form>
					</StyledSearch>
					{admin === 'admin' ? (
						<Link to={`/courses/add`}>
							<ButtonAdd>Add course</ButtonAdd>
						</Link>
					) : (
						''
					)}
				</CoursesTop>
				<div>
					{courses
						.filter(
							(item) =>
								item.title.toLowerCase().includes(search.toLowerCase()) ||
								item.id.toLowerCase().includes(search.toLowerCase())
						)
						.map((course) => {
							return (
								<CourseCard key={course.id} authorsList={authors} {...course} />
							);
						})}
				</div>
			</>
		</CoursesContainer>
	);
};

export default Courses;
