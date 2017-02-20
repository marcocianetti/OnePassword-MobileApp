const SERVER = {
    TEST: {
        URL: 'https://one-password.herokuapp.com',
        PORT: null
    },
    API: {
        URL: 'https://one-password.herokuapp.com',
        PORT: null
    }
};

export default class Config {

    static getUrl() {
        if(process.env.NODE_ENV == 'development') {
            if(SERVER.TEST.PORT != null) {
                return SERVER.TEST.URL + ":" + SERVER.TEST.PORT;
            } else {
                return SERVER.TEST.URL;
            }
        } else {
            return SERVER.API.URL + ":" + SERVER.API.PORT
        }
    }

}
