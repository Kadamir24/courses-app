import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CourseForm from './components/CourseForm/CourseForm';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { PrivateRoute } from './components/PrivateRouter/PrivateRouter';
import { useSelector } from 'react-redux';

function App() {
	const token = useSelector((state) => state.authentication.token);

	return (
		<BrowserRouter>
			<Header name={''} />
			<Switch>
				{token ? (
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
						<Route path='/login' render={() => <Login />} />
						<Route path='/registration' component={Registration} />
					</Switch>
				)}
			</Switch>
		</BrowserRouter>
	);
}

export default App;
