import Http from '../utils/HttpClient'

export default class AuthService {

    // Login
    static login(email, pwd) {

        // Parametri login
        const params = {
            email: email,
            password: pwd
        };

        // Effettuo la richiesta HTTP
        return Http.post("auth/login", params)
            .then(token => {
                return token;
            });
    };

    // Effettua il logout
    static logout() {
        
        // Effettuo la richiesta HTTP
        return Http.fetch("auth/logout")
            .then(response => response);
    }

    // Registrazione
    static registration(email, pwd) {

        // Parametri registrazione
        const params = {
            email: email,
            password: pwd
        };

        // Effettuo la richiesta HTTP
        return Http.post("auth/register", params)
            .then(token => {
                return token;
            });
    };

}
