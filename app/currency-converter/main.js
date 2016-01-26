/**
 *
 * Currency converter module declaration and routes configuration.
 *
 */
(function(){

    'use strict';

    angular
        .module('fxApp.exchangeRates', ['ngRoute', 'lodash'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'app/currency-converter/converter-template.html',
                controller: 'CurrencyConverterCtrl'
            });
        }])
})();
