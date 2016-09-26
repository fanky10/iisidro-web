module.exports.injectServiceTo = (mod) => {
    mod.service('Surveys', [
        'API',
        '$q',
        function (API, $q) {

            this.getInstances = () => {
                return $q((resolve, reject) => {
                    API.get({
                        url: 'encuestas'
                    })
                    .then((response) => {
                        resolve(response.data);
                    })
                    .catch((error) => {
                        reject(error);
                    });
                });
            };

            this.getOne = (config) => {
                return $q((resolve, reject) => {
                    API.get({
                        url: 'encuestas/' + config.surveyId
                    })
                    .then((response) => {
                        resolve(response.data);
                    })
                    .catch((error) => {
                        reject(error);
                    });
                });
            };

            this.createInstance = (config) => {
                let survey = config.survey;

                return $q((resolve, reject) => {
                    API.post({
                        url: 'encuestas',
                        data: {
                            nombre: survey.title
                        }
                    })
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
                });
            };

            this.updateInstance = (config) => {
                let survey = config.survey;

                return $q((resolve, reject) => {
                    API.put({
                        url: 'encuestas',
                        data: {
                            id: survey.id,
                            nombre: survey.title
                        }
                    })
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
                });
            };

            this.deleteInstance = (config = {}) => {
                return $q((resolve, reject) => {
                    API.delete({
                        url: 'encuestas/' + config.surveyId
                    })
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
                });
            }
        }
    ]);
};
