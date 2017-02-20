import Http from '../utils/HttpClient';

export default class PinService {

    static getLoginPin(websiteId) {

        // Effettuo la richiesta HTTP
        return Http.fetch("pin/login/" + websiteId)
            .then(json => {
                return json.login_pin;
            });
    };

    static getRegistrationPin() {

        // Effettuo la richiesta HTTP
        return Http.fetch("pin/registration")
            .then(json => {
                return json.registration_pin;
            });
    };

}
