import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CourseCard from '../CourseCard/CourseCard';
import { Button } from '../Button/Button';
import InputField from '../Input/Input';
import { Link } from 'react-router-dom';
import { fetchDataGo } from '../../utils/api';

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
	const [courseList, setCourseList] = useState([]);
	const [authorsList, setAuthorsList] = useState([]);
	const [curInput, setCurInput] = useState('');

	useEffect(() => {
		async function fetchData() {
			const data = await fetchDataGo('courses/all');
			setCourseList(data);
		}
		fetchData();
	}, []);

	useEffect(() => {
		async function fetchData() {
			const data = await fetchDataGo('authors/all');
			setAuthorsList(data);
		}
		fetchData();
	}, []);

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
					<Link to={`/courses/add`}>
						<ButtonAdd>Add course</ButtonAdd>
					</Link>
				</CoursesTop>
				<div>
					{courseList
						.filter(
							(item) =>
								item.title.toLowerCase().includes(search.toLowerCase()) ||
								item.id.toLowerCase().includes(search.toLowerCase())
						)
						.map((course) => {
							return (
								<CourseCard
									key={course.id}
									authorsList={authorsList}
									{...course}
								/>
							);
						})}
				</div>
			</>
		</CoursesContainer>
	);
};

export default Courses;
