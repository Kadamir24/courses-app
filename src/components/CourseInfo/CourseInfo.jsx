import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button';
import { timeConverter } from '../../utils/functions';
import { useParams, Link } from 'react-router-dom';
import { fetchDataGo, fetchDataWithId } from '../../utils/api';

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
	const [course, setCourse] = useState();
	const [authorsList, setAuthorsList] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		async function fetchAndSet(id) {
			const newCourse = await fetchDataWithId(id);
			setCourse(newCourse);
			if (newCourse !== undefined) {
				setLoading(false);
			}
		}
		fetchAndSet(id);
	}, [id]);

	useEffect(() => {
		async function fetchData() {
			const data = await fetchDataGo('authors/all');
			setAuthorsList(data);
		}
		fetchData();
	}, []);

	return (
		<CardContainer>
			{loading ? (
				<div>Loading...</div>
			) : (
				<>
					<MainInfo>
						<h2>{course.title}</h2>
					</MainInfo>
					<SubInfo>
						<div>{course.description}</div>
						<div>
							Authors:{' '}
							{authorsList.map((author) => {
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
