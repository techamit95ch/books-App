import { combineReducers } from 'redux';

import books from './books';
import user from './users';

export const reducers = combineReducers({ user,books });
