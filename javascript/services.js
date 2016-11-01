/**
 * Services
 * Maakt gebruik van IIFE-pattern
 */

(function() {
    'use strict';
    angular.module('beheerApp')
        .service('leverancierService', leverancierService)
        .service('gebruikerService', gebruikerService)
        .service('logService', logService);

    leverancierService.$inject = ['$http','GLOBALS'];

    function leverancierService($http,GLOBALS) {
        var service = {};
        service.getLeveranciers = function() {
            return $http({
                method: 'GET',
                url: GLOBALS.leverancierUrl
            })
        };

        service.getLeverancierById = function(id) {
            // TODO voor REST
        };

        return service;
    }

    gebruikerService.$inject = ['$http', 'GLOBALS'];

    function gebruikerService($http, GLOBALS) {
        var service = {};
        service.getGebruikers = function() {
            return $http({
                method: 'GET',
                url: GLOBALS.gebruikerUrl
            })
        };

        service.getGebruikerById = function(id) {
            // TODO voor REST
        };
        return service;
    }

    logService.$inject = ['$http', 'GLOBALS'];

    function logService($http, GLOBALS) {
        var service = {};

        service.getAllLogs = function() {
            return $http({
                method: 'GET',
                url: GLOBALS.logUrl
            })
        };

        service.getLogById = function(id) {
            // TODO voor REST
        }

        return service;
    }
    
})();