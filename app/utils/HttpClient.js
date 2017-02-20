import ApiConfig from '../utils/ApiConfig';
import UserStorage from '../storages/UserStorage';
import App from '../containers/App';

export default class HttpClient {

    /**
     * Richiesta HTTP con controllo del token
     */
    static fetch(path, config) {

        return _getDefaultConfig(config)
            .then((config) => {
                return fetch(ApiConfig.getUrl() + '/' + path, config)
                    .then(function(response) {
                        return _checkStatus(response);
                    });
            })
    }

    static post(path, body) {

        const params = {
            method: 'POST',
            body: JSON.stringify(body)
        };

        return HttpClient.fetch(path, params)
    }

    static download(path, config, fileName) {

        config = _getDefaultConfig(config);

        return fetch(Config.getUrl() + '/' + path, config)
            .then((response) => {
                return response.text()
            }).then((fileString) => {
                let tempLink = document.createElement('a');
                let blob = new Blob([fileString], { type : 'text/csv' });
                tempLink.href = window.URL.createObjectURL(blob);
                tempLink.setAttribute('download', fileName);
                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);
            });
    }

    static upload(path, body) {

        const obj = {
            method: 'POST',
            body: JSON.stringify(body)
        };

        return HttpClient.fetch(path, obj)
    }

}

/**
 * Controllo stato risposta
 */
function _checkStatus(response) {

    // Risposta OK
    if(response.status >= 200 && response.status < 300) {
        return response.json();

        // 401: Sessione scaduta
    } else if(response.status == 401) {

        // Mostra dialog di errore
        alert("Sessione scaduta, devi rieffettuare il login");

        // Cancella la sessione
        SessionStorage.clearSession();

        // Cancella i dati dell'utente
        UserStorage.clear((err) => {
            if(err) {
                console.log(err)
            }
        });

        return response.json().then((json) => {
            return Promise.reject(json)
        });

        // > 300
    } else {
        return response.json().then((json) => {
            return Promise.reject(json)
        });
    }
}

function _getDefaultConfig(config) {

    return UserStorage.getToken()
        .then(token => {

            config = Object.assign({}, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            }, config);

            // Aggiunge il token se presente
            if(token) {
                config.headers.Authorization = token;
            }

            return config
    });

}
