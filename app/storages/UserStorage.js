import { AsyncStorage } from 'react-native';

const KEY = {
    ME: 'me',
    TOKEN: 'token'
};

export default class UserStorage {

    // Salva il token
    static putToken(token) {
        AsyncStorage.setItem(KEY.TOKEN, token)
            .catch((error) => {
                throw error;
            })
    }

    // Restituisce il token
    static getToken() {
        return AsyncStorage.getItem(KEY.TOKEN)
            .then((token) => {
                return token;
            })
            .catch((error) => {
                throw error;
            })
    }

    static saveUser(user) {
        AsyncStorage.setItem(KEY.ME, JSON.stringify(user))
            .catch(function(error) {
                throw error;
            });
    }

    static getUser() {
        return AsyncStorage.getItem(KEY.ME)
            .then((user) => {
                if(user !== null) {
                    return JSON.parse(user);
                } else {
                    return null;
                }
            })
            .catch(function(error) {
                throw error;
            });
    }

    static clear(callback) {
        AsyncStorage.multiRemove([
            KEY.ME, KEY.TOKEN
        ], callback);
    }

}
