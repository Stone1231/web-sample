import { combineReducers } from 'redux';
import ContactReducer from './contact-reducer';
import TaskReducer from './task-reducer';

export default combineReducers({
    contactState: ContactReducer,
    taskState: TaskReducer
})