import AuthService from '../api/AuthService'

export const REGISTRATION_REQUEST = 'registration_request';
export const REGISTRATION_RESPONSE = 'registration_response';
export const LOGIN_REQUEST = 'login_request';
export const LOGIN_RESPONSE = 'login_response';

export function registration(email, pwd) {
    return function(dispatch) {

        // Richiesta
        dispatch({
            type: REGISTRATION_REQUEST
        });

        return AuthService
            .registration(email, pwd)
            .then(response => dispatch({
                type: REGISTRATION_RESPONSE,
                token: response.token,
                error: null
            }))
            .catch(error => dispatch({
                type: REGISTRATION_RESPONSE,
                token: null,
                error: error.error
            }));

    }
}

export function login(email, pwd) {
    return function(dispatch) {

        // Richiesta
        dispatch({
            type: LOGIN_REQUEST
        });

        return AuthService
            .login(email, pwd)
            .then(response => dispatch({
                type: LOGIN_RESPONSE,
                token: response.token,
                error: null
            }))
            .catch(error => dispatch({
                type: LOGIN_RESPONSE,
                token: null,
                error: error.error
            }));
    }
}
