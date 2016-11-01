/**
 * Controllers
 * Maakt gebruik van IIFE-pattern
 */

(function() {
    angular.module('beheerApp')
        .controller('homeController', homeController)
        .controller('leverancierController', leverancierController)
        .controller('leverancierDetailController', leverancierDetailController)
        .controller('gebruikerController', gebruikerController)
        .controller('logController', logController);

    function homeController() {
        var vm = this;
        vm.subTitle = "Overzicht";
    }
    
    leverancierController.$inject = ['$scope','leverancierService'];

    function leverancierController($scope,leverancierService) {
        var vm = this;
        vm.getLeveranciers = function() {
            leverancierService.getLeveranciers()
                .success(function(leveranciers) {
                    vm.leveranciers = leveranciers;
                    if($scope.typeE) {
                        vm.leveranciers = leveranciers.filter(function (obj) {
                            if (obj.type.indexOf("Elek") !== -1) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        })
                    }
                    else if ($scope.typeG) {
                            vm.leveranciers = leveranciers.filter(function(obj) {
                                if(obj.type.indexOf("Gas") !== -1) {
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            });
                        }
                })
                .error(function(err) {
                    vm.errorMsg = "Er is een probleem met de server.";
                    vm.error = err;
                })
        };

        // Wordt momenteel niet gebruikt, inline filtering met Angular in de plaats

        vm.getLeverancierByName = function(name) {
            leverancierService.getLeveranciers()
                .then(function(leveranciers) {
                    var allLevs = leveranciers.data;
                    vm.filteredLeveranciers = allLevs.filter(function(obj) {
                        if(obj.naam.indexOf(name) !== -1) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    })
                });
        };

        vm.clearSelection = function() {
            vm.leveranciers = null;
            vm.selectedLeveranciers = null;
        };

        vm.onChange = function() {
            if($scope.typeE) {
                vm.leveranciers = vm.leveranciers.filter(function (obj) {
                    if (obj.type.indexOf("Elektriciteit") !== -1) {
                        return true;
                    }
                    else {
                        return false;
                    }
                })
            }
            else if ($scope.typeG) {
                vm.leveranciers = vm.leveranciers.filter(function(obj) {
                    if(obj.type.indexOf("Gas") !== -1) {
                        return true;
                    }
                    else {
                        return false;
                    }
                });
            }
            else if(!$scope.typeG && !$scope.typeE) {
                vm.getLeveranciers();
            }
        }
    }

    leverancierDetailController.$inject = ['$routeParams', '$scope', 'leverancierService'];

    function leverancierDetailController($routeParams,$scope, leverancierService) {
        var vm = this;
        vm.leverancier = {};
        vm.id = $routeParams.id;
        leverancierService.getLeveranciers()
            .success(function(leveranciers) {
                vm.leverancier = leveranciers[vm.id-1];
            });
    }

    gebruikerController.$inject = ['$scope', 'gebruikerService'];

    function gebruikerController($scope, gebruikerService) {
        var vm = this;

        vm.getGebruikers = function() {
            gebruikerService.getGebruikers()
                .success(function(gebruikers) {
                    vm.gebruikers = gebruikers;
                })
                .error(function(err) {
                    vm.error = err;
                    vm.errorMsg = "Er is iets fout gegaan";
                })
        };

        vm.clearSelection = function() {
            vm.gebruikers = null;
        }
    }
    
    logController.$inject = ['$scope', 'logService'];

    function logController($scope, logService) {
        var vm = this;
        vm.types = ["Alle","Elektriciteit", "Gas"];

        vm.getAllLogs = function() {
            logService.getAllLogs()
                .success(function(logs) {
                    vm.logs = logs;
                })
                .error(function(err){
                    vm.error = err;
                    vm.errorMsg = "Er is iets foutgegaan";
                });
        };

        vm.onTypeChange = function() {
            vm.logs = null;
            var currentSelected = $scope.selectedType;
            logService.getAllLogs()
                .success(function(logs) {
                    if(currentSelected !== null && currentSelected === "Elektriciteit") {
                        vm.logs = logs.filter(function(obj) {
                            return obj.type === currentSelected;
                        })
                    }
                    else if(currentSelected !== null && currentSelected === "Gas") {
                        vm.logs = logs.filter(function(obj) {
                            return obj.type === currentSelected;
                        })
                    }
                    else {
                        vm.logs = logs;
                    }
                })
        };

        vm.clearSelection = function() {
            vm.logs = null;
        }
    }

})();