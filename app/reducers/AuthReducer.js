'use strict';

import {
    REGISTRATION_REQUEST, REGISTRATION_RESPONSE,
    LOGIN_REQUEST, LOGIN_RESPONSE
} from '../actions/AuthActions';

import UserStorage from '../storages/UserStorage';

const initialState = {
    loading: false,
    error: false
};

export default function auth(state = initialState, action = {}) {

    switch (action.type) {

        // Registrazione
        case REGISTRATION_REQUEST:
            return Object.assign({}, state, {
                token: null,
                error: null,
                loading: true
            });

        case REGISTRATION_RESPONSE:

            if(action.token != null) {
                UserStorage.putToken(action.token);
            }

            return Object.assign({}, state, {
                token: action.token,
                error: action.error,
                loading: false
            });

        // Login
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                token: null,
                error: null,
                loading: true
            });

        case LOGIN_RESPONSE:

            if(action.token != null) {
                UserStorage.putToken(action.token);
            }

            return Object.assign({}, state, {
                token: action.token,
                error: action.error,
                loading: false
            });

        default:
            return state;
  }

}
