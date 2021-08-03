import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button';
import { timeConverter } from '../../utils/functions';
import InputField from '../Input/Input';
import { useHistory } from 'react-router';
import { fetchDataGo, fetchWithToken } from '../../utils/api';
import { actionCreators } from '../../store/authors/actionCreators';
import { connect } from 'react-redux';
import { actionCreators as actionCreatorsAuthors } from '../../store/authors/actionCreators';
import { useSelector } from 'react-redux';

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
	authorsForm,
	setAuthors,
	addAuthorToForm,
	deleteAuthor,
	resetForm,
	enabledAuthors,
}) => {
	const [authorInput, setAuthorInput] = useState('');
	const [duration, setDuration] = useState('');
	const [title, setTitle] = useState('');
	const [descr, setDescr] = useState('');
	const history = useHistory();
	const token = useSelector((state) => state.authentication.token);

	const fetchAuthors = useCallback(() => {
		async function fetchData() {
			const data = await fetchDataGo('authors/all');
			setAuthors(data);
		}
		fetchData();
	}, [setAuthors]);

	useEffect(() => {
		fetchAuthors();
	}, [fetchAuthors]);

	const handleTitle = (event) => {
		setTitle(event.target.value);
	};

	const handleDescr = (event) => {
		setDescr(event.target.value);
	};

	const handleAuthorInput = (event) => {
		setAuthorInput(event.target.value);
	};

	let newCourse = {
		title,
		description: descr,
		duration,
		authors: authorsForm,
	};

	const addAuthor = async (event) => {
		event.preventDefault();
		if (!authorInput) return;
		const newAuthor = {
			name: authorInput,
		};
		await fetchWithToken('authors/add', newAuthor, token);
		await fetchAuthors();
		setAuthorInput('');
	};

	const addAuthorToList = (event, author) => {
		event.preventDefault();
		addAuthorToForm(author);
	};

	const removeAuthorToList = (author) => {
		deleteAuthor(author);
	};

	const handleDuration = (event) => {
		if (event.target.value < 0) {
			event.target.value = 0;
		}
		setDuration(event.target.value);
	};

	const submitCourse = async (event) => {
		event.preventDefault();

		if (
			newCourse.title === '' ||
			newCourse.description.length < 2 ||
			newCourse.duration === '' ||
			newCourse.authors.length < 1
		) {
			alert('Please, fill in all fields');
		} else {
			newCourse = {
				...newCourse,
				duration: Number(duration),
				authors: authorsForm.map((item) => item.id),
			};
			await fetchWithToken('courses/add', newCourse, token);
			resetForm();
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
					<Button onClick={(e) => submitCourse(e)}>create course</Button>
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
								value={authorInput}
								onChange={handleAuthorInput}
							/>
						</div>
						<Button onClick={addAuthor}>create author</Button>
					</StyledLeftColumn>
					<StyledRightColumn>
						<div>Authors</div>
						{enabledAuthors.map((author) => {
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
						{authorsForm.map((author) => {
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

const mapStateToProps = (state) => {
	return {
		authorsForm: state.authors.authorsForm,
		authors: state.authors.authors,
		courses: state.courses.courses,
		enabledAuthors: state.authors.enabledAuthors,
	};
};

const mapDispatchToProps = {
	setCourses: (data) => actionCreators.setCourses(data),
	setAuthors: (data) => actionCreatorsAuthors.setAuthors(data),
	addAuthorToForm: (author) => actionCreatorsAuthors.addAuthor(author),
	deleteAuthor: (id) => actionCreatorsAuthors.deleteAuthor(id),
	resetForm: () => actionCreatorsAuthors.resetForm(),
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCourse);
