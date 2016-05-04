'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('SgfProjects').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'templates/dashboard.html'
            })
            .state('tables', {
                url: '/tables',
                templateUrl: 'templates/tables.html'
            })
            .state('devices', {
                url: '/devices',
                templateUrl: 'templates/devices.html'
            })
            .state('documentation', {
                url: '/documentation',
                templateUrl: 'templates/documentation.html'
            });
    }
]);