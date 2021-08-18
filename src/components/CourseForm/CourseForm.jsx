import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button';
import { timeConverter } from '../../utils/functions';
import InputField from '../Input/Input';
import { useHistory } from 'react-router';
import { actionCreators } from '../../store/authors/actionCreators';
import { connect } from 'react-redux';
import { actionCreators as actionCreatorsAuthors } from '../../store/authors/actionCreators';
import { useSelector, useDispatch } from 'react-redux';
import { addAuthorThunk } from '../../store/authors/thunk';
import { useParams } from 'react-router-dom';
import {
	addCourseThunk,
	updateCourseThunk,
	getCourseById,
} from '../../store/courses/thunk';

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

const CourseForm = ({
	authorsForm,
	setAuthors,
	addAuthorToForm,
	deleteAuthor,
	resetForm,
	enabledAuthors,
	resetAuthorForm,
	onClick,
}) => {
	const [authorInput, setAuthorInput] = useState('');
	const [duration, setDuration] = useState('');
	const [title, setTitle] = useState('');
	const [descr, setDescr] = useState('');
	const history = useHistory();
	const token = useSelector((state) => state.authentication.token);
	const dispatch = useDispatch();
	const { courseId } = useParams();
	const currentCourse = useSelector((state) => state.courses.currentCourse);

	useEffect(() => {
		resetAuthorForm();
	}, [resetAuthorForm]);

	useEffect(() => {
		async function checkId() {
			if (courseId !== undefined) {
				dispatch(getCourseById(courseId));
			}
		}
		checkId();
	}, [courseId, dispatch]);

	useEffect(() => {
		if (courseId !== undefined) {
			setTitle(currentCourse.title);
			setDescr(currentCourse.description);
			setDuration(currentCourse.duration);
		}
	}, [courseId, currentCourse]);

	useEffect(() => {
		if (courseId !== undefined && typeof currentCourse !== 'string') {
			enabledAuthors.map((author) => {
				return currentCourse.authors.includes(author.id)
					? addAuthorToForm(author)
					: '';
			});
		}
	}, [courseId, addAuthorToForm, currentCourse]);

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
		await dispatch(addAuthorThunk(newAuthor, token));
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
		setDuration('');
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
			await dispatch(addCourseThunk(newCourse, token));
			resetForm();
			history.push('/courses');
		}
	};

	const updateCourse = async (event) => {
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
			await dispatch(updateCourseThunk(courseId, newCourse, token));
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
							value={title}
							onChange={handleTitle}
						/>
					</div>
					{courseId ? (
						<Button onClick={(e) => updateCourse(e)}>update course</Button>
					) : (
						<Button onClick={(e) => submitCourse(e)}>create course</Button>
					)}
				</StyledTop>
				<div>
					<div>Description</div>
					<DescriptionInput
						type='text'
						name='description'
						placeholder='Enter description'
						value={descr}
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
								aria-label='cost-input'
							/>
						</div>
						<Button onClick={(addAuthor, onClick)} data-testid='create-author'>
							create author
						</Button>
					</StyledLeftColumn>
					<StyledRightColumn>
						<div>Authors</div>
						{enabledAuthors.map((author) => {
							return (
								<StyledAuthorsList key={author.id}>
									<div className='author-name'>{author.name}</div>
									<Button
										onClick={((e) => addAuthorToList(e, author), onClick)}
										data-testid='add-author'
									>
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
								value={duration}
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
									<Button
										onClick={(() => removeAuthorToList(author), onClick)}
										data-testid='delete-author'
									>
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
	resetAuthorForm: () => actionCreatorsAuthors.resetAuthorForm(),
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseForm);
