/**
 * This service uses http://fixer.io/ APIs to fetch and convert currencies rate.
 */

(function () {

    angular
        .module('fxApp.exchangeRates')
        .factory("CurrencyConverterService", CurrencyConverterService);

    // Explicitly injecting required services, so the service keep on running even after the code obfuscation.
    CurrencyConverterService.$inject = ['$http', '$q', '_'];

    function CurrencyConverterService($http, $q, _) {
        return {

            /**
             * This service returns all supported currencies by fixer.io
             * @returns {*}
             * Returns a promise containing array of currency codes.
             */
            getSupportedCurrencies : function () {

                var url = "http://api.fixer.io/latest?callback=JSON_CALLBACK";
                return $http.jsonp(url)
                    .then(function (response) {
                        if (typeof response.data === 'object') {
                            return _.keys(response.data.rates);
                        } else {
                            // invalid response
                            return $q.reject(response.data);
                        }
                    },
                    function (response) {
                        // something went wrong
                        return $q.reject(response.data);
                    });
            },

            // This is an extra method.
            /**
             * Converts amount in base currency to given currency
             * @param from
             * Base currency
             * @param to
             * * Convert currency to
             * @param amount
             * Amount in base currency
             * @returns {*}
             * Returns a promise containing converted amount in number.
             */
            convert : function (from, to, amount) {

                var url = "http://api.fixer.io/latest?callback=JSON_CALLBACK&base=" + from +"&symbols="+to;
                return $http.jsonp(url).then(function (json) {
                    return (parseFloat(json.data.rates[to]) * parseFloat(amount));
                });
            },

            /**
             * Get reference amount of given currency with respect to base currency
             * @param from
             * Base currency
             * @param to
             * Currency to get reference rate of
             * @returns {*}
             */
            getReferenceRate: function (from, to) {

                var url = "http://api.fixer.io/latest?callback=JSON_CALLBACK&base=" + from +"&symbols="+to;
                return $http.jsonp(url)
                    .then(function (response) {
                        if (typeof response.data === 'object') {
                            return parseFloat(response.data.rates[to]);
                        } else {
                            // invalid response
                            return $q.reject(response.data);
                        }
                    },
                    function (response) {
                        // something went wrong
                        return $q.reject(response.data);
                    });
            }
        }
    }

})();
