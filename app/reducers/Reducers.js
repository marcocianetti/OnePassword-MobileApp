'use strict';

import { combineReducers } from 'redux';

// Reducers
import Root from './RootReducer';
import Auth from './AuthReducer';
import Profile from './ProfileReducer';

const reducers = combineReducers({
    Root,
    Auth,
    Profile
});

export default reducers;
