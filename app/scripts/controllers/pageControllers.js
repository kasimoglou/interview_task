'use strict';
/**
 * @ngdoc function
 * @name interviewTaskApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the interviewTaskApp
 */
angular.module('interviewTaskApp')
    .controller('ListPagesController', ['$scope', 'API', '$location', function ($scope, API, $location) {
        
        $scope.pages = [];

        $scope.readPages = function() {
            API.pagesRead().then(function(response) {
                if (response !== null) {
                    $scope.pages = response;
                }
            });
        };
        
        $scope.go = function(path) {
            $location.path(path);
        };
        
        $scope.readPages();
    }])

    .controller('NewPageController', ['$scope', '$location', function($scope, $location) {
        
        $scope.go = function(path) {
            $location.path(path);
        };
    }]);
