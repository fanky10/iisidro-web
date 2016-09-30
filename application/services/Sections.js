module.exports.injectServiceTo = (mod) => {
    mod.service('Sections', [
        'API',
        '$q',
        function (API, $q) {

            this.getInstances = (config) => {
                return $q((resolve, reject) => {
                    API.get({
                        url: 'seccionesByEncuesta/' + config.surveyId
                    })
                    .then((response) => {
                        resolve(response.data);
                    })
                    .catch((error) => {
                        reject(error);
                    });
                });
            };
        }
    ]);
};
