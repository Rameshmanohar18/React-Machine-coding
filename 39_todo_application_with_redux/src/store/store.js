import { createStore } from 'redux';
import todoReducer from '../reducers/reducers';

const store = createStore(todoReducer);

export default store;
