import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import React, { useState } from 'react';

const check = () => {
	if (localStorage.getItem('token') !== null) {
		return true;
	}
	return false;
};

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(check());

	return (
		<BrowserRouter>
			<Header name={''} changeLog={setIsLoggedIn} isLoggedIn={isLoggedIn} />
			<Switch>
				{isLoggedIn ? (
					<Switch>
						<Route exact path='/courses' component={Courses} />
						<Route exact path='/courses/add' component={CreateCourse} />
						<Route exact path='/courses/:id' component={CourseInfo} />
					</Switch>
				) : (
					<>
						<Route
							path='/login'
							render={() => <Login changeLog={setIsLoggedIn} />}
						/>
						<Route path='/registration' component={Registration} />
					</>
				)}
			</Switch>
		</BrowserRouter>
	);
}

export default App;
