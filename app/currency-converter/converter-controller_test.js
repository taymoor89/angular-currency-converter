
'use strict';

describe('Currency converter controller', function(){

    beforeEach(module('fxApp.exchangeRates'));

    var $scope, currencyController, currencyConverterService;

    beforeEach(function () {
        inject(function(_CurrencyConverterService_, $rootScope,$controller) {
            //spec body
            currencyConverterService = _CurrencyConverterService_;
            $scope = $rootScope.$new();
            currencyController = $controller('CurrencyConverterCtrl',{$scope:$scope, CurrencyConverterService: currencyConverterService});
        })
    });

    it('should be defined.', function () {
        expect(currencyController).toBeDefined();
    });

    it('onReset(): should reset amount and converted amount.', function () {

        $scope.currencyForm.from = "USD";
        $scope.currencyForm.to = "AUD";
        $scope.currencyForm.amount = 6.0;
        $scope.currencyForm.referenceRate = 10.0;
        $scope.onReset();
        expect($scope.currencyForm.from).toEqual('');
        expect($scope.currencyForm.to).toEqual('');
        expect($scope.currencyForm.amount).toEqual(1.0);
        expect($scope.currencyForm.referenceRate).toEqual(0.0);
    });


});