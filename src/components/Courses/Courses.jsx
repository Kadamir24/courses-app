import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CourseCard from '../CourseCard/CourseCard';
import { Button } from '../Button/Button';
import InputField from '../Input/Input';
import { Link } from 'react-router-dom';
import { fetchDataGo } from '../../utils/api';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/courses/actionCreators';
import { actionCreators as actionCreatorsAuthors } from '../../store/authors/actionCreators';

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

const Courses = ({ authors, courses, getCourses, getAuthors }) => {
	const [search, setSearch] = useState('');
	const [courseList, setCourseList] = useState([]);
	const [authorsList, setAuthorsList] = useState([]);
	const [curInput, setCurInput] = useState('');

	useEffect(() => {
		async function fetchData() {
			const data = await fetchDataGo('courses/all');
			getCourses(data);
			setCourseList(data);
			setCourseList(courses);
		}
		fetchData();
	}, []);

	useEffect(() => {
		setCourseList(courses);
	}, []);

	useEffect(() => {
		async function fetchData() {
			const data = await fetchDataGo('authors/all');
			getAuthors(data);
			setAuthorsList(authors);
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

const mapStateToProps = (state) => {
	return {
		authors: state.authors.authors,
		courses: state.courses.courses,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getCourses: (data) => dispatch(actionCreators.getCourses(data)),
		getAuthors: (data) => dispatch(actionCreatorsAuthors.getAuthors(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
