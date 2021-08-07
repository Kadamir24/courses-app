import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CourseForm from './components/CourseForm/CourseForm';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import React, { useState } from 'react';
import store from './store';
import { PrivateRoute } from './components/PrivateRouter/PrivateRouter';

const check = () => {
	// return localStorage.getItem('token') !== null;
	return store.getState().authentication.token !== null;
};

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(check());

	return (
		<BrowserRouter>
			<Header name={''} isLoggedIn={isLoggedIn} />
			<Switch>
				{isLoggedIn ? (
					<Switch>
						<Route exact path='/courses' component={Courses} />
						<PrivateRoute exact path='/courses/add' component={CourseForm} />
						<PrivateRoute
							exact
							path='/courses/update/:courseId'
							component={CourseForm}
						/>
						<Route exact path='/courses/:id' component={CourseInfo} />
					</Switch>
				) : (
					<Switch>
						<Route
							path='/login'
							render={() => <Login changeLog={setIsLoggedIn} />}
						/>
						<Route path='/registration' component={Registration} />
					</Switch>
				)}
			</Switch>
		</BrowserRouter>
	);
}

export default App;
