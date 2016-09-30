module.exports.injectServiceTo = (mod) => {
    mod.service('Questions', [
        'API',
        '$q',
        function (API, $q) {

            this.getInstances = () => {
                return $q((resolve, reject) => {
                    API.get({
                        url: 'preguntas'
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
                        url: 'preguntas/' + config.questionId
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
                let question = config.question;

                return $q((resolve, reject) => {
                    API.post({
                        url: 'preguntas',
                        data: {
                            nombre: question.statement,
                            tipo: question.type
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
                let question = config.question;

                return $q((resolve, reject) => {
                    API.put({
                        url: 'preguntas',
                        data: {
                            id: question.id,
                            nombre: question.statement,
                            tipo: question.type
                        }
                    })
                    .then((response) => {
                        resolve(response.data);
                    })
                    .catch((error) => {
                        reject(error);
                    });
                });
            };


            this.deleteInstance = (config = {}) => {
                return $q((resolve, reject) => {
                    API.delete({
                        url: 'preguntas/' + config.questionId
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
