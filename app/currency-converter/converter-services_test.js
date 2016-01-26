"use strict";

describe("Currency converter service", function () {
    var currencyConverterService, httpBackend;

    beforeEach(module("fxApp.exchangeRates"));

    beforeEach(inject(function (_CurrencyConverterService_, $httpBackend) {
        currencyConverterService = _CurrencyConverterService_;
        httpBackend = $httpBackend;
    }));

    it('should be defined.', function () {
        expect(currencyConverterService).toBeDefined();
    } );

    it("should get non-empty array of currencies.", function () {
        httpBackend.whenJSONP("http://api.fixer.io/latest?callback=JSON_CALLBACK").respond(
            {
                base:"EUR",
                date:"2016-01-25",
                rates:{
                    AUD: 1.5496,
                    BGN: 1.9558,
                    BRL: 4.4276,
                    CAD: 1.5351,
                    CHF: 1.0981,
                    CNY: 7.1156,
                    CZK: 27.021
                }
            }
        );

        currencyConverterService.getSupportedCurrencies().then(function(json) {
            expect(json).toBeDefined();
            expect(json.length).toBeGreaterThan(0);
        });

        httpBackend.flush();

    });

    it("should convert 450 AUD to 314.064 AUD.", function () {

        httpBackend.whenJSONP("http://api.fixer.io/latest?callback=JSON_CALLBACK&base=AUD&symbols=USD").respond({

            base: "AUD",
            date: "2016-01-25",
            rates: {
                USD: 0.69792
            }
        });

        currencyConverterService.getReferenceRate('AUD','USD').then(function(convertedAmount) {
            var baseAmount = 450;
            expect(baseAmount * convertedAmount).toEqual(314.064);
        });

        httpBackend.flush();

    });

});