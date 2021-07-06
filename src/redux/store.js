import { configureStore, combineReducers } from '@reduxjs/toolkit'
import counterReducer from './counter';
import postsReducer from './postsReducer';

export const store = configureStore({
    reducer: combineReducers({
        counterReducer,
        postsReducer
    })
})