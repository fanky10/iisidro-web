module.exports.injectControllerTo = (mod) => {
    mod.controller('QuestionsListCtrl', [
        'Questions',
        '$state',
        '$mdDialog',
        function (Questions, $state, $mdDialog) {

            this.initialize = () => {
                this.loadQuestions();
            };

            this.loadQuestions = () => {
                Questions.getInstances()
                    .then((questions) => {
                        this.questions = questions;
                    })
                    .catch((error) => {

                    });
            };

            this.editQuestion = (question) => {
                $state.go('base.app.admin.questions.edit', {
                    questionId: question.id
                });
            };

            this.deleteQuestion = (question) => {
                var deleteDialog = $mdDialog.confirm()
                    .title('Desea eliminar la siguiente pregunta?')
                    .targetEvent(event)
                    .ok('SI')
                    .cancel('NO');

                $mdDialog.show(deleteDialog)
                    .then(() => {
                        Questions.deleteInstance({
                            questionId: question.id
                        })
                        .then((response) => {
                            this.loadQuestions();
                        })
                        .catch(() => {

                        });
                    });
            };

            this.questions = [];
            this.columns = [
                {
                    key: 'nombre',
                    label: 'Nombre'
                },
                {
                    key: 'tipo.nombre',
                    label: 'Tipo'
                },
                {
                    key: 'fecha_hora_creacion',
                    label: 'Hora de creacion'
                }
            ];
            this.actions = [
                {
                    label: 'Editar',
                    onCall: this.editQuestion
                },
                {
                    label: 'Eliminar',
                    onCall: this.deleteQuestion
                }
            ];
        }
    ]);
};
