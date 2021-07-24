import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';
import './App.css';
import { Switch, Route } from 'react-router-dom';

function App() {
	return (
		<>
			<Header name={''} />
			<Switch>
				<Route path='/login' component={Login} />
				<Route path='/registration' component={Registration} />
				<Route exact path='/courses' component={Courses} />
				<Route exact path='/courses/add' component={CreateCourse} />
				<Route path='/courses/:id' component={CourseInfo} />
			</Switch>
		</>
	);
}

export default App;
