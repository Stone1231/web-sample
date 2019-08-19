import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root-reducer';

// import logger from 'redux-logger'
import {createLogger}  from 'redux-logger'

export default function configureStore(initialState?: any) {

    // const middlewares = [thunk];
    const middlewares = [];
    middlewares.push(thunk);

    if (process.env.NODE_ENV === 'development') {
        const logger = createLogger({
            duration: true
        });
        middlewares.push(logger);
    }    

    console.log(process.env.NODE_ENV);

    const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares));
    return store;
};