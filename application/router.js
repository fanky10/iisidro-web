// VENDOR LIBS
const _ = require('lodash');

module.exports.injectRouterTo = (mod) => {
    mod.config([
        '$stateProvider',
        '$urlRouterProvider',
        '$locationProvider',
        ($stateProvider, $urlRouterProvider, $locationProvider) => {
            $locationProvider.html5Mode(true);

            $stateProvider
                .state('base', {
                    abstract: true,
                    url: '',
                    templateUrl: 'containers/base-container.html',
                    controller: 'BaseCtrl',
                    controllerAs: 'baseCtrl'
                });

            // ACCESS CONFIGURATION
            $stateProvider
                .state('base.access', {
                    abstract: true,
                    url: '/access',
                    templateUrl: 'containers/access-container.html',
                    controller: 'AccessCtrl'
                })
                .state('base.access.login', {
                    url: '/login',
                    templateUrl:  'views/access/login-view.html',
                    controller: 'LoginCtrl',
                    controllerAs: 'loginCtrl'
                })
                .state('base.access.register', {
                    url: '/register',
                    templateUrl:  'views/access/register-view.html'
                })
                .state('base.access.recovery', {
                    url: '/recovery',
                    templateUrl:  'views/access/recovery-view.html'
                });

            // ACCESS FALLBACKS
            $urlRouterProvider.when(new RegExp('/access*'), '/access/login');

            // APP CONFIGURATION
            $stateProvider
                .state('base.app', {
                    url: '/app',
                    templateUrl: 'containers/app-container.html',
                    controller: 'AppCtrl',
                    controllerAs: 'appCtrl'
                });

            // ADMIN CONFIGURATION
            $stateProvider
                .state('base.app.admin', {
                    abstract: true,
                    url: '/admin',
                    templateUrl: 'views/abstract.html'
                })
                .state('base.app.admin.dashboard', {
                    url: '/dashboard',
                    templateUrl: 'views/app/admin/admin-dashboard-view.html'
                });

            // ADMIN QUESTIONS CONFIGURATION
            $stateProvider
                .state('base.app.admin.questions', {
                    abstract: true,
                    url: '/questions',
                    templateUrl: 'views/app/admin/questions/questions-view.html'
                })
                .state('base.app.admin.questions.list', {
                    url: '/list',
                    templateUrl: 'views/app/admin/questions/questions-list-view.html',
                    controller: 'QuestionsListCtrl',
                    controllerAs: 'questionsListCtrl'
                })
                .state('base.app.admin.questions.create', {
                    url: '/create',
                    templateUrl: 'views/app/admin/questions/question-create-edit-view.html',
                    controller: 'QuestionCreateEditCtrl',
                    controllerAs: 'questionCreateEditCtrl'
                })
                .state('base.app.admin.questions.edit', {
                    url: '/edit/:questionId',
                    templateUrl: 'views/app/admin/questions/question-create-edit-view.html',
                    controller: 'QuestionCreateEditCtrl',
                    controllerAs: 'questionCreateEditCtrl'
                });

            // ADMIN QUESTIONS FALLBACKS
            $urlRouterProvider.when(new RegExp('/app/admin/questions*'), '/app/admin/questions/list');

            // ADMIN SURVEYS CONFIGURATION
            $stateProvider
                .state('base.app.admin.surveys', {
                    abstract: true,
                    url: '/surveys',
                    templateUrl: 'views/app/admin/surveys/surveys-view.html'
                })
                .state('base.app.admin.surveys.list', {
                    url: '/list',
                    templateUrl: 'views/app/admin/surveys/surveys-list-view.html',
                    controller: 'SurveysListCtrl',
                    controllerAs: 'surveysListCtrl'
                })
                .state('base.app.admin.surveys.create', {
                    url: '/create',
                    templateUrl: 'views/app/admin/surveys/survey-create-edit-view.html',
                    controller: 'SurveyCreateEditCtrl',
                    controllerAs: 'surveyCreateEditCtrl'
                })
                .state('base.app.admin.surveys.edit', {
                    url: '/edit/:surveyId',
                    templateUrl: 'views/app/admin/surveys/survey-create-edit-view.html',
                    controller: 'SurveyCreateEditCtrl',
                    controllerAs: 'surveyCreateEditCtrl'
                });

            // ADMIN SURVEYS FALLBACKS
            $urlRouterProvider.when(new RegExp('/app/admin/surveys*'), '/app/admin/surveys/list');

            // ADMIN FALLBACKS
            $urlRouterProvider.when(new RegExp('/app/admin*'), '/app/admin/dashboard');

            $urlRouterProvider.otherwise('/app');
        }
    ]);

    mod.run([
        'Auth',
        '$rootScope',
        '$state',
        function (Auth, $rootScope, $state) {
            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                console.log('err', error);
            });
        }
    ]);
};
