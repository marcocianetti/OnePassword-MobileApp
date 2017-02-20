'use strict';

import {
    WEB_SITES_LIST_REQUEST, WEB_SITES_LIST_RESPONSE,
    REGISTRATION_PIN_REQUEST, REGISTRATION_PIN_RESPONSE,
    LOGIN_PIN_REQUEST, LOGIN_PIN_RESPONSE,
    LOGOUT_REQUEST, LOGOUT_RESPONSE,
    DELETE_WEBSITE_REQUEST, DELETE_WEBSITE_RESPONSE
} from '../actions/ProfileActions';

import UserStorage from '../storages/UserStorage';

const initialState = {
    websites: [],
    loading: false,
    logoutState: {
        loading: false,
        loggedOut: false
    }
};

export default function profile(state = initialState, action = {}) {

    switch (action.type) {

        case LOGIN_PIN_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });

        case LOGIN_PIN_RESPONSE:

            let newWebsites = state.websites.map((website) => {
                if(website._id == action.websiteId) {
                    website.loginPin = {
                        pin: action.loginPin,
                        createdAt: new Date().getTime(),
                        duration: 60
                    }
                }

                return website;
            });

            return Object.assign({}, state, {
                websites: newWebsites,
                loading: false
            });

        case LOGOUT_REQUEST:
            return Object.assign({}, state, {
                logoutState: {
                    loading: true,
                    loggedOut: false
                }
            });

        case LOGOUT_RESPONSE:

            // Cancella i dati dell'utente
            UserStorage.clear((err) => {
                if(err) {
                    console.log(err);
                }
            });

            return Object.assign({}, state, {
                logoutState: {
                    loading: false,
                    loggedOut: action.loggedOut
                }
            });

        case REGISTRATION_PIN_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });

        case REGISTRATION_PIN_RESPONSE:
            return Object.assign({}, state, {
                registrationPin: action.registrationPin,
                loading: false
            });

        case WEB_SITES_LIST_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });

        case WEB_SITES_LIST_RESPONSE:
            return Object.assign({}, state, {
                websites: action.websites,
                loading: false
            });

        case DELETE_WEBSITE_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });

        case DELETE_WEBSITE_RESPONSE:
            let deletedWebsiteId = action.websiteId;
            if(deletedWebsiteId) {
                let websites = state.websites.filter(
                    ws => ws._id !== deletedWebsiteId
                )

                return Object.assign({}, state, {
                    websites: websites,
                    loading: false
                });
            } else {
                return state;
            }

        default:
            return state;
  }
}
