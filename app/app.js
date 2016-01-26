/**
 * Parent module for all featured sub-modules.
 */
(function(){

    'use strict';

    angular
        .module('fxApp', [
            'ngRoute',
            'fxApp.exchangeRates'
        ])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.otherwise({redirectTo: '/'});
        }]);

})();
