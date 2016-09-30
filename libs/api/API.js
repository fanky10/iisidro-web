// VENDOR LIBS
const _ = require('lodash');
const path = require('path');

module.exports.injectServiceTo = (mod) => {
    mod.service('API', [
        '$q',
        '$http',
        'Storage',
        function ($q, $http, Storage) {

            this.defaultConfig = {
                apiRoot: 'api',
                contentType: "application/json",
                dataType: 'json',
                host: 'https://iisidro-server.herokuapp.com',
                authToken: null
            };

            this.initialize = () => {
                let storedConfig = Storage.get('API');

                if (!this.config) {
                    this.config = storedConfig || this.defaultConfig;

                    if (!storedConfig) {
                        this.saveInStorage(this.defaultConfig);
                    }
                }
            };

            this.setAuthToken = (authToken) => {
                this.config.authToken = authToken;
                this.saveInStorage();
            };

            this.getAuthToken = () => {
                return this.config.authToken;
            };

            this.post = (config) => {
                return $http(this.addHeaders({
                    url: path.join(this.config.host, this.config.apiRoot, config.url),
                    method: 'POST',
                    contentType: this.config.contentType,
                    data: JSON.stringify(config.data),
                    params: config.params,
                    dataType: this.config.dataType
                }));
            };

            this.put = (config) => {
                return $http(this.addHeaders({
                    url: path.join(this.config.host, this.config.apiRoot, config.url),
                    method: 'PUT',
                    contentType: this.config.contentType,
                    data: JSON.stringify(config.data),
                    params: config.params,
                    dataType: this.config.dataType
                }));
            };

            this.get = (config) => {
                return $http(this.addHeaders({
                    url: path.join(this.config.host, this.config.apiRoot, config.url),
                    method: 'GET',
                    contentType: this.config.contentType,
                    data: JSON.stringify(config.data),
                    params: config.params,
                    dataType: this.config.dataType
                }));
            };

            this.delete = (config) => {
                return $http(this.addHeaders({
                    url: path.join(this.config.host, this.config.apiRoot, config.url),
                    method: 'DELETE',
                    contentType: this.config.contentType,
                    data: JSON.stringify(config.data),
                    params: config.params,
                    dataType: this.config.dataType
                }));
            };

            this.saveInStorage = (config) => {
                Storage.set('API', config || this.config);
            };

            this.addHeaders = (config) => {
                if (this.config.authToken) {
                    config.headers = {
                        'Authority': this.config.authToken,
                        'x-auth-token': this.config.authToken,
                        'X-CSRF-Token': this.config.authToken
                    };
                }

                return config;
            };

            this.initialize();
        }
    ]);
};
