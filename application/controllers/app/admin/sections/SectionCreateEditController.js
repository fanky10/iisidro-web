module.exports.injectControllerTo = (mod) => {
    mod.controller('SectionCreateEditCtrl', [
        'Sections',
        '$state',
        '$mdDialog',
        function (Sections, $state, $mdDialog) {

            this.initialize = () => {

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
                let form = this.sectionForm;

                event.preventDefault();

                form.$setSubmitted();
                if (form.$valid) {
                    
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
