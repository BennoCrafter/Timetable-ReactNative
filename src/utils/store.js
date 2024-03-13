import {createStore} from 'redux';
import timetableReducer from './reducers';

const store = createStore(timetableReducer);

export default store;
