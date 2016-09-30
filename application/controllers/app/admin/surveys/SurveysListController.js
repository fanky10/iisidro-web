module.exports.injectControllerTo = (mod) => {
    mod.controller('SurveysListCtrl', [
        'Surveys',
        '$state',
        '$mdDialog',
        function (Surveys, $state, $mdDialog) {

            this.initialize = () => {
                this.loadSurveys();
            };

            this.loadSurveys = () => {
                Surveys.getInstances()
                    .then((surveys) => {
                        this.surveys = surveys;
                    })
                    .catch((error) => {

                    });
            };

            this.editSurvey = (survey) => {
                $state.go('base.app.admin.surveys.edit', {
                    surveyId: survey.id
                });
            };

            this.deleteSurvey = (survey) => {
                var deleteDialog = $mdDialog.confirm()
                    .title('Desea eliminar la siguiente encuesta?')
                    .targetEvent(event)
                    .ok('SI')
                    .cancel('NO');

                $mdDialog.show(deleteDialog)
                    .then(() => {
                        Surveys.deleteInstance({
                            surveyId: survey.id
                        })
                        .then((response) => {
                            this.loadSurveys();
                        })
                        .catch(() => {

                        });
                    });
            };

            this.surveys = [];
            this.columns = [
                {
                    key: 'nombre',
                    label: 'Nombre'
                },
                {
                    key: 'fecha_hora_creacion',
                    label: 'Hora de creacion'
                }
            ];
            this.actions = [
                {
                    label: 'Editar',
                    onCall: this.editSurvey
                },
                {
                    label: 'Eliminar',
                    onCall: this.deleteSurvey
                }
            ];
        }
    ]);
};
