import {createStore, combineReducers, applyMiddleware} from 'redux';
import {userReducer} from './reducers/comment';
import thunk from 'redux-thunk';

const reducers = {
  comment: userReducer,
};

export type AppState = {
  [T in keyof typeof reducers]: ReturnType<typeof reducers[T]>;
};

export const store = createStore(
  combineReducers(reducers),
  applyMiddleware(thunk),
);
