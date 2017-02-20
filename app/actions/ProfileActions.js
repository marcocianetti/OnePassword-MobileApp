import PinService from '../api/PinService'
import WebSitesService from '../api/WebSitesService'
import AuthService from '../api/AuthService'

export const WEB_SITES_LIST_REQUEST = 'web_sites_list_request';
export const WEB_SITES_LIST_RESPONSE = 'web_sites_list_response';
export const REGISTRATION_PIN_REQUEST = 'registration_pin_request';
export const REGISTRATION_PIN_RESPONSE = 'registration_pin_response';
export const LOGIN_PIN_REQUEST = 'login_pin_request';
export const LOGIN_PIN_RESPONSE = 'login_pin_response';
export const LOGOUT_REQUEST = 'logout_request';
export const LOGOUT_RESPONSE = 'logout_response';
export const DELETE_WEBSITE_REQUEST = 'delete_website_request';
export const DELETE_WEBSITE_RESPONSE = 'delete_website_response';

export function getLoginPin(website) {
    return function(dispatch) {

        // Richiesta
        dispatch({
            type: LOGIN_PIN_REQUEST
        });

        return PinService
            .getLoginPin(website._id)
                .then(response => dispatch({
                    type: LOGIN_PIN_RESPONSE,
                    loginPin: response,
                    websiteId: website._id
                }))
                .catch(error => dispatch({
                    type: LOGIN_PIN_RESPONSE
                }));
    }
}

export function getRegistrationPin() {
    return function(dispatch) {

        // Richiesta
        dispatch({
            type: REGISTRATION_PIN_REQUEST
        });

        return PinService
            .getRegistrationPin()
                .then(response => dispatch({
                    type: REGISTRATION_PIN_RESPONSE,
                    registrationPin: response
                }))
                .catch(error => dispatch({
                    type: REGISTRATION_PIN_RESPONSE
                }));
    }
}

export function getWebSitesList() {
    return function(dispatch) {

        // Richiesta
        dispatch({
            type: WEB_SITES_LIST_REQUEST
        });

        return WebSitesService
            .getWebSitesList()
            .then(response => dispatch({
                type: WEB_SITES_LIST_RESPONSE,
                websites: response
            }))
            .catch(error => dispatch({
                type: WEB_SITES_LIST_RESPONSE
            }));
    }
}

export function deleteWebsite(websiteId) {
    return function(dispatch) {

        // Richiesta
        dispatch({
            type: DELETE_WEBSITE_REQUEST
        });

        return WebSitesService
            .deleteWebsite(websiteId)
            .then(response => dispatch({
                type: DELETE_WEBSITE_RESPONSE,
                websiteId: websiteId
            }))
            .catch(error => dispatch({
                type: DELETE_WEBSITE_RESPONSE
            }));
    }
}

export function logout() {
    return function(dispatch) {

        // Richiesta
        dispatch({
            type: LOGOUT_REQUEST
        });

        return AuthService.logout()
            .then(response => dispatch({
                type: LOGOUT_RESPONSE,
                loggedOut: true
            }))
            .catch(error => dispatch({
                type: LOGOUT_RESPONSE,
                loggedOut: false
            }));
    }
}
