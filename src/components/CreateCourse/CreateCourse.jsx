import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button';
import { timeConverter, createDate } from '../../utils/functions';
import { v4 as uuidv4 } from 'uuid';
import InputField from '../Input/Input';
import { useHistory } from 'react-router';

const CoursesContainer = styled.div`
	width: 80%;
	margin: 20px auto;
	border: 2px solid red;
`;

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

const CreateCourse = ({
	close,
	addNewCourse,
	courseList,
	authorsList,
	addNewAuthors,
}) => {
	const authorInput = useRef(null);
	const [duration, setDuration] = useState('');
	const [courseAuthor, setCourseAuthor] = useState([]);
	// const [authorList, setAuthorList] = useState(authorsList);
	const [authorList, setAuthorList] = useState([]);
	const [title, setTitle] = useState('');
	const [descr, setDescr] = useState('');
	const history = useHistory();

	useEffect(() => {
		const fetchData = async () => {
			const result = await fetch('http://localhost:3000/authors/all');
			const res = await result.json();
			setAuthorList(res.result);
		};
		fetchData();
	}, []);

	const handleTitle = (event) => {
		setTitle(event.target.value);
	};

	const handleDescr = (event) => {
		setDescr(event.target.value);
	};

	const newCourse = {
		// id: uuidv4(),
		title,
		description: descr,
		creationDate: createDate(),
		duration,
		authors: courseAuthor,
	};

	const addAuthor = (event) => {
		event.preventDefault();
		if (!authorInput.current.value) return;
		const newAuthor = {
			id: uuidv4(),
			name: authorInput.current.value,
		};
		// addNewAuthors((authorsList) => [...authorsList, newAuthor]);
		setAuthorList((authorList) => [...authorList, newAuthor]);
	};

	const addAuthorToList = (event, author) => {
		event.preventDefault();
		setCourseAuthor((courseAuthor) => [...courseAuthor, author]);
		setAuthorList((authorList) =>
			authorList.filter((item) => item.id !== author.id)
		);
	};

	const removeAuthorToList = (author) => {
		setAuthorList((authorList) => [...authorList, author]);
		setCourseAuthor((courseAuthor) =>
			courseAuthor.filter((item) => item.id !== author.id)
		);
	};

	const handleDuration = (event) => {
		if (event.target.value < 0) {
			event.target.value = 0;
		}
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
			// addNewCourse((courseList) => [
			// 	...courseList,
			// 	{ ...newCourse, authors: courseAuthor.map((item) => item.id) },
			// ]);
			// close(false);

			const options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newCourse),
			};

			fetch('http://localhost:3000/courses/add', options).then((data) => {
				return data.json();
			});
			history.push('/courses');
		}
	};

	return (
		<CoursesContainer>
			<form>
				<StyledTop>
					<div>
						<div>Title</div>
						<InputField
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
							<InputField
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
		</CoursesContainer>
	);
};

export default CreateCourse;
