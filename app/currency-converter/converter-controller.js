(function(){

    'use strict';

    angular
        .module('fxApp.exchangeRates')
        .controller("CurrencyConverterCtrl", CurrencyConverterCtrl);

    // Explicitly injecting required services, so the controller keep on running even after the code obfuscation.
    CurrencyConverterCtrl.$inject = ['$scope', 'CurrencyConverterService'];

    function CurrencyConverterCtrl($scope, CurrencyConverterService){

        var defaults = {
            fromList : {},
            toList : {},
            from : "",
            to : "",
            amount : 1.0,
            referenceRate: 0
        };
        $scope.ui = {
            converting: false
        };
        $scope.currencyForm = angular.copy(defaults);
        $scope.onConvert = convert;
        $scope.onReset = reset;
        $scope.onCurrencyChange = currencyChanged;

        // get list of all available currencies
        CurrencyConverterService.getSupportedCurrencies().then(function (data) {
            $scope.currencyForm.fromList = angular.copy(data);
            $scope.currencyForm.toList = angular.copy(data);
        });

        function convert (from, to) {
            $scope.ui.converting = true;
            CurrencyConverterService.getReferenceRate(from, to).then(function (data) {
                $scope.currencyForm.referenceRate = data;
                $scope.ui.converting = false;
            });
        }

        function reset(){
            $scope.currencyForm.from = $scope.currencyForm.to = "";
            $scope.currencyForm.amount = 1.0;
            $scope.currencyForm.referenceRate = 0;
        }

        function currencyChanged() {
            $scope.currencyForm.referenceRate = 0;
        }
    }
})();
