module.exports.injectControllerTo = (mod) => {
    mod.controller('QuestionCreateEditCtrl', [
        'Questions',
        'QuestionTypes',
        '$state',
        '$mdDialog',
        function (Questions, QuestionTypes, $state, $mdDialog) {

            this.initialize = () => {
                QuestionTypes.getInstances()
                    .then((questionTypes) => {
                        this.questionTypes = questionTypes;
                    })
                    .catch(() => {

                    });
                if ($state.params.hasOwnProperty('questionId')) {   
                    Questions.getOne({
                        questionId: $state.params.questionId
                    })
                        .then((question) =>{
                            this.question.statement = question.nombre;
                            this.question.type = question.tipo.nombre;
                            this.question.id = $state.params.questionId;
                        })
                        .catch((error) =>{
                            console.log(error);
                        });
                }
            };

            this.showMessages = (controlId) => {
                let form = this.questionForm;
                let control = form[controlId];

                return (control.$error !== {} && (control.$touched || form.$submitted));
            };

            this.getErrors = (controlId) => {
                return this.questionForm[controlId].$error;
            };

            this.handleFormSubmit = (event) => {
                let form = this.questionForm;

                event.preventDefault();

                form.$setSubmitted();

                if (form.$valid) {
                    if($state.params.hasOwnProperty('questionId')){
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
                    } else {
                        Questions.createInstance({
                            question: this.question
                        })
                            .then((question) => {
                                this.goBack();
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }
                }
            };

            this.goBack = () => {
                $state.go('base.app.admin.questions.list');
            };

            this.update = () => {
                Questions.updateInstance({
                    question: this.question
                })
                    .then((question) => {
                        this.goBack();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }

            this.question = {
                id: 0,
                type: '',
                statement: ''
            };
            this.questionTypes = [];
            this.texto = '';
        }
    ]);
};
