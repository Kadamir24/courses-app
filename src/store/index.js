import { createStore, combineReducers, applyMiddleware } from 'redux';
import authentication from './user/reducer';
import courses from './courses/reducer';
import authors from './authors/reducer';
import { saveState, loadState } from './localStorage';
import throttle from 'lodash/throttle';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [thunk];
const persistedState = loadState();
const rootReducer = combineReducers({
	authentication,
	courses,
	authors,
});

const store = createStore(
	rootReducer,
	persistedState,
	composeWithDevTools(applyMiddleware(...middleware))
);

store.subscribe(
	throttle(() => {
		saveState(store.getState());
	}, 1000)
);

export default store;
