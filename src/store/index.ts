import {createStore, combineReducers} from 'redux';
import {userReducer} from './reducers/comment';

const reducers = {
  comment: userReducer,
};

export type AppState = {
  [T in keyof typeof reducers]: ReturnType<typeof reducers[T]>;
};

export const store = createStore(combineReducers(reducers));
