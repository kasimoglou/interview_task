'use strict';
/* globals _ */
angular.module('interviewTaskApp')
    .controller('ListPagesController', ['$scope', 'API', '$location', '$window',
        function ($scope, API, $location, $window) {
        
        $scope.pages = [];

        $scope.readPages = function() {
            API.pagesRead().then(function(response) {
                if (response !== null) {
                    $scope.pages = response;
                }
            });
        };
        
        $scope.deletePage = function(id) {
            if (!$window.confirm('Are you sure?')) {
                return; 
            }
            
            API.pageDelete(id).then(function(response) {
                if (response !== null) {
                    var index = -1;
                    _.each($scope.pages, function(page, ind) {
                        if (page.id === id) {
                            index = ind;
                            return;
                        }
                    });
                    
                    if (index > -1) {
                        $scope.pages.splice(index, 1);
                    }
                }
            });
        };
        
        $scope.go = function(path) {
            $location.path(path);
        };
        
        $scope.readPages();
    }])

    .controller('NewPageController', ['$scope', '$location', '$validator', 'API', 
        function($scope, $location, $validator, API) {
        
        $scope.page = {};

        $scope.createPage = function() {
            $validator.validate($scope, 'page').success(function() {
                API.pageCreate($scope.page).then(function(response) {
                    if (response !== null) {
                        $scope.go('/pages');
                    }
                });
            });
        };
        
        $scope.go = function(path) {
            $location.path(path);
        };
    }]);
