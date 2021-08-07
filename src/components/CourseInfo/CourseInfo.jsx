import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button';
import { timeConverter } from '../../utils/functions';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCourseById } from '../../store/courses/thunk';

const CardContainer = styled.div`
	width: 80%;
	margin: 20px auto;
	border: 2px solid red;
`;

const MainInfo = styled.div`
	width: 60%;
`;

const SubInfo = styled.div`
	width: 30%;
`;

const CourseInfo = () => {
	const { id } = useParams();
	const authors = useSelector((state) => state.authors.authors);
	const course = useSelector((state) => state.courses.currentCourse);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCourseById(id));
	}, [id, dispatch]);

	return (
		<CardContainer>
			{course &&
			Object.keys(course).length === 0 &&
			course.constructor === Object ? (
				'LOADING'
			) : (
				<>
					<MainInfo>
						<h2>{course.title}</h2>
					</MainInfo>
					<SubInfo>
						<div>{course.description}</div>
						<div>
							Authors:{' '}
							{authors.map((author) => {
								let res = course.authors.includes(author.id)
									? author.name + ', '
									: '';
								return res;
							})}
						</div>
						<div>ID: {course.id}</div>
						<div>Duration: {timeConverter(course.duration)} hours</div>
						<div>Created: {course.creationDate} </div>
						<Link to={`/courses`}>
							<Button>Back to course</Button>
						</Link>
					</SubInfo>
				</>
			)}
		</CardContainer>
	);
};

export default CourseInfo;
