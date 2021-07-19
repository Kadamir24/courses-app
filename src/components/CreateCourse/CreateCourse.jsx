import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button';
import { mockedAuthorsList, mockedCoursesList } from '../../utils/constants';
import { timeConverter, createDate } from '../../utils/functions';
import { v4 as uuidv4 } from 'uuid';

const StyledTop = styled.div`
	margin: 10px 10px;
	display: flex;
	justify-content: space-between;
`;

const DescriptionInput = styled.input`
	min-width: 90%;
	min-height: 100px;
	margin: 10px 10px;
`;

const StyledAuthors = styled.div`
	margin-top: 20px;
	display: flex;
	justify-content: space-between;
`;

const StyledAuthorsList = styled.div`
	display: flex;
	margin: 0 auto;
`;

const StyledLeftColumn = styled.div`
	width: 40%;
`;

const StyledRightColumn = styled.div`
	width: 40%;
`;

const InputAuthor = styled.input`
	width: 100%;
`;

const CreateCourse = ({ close }) => {
	const authorInput = useRef(null);
	const [switcher, setSwitcher] = useState(false);
	const [duration, setDuration] = useState('');
	const [courseAuthor, setCourseAuthor] = useState([]);
	const [authorList, setAuthorList] = useState(mockedAuthorsList);
	const [title, setTitle] = useState('');
	const [descr, setDescr] = useState('');

	const handleTitle = (event) => {
		setTitle(event.target.value);
	};

	const handleDescr = (event) => {
		setDescr(event.target.value);
	};

	const newCourse = {
		id: uuidv4(),
		title,
		description: descr,
		creationDate: createDate(),
		duration,
		authors: courseAuthor,
	};

	const addAuthor = (event) => {
		event.preventDefault();
		mockedAuthorsList.push({
			id: uuidv4(),
			name: authorInput.current.value,
		});
		setSwitcher((switcher) => !switcher);
	};

	const addAuthorToList = (event, author) => {
		event.preventDefault();
		setCourseAuthor((courseAuthor) => [...courseAuthor, author]);
		setAuthorList(authorList.filter((item) => item.id !== author.id));
	};

	const removeAuthorToList = (author) => {
		setAuthorList((authorList) => [...authorList, author]);
		setCourseAuthor(courseAuthor.filter((item) => item.id !== author.id));
	};

	const handleDuration = (event) => {
		setDuration(event.target.value);
	};

	const submitCourse = (event, close) => {
		event.preventDefault();

		if (
			newCourse.title === '' ||
			newCourse.description.length < 2 ||
			newCourse.duration === '' ||
			newCourse.authors.length < 1
		) {
			alert('Please, fill in all fields');
		} else {
			console.log(newCourse);
			mockedCoursesList.push(newCourse);
			close(false);
		}
	};

	return (
		<form>
			<StyledTop>
				<div>
					<div>Title</div>
					<input
						type='text'
						name='title'
						placeholder='Enter title'
						onChange={handleTitle}
					/>
				</div>
				<Button onClick={(e) => submitCourse(e, close)}>create course</Button>
			</StyledTop>
			<div>
				<div>Description</div>
				<DescriptionInput
					type='text'
					name='description'
					placeholder='Enter description'
					onChange={handleDescr}
				/>
			</div>
			<StyledAuthors>
				<StyledLeftColumn>
					<div>Add author</div>
					<div>
						<div>Author's name</div>
						<InputAuthor
							type='text'
							name='title'
							placeholder='Enter author name'
							ref={authorInput}
						/>
					</div>
					<Button onClick={addAuthor}>create author</Button>
				</StyledLeftColumn>
				<StyledRightColumn>
					<div>Authors</div>
					{authorList.map((author) => {
						return (
							<StyledAuthorsList key={author.id}>
								<div>{author.name}</div>
								<Button onClick={(e) => addAuthorToList(e, author)}>
									add Author
								</Button>
							</StyledAuthorsList>
						);
					})}
				</StyledRightColumn>
			</StyledAuthors>
			<StyledAuthors>
				<StyledLeftColumn>
					<div>
						<div>Duration</div>
						<input
							type='number'
							name='duration'
							placeholder='enter duration'
							onChange={handleDuration}
						/>
					</div>
					<h2>Duration: {timeConverter(duration)}</h2>
				</StyledLeftColumn>
				<StyledRightColumn>
					<div>Course authors</div>
					{courseAuthor.map((author) => {
						return (
							<StyledAuthorsList key={author.id}>
								<div>{author.name}</div>
								<Button onClick={() => removeAuthorToList(author)}>
									delete Author
								</Button>
							</StyledAuthorsList>
						);
					})}
				</StyledRightColumn>
			</StyledAuthors>
		</form>
	);
};

export default CreateCourse;
