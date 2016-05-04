'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('SgfProjects').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/devices');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'templates/devices.html'
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