import React from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button';
import { timeConverter } from '../../utils/functions';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../../store/courses/actionCreators';
import store from '../../store/index';
import { fetchDelete } from '../../utils/api';

const CardContainer = styled.div`
	width: 95%;
	margin: 20px auto;
	border: 2px solid red;
	display: flex;
	justify-content: space-around;
`;

const MainInfo = styled.div`
	width: 60%;
`;

const SubInfo = styled.div`
	width: 30%;
`;

const CourseCard = ({
	title,
	description,
	authors,
	duration,
	creationDate,
	authorsList,
	id,
}) => {
	const token = localStorage.getItem('token');
	const dispatch = useDispatch();
	const deleteCourse = () => {
		dispatch(actionCreators.deleteCourse(id));
		console.log('Check store2', store.getState());
		fetchDelete('courses', id, token);
	};
	return (
		<CardContainer>
			<MainInfo>
				<h2>{title}</h2>
				<div>{description}</div>
			</MainInfo>
			<SubInfo>
				<div>
					Authors:{' '}
					{authorsList.map((author) => {
						let res = authors.includes(author.id) ? author.name + ', ' : '';
						return res;
					})}
				</div>
				<div>Duration: {timeConverter(duration)} hours</div>
				<div>Created: {creationDate} hours</div>
				<Link to={`/courses/${id}`}>
					<Button>Show course</Button>
				</Link>
				<Button>Update</Button>
				<Button onClick={deleteCourse}>Delete course</Button>
			</SubInfo>
		</CardContainer>
	);
};

CourseCard.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	authors: PropTypes.array.isRequired,
	duration: PropTypes.number.isRequired,
	creationDate: PropTypes.string.isRequired,
	authorsList: PropTypes.array.isRequired,
	id: PropTypes.string.isRequired,
};

export default CourseCard;
