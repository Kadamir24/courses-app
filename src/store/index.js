import { createStore, combineReducers } from 'redux';
import authentication from './user/reducer';
import courses from './courses/reducer';
import authors from './authors/reducer';
import { saveState, loadState } from './localStorage';
import throttle from 'lodash/throttle';

const persistedState = loadState();
const rootReducer = combineReducers({
	authentication,
	courses,
	authors,
});

const store = createStore(rootReducer, persistedState);

store.subscribe(
	throttle(() => {
		saveState(store.getState());
	}, 1000)
);

export default store;
