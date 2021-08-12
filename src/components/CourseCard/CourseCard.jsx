import React from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button';
import { timeConverter } from '../../utils/functions';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { deleteCourseThunk } from '../../store/courses/thunk';

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
	const token = useSelector((state) => state.authentication.token);
	const admin = useSelector((state) => state.authentication.role);
	const dispatch = useDispatch();
	const deleteCourse = async () => {
		await dispatch(deleteCourseThunk(id, token));
	};

	return (
		<CardContainer>
			<MainInfo>
				<h2 data-testid='title'>{title}</h2>
				<div data-testid='description'>{description}</div>
			</MainInfo>
			<SubInfo>
				<div data-testid='authors'>
					Authors:{' '}
					{authorsList.map((author) => {
						let res = authors.includes(author.id) ? author.name + ', ' : '';
						return res;
					})}
				</div>
				<div data-testid='duration'>
					Duration: {timeConverter(duration)} hours
				</div>
				<div data-testid='date-creation'>Created: {creationDate} hours</div>
				<Link to={`/courses/${id}`}>
					<Button>Show course</Button>
				</Link>
				{admin === 'admin' ? (
					<>
						<Link to={`/courses/update/${id}`}>
							<Button>Update</Button>
						</Link>
						<Button onClick={deleteCourse}>Delete course</Button>
					</>
				) : (
					''
				)}
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
