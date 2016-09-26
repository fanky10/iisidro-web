module.exports.injectControllerTo = (mod) => {
    mod.controller('SurveyCreateEditCtrl', [
        'Surveys',
        '$state',
        '$mdDialog',
        'Sections',
        function (Surveys, $state, $mdDialog, Sections) {

            this.initialize = () => {
                if ($state.params.hasOwnProperty('surveyId')) {
                    Surveys.getOne({
                        surveyId: $state.params.surveyId
                    })
                    .then((survey) => {
                        //console.log(survey);
                        this.survey.id = $state.params.surveyId;
                        this.survey.title = survey.nombre;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                    //console.log(this.survey);

                    Sections.getInstances({
                        surveyId: $state.params.surveyId
                    })
                    .then((sections) => {
                        this.sections = sections;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                }
            };

            this.showMessages = (controlId) => {
                let form = this.surveyForm;
                let control = form[controlId];

                return (control.$error !== {} && (control.$touched || form.$submitted));
            };

            this.getErrors = (controlId) => {
                return this.surveyForm[controlId].$error;
            };

            this.handleFormSubmit = (event) => {
                let form = this.surveyForm;

                event.preventDefault();

                form.$setSubmitted();
                if (form.$valid) {
                    if (this.survey.id === -1) {
                        Surveys.createInstance({
                            survey: this.survey
                        })
                        .then((survey) => {
                            console.log(survey);

                            this.goBack();
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    } else {
                        var updateDialog = $mdDialog.confirm()
                        .title('¿Está seguro de que quiere guardar los cambios?')
                        .targetEvent(event)
                        .ok('Aceptar')
                        .cancel('Cancelar');

                        $mdDialog.show(updateDialog)
                        .then(() => {
                            this.update();

                            this.goBack();
                            })
                            .catch(() => {

                            });
                        };
                    }
            };

            this.update = () => {
                Surveys.updateInstance({
                    survey: this.survey
                })
                .then((survey) => {
                    console.log(survey);

                    this.goBack();
                })
                .catch((error) => {
                    console.log(error);
                }); 
            };

            this.goBack = () => {
                $state.go('base.app.admin.surveys.list');
            };

            this.deleteSection = () => {

            };

            this.editSection = () => {

            }

            this.survey = {
                id: -1,
                title: ''
            };

            this.sections = [];
            this.columns = [
                {
                    key: 'orden',
                    label: 'Orden'
                },
                {
                    key: 'codigo',
                    label: 'Código'
                },
                {
                    key: 'nombre',
                    label: 'Nombre'
                }
            ];
            this.actions = [
                {
                    label: 'Editar',
                    onCall: this.editSection
                },
                {
                    label: 'Eliminar',
                    onCall: this.deleteSection
                }
            ];
        }
    ]);
};
