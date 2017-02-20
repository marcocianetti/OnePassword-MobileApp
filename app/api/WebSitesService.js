import Http from '../utils/HttpClient';

export default class WebSitesService {

    static getWebSitesList() {

        // Effettuo la richiesta HTTP
        return Http.fetch("website/list")
            .then(json => {
                return json.websites;
            });
    };

    static deleteWebsite(websiteId) {

        // Effettuo la richiesta HTTP
        return Http.fetch("website/remove/" + websiteId)
            .then(response => {
                return response;
            });
    };

}
