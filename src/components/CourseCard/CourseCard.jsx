import React from 'react';
import { mockedAuthorsList } from '../../utils/constants';
import styled from 'styled-components';
import { Button } from '../Button/Button';

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

const timeConverter = (num) => {
	const hours = Math.floor(num / 60);
	const minutes = num % 60;
	return hours + ':' + minutes;
};

const CourseCard = ({
	title,
	description,
	authors,
	duration,
	creationDate,
}) => {
	return (
		<CardContainer>
			<MainInfo>
				<h2>{title}</h2>
				<div>{description}</div>
			</MainInfo>
			<SubInfo>
				<div>
					Authors:{' '}
					{mockedAuthorsList.map((author) => {
						let res = authors.map((id) =>
							id === author.id ? author.name : ''
						);
						return res;
					})}
				</div>
				<div>Duration: {timeConverter(duration)} hours</div>
				<div>Created: {creationDate}</div>
				<Button>Show course</Button>
			</SubInfo>
		</CardContainer>
	);
};

export default CourseCard;
