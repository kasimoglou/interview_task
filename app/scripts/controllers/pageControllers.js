'use strict';
/* globals _ */
angular.module('interviewTaskApp')
    // This controller is responsible for the responsive pages listing page
    // It is responsible for fetching the pages and provides page deletion functionality 
    .controller('ListPagesController', ['$scope', 'API', '$window', 'LocationService',
        function ($scope, API, $window, LocationService) {
        
        $scope.pages = [];
        
        // Calls `pagesRead` endpoint which returns the existing pages
        $scope.readPages = function() {
            API.pagesRead().then(function(response) {
                if (response !== null) {
                    $scope.pages = response;
                }
            });
        };
        
        // Called when user hits delete button. It accepts page's id
        // and deletes the corresponding page.
        $scope.deletePage = function(id) {
            // First, we have to ask user to confirm his action
            if (!$window.confirm('Are you sure?')) {
                return; 
            }
            
            // Call `pageDelete` endpoint and if deletion is successful
            // remove page from local $scope object (so that GUI will be updated)
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
        
        $scope.go = LocationService.goTo;
        
        // Fetch pages and initialize scope
        $scope.readPages();
    }])
    
    // This controller is responsible for the new page creation page. 
    .controller('NewPageController', ['$scope', 'LocationService', '$validator', 'API', '$window', 
        function($scope, LocationService, $validator, API, $window) {
        
        $scope.page = {};

        // This function is called when user hits create page button.
        // It validates the form and if there are no errors it calls
        // `pageCreate` endpoint passing `page` data. If page creation
        // is completed succesfully, user gets redirected to pages listing page
        $scope.createPage = function() {
            $validator.validate($scope, 'page').success(function() {
                $scope.page.publishedOn = new Date();
                API.pageCreate($scope.page).then(function(response) {
                    if (response !== null) {
                        $scope.go('/pages');
                    }
                });
            });
        };
        
        // Called when user hits cancel button. If user confirms his action,
        // he is getting redirected to pages listing page
        $scope.cancel = function() {
            if (!$window.confirm('Your data will be lost. Are you sure?')) {
                return;
            }
            $scope.go('/pages');
        };
        
        $scope.go = LocationService.goTo;
    }])

    // Controller responsible for page editing page.
    .controller('EditPageController', ['$scope', 'LocationService', '$validator', 'API', '$window', '$routeParams',
        function($scope, LocationService, $validator, API, $window, $routeParams) {
        
        $scope.page = {};
        
        // Get page id from url, and fetch the corresponding page in order to
        // display its data to the user.
        $scope.getPage = function() {
            API.pageRead($routeParams.id).then(function(response) {
                if (response !== null) {
                    $scope.page = response;
                }
            });
        };
        $scope.getPage();

        // Called when user hits Update button after he has completed his changes.
        // If form validation and page update are completed successfully, user gets
        // redirected to pages listing.
        $scope.updatePage = function() {
            $validator.validate($scope, 'page').success(function() {
                API.pageUpdate($scope.page.id, $scope.page).then(function(response) {
                    if (response !== null) {
                        $scope.go('/pages');
                    }
                });
            });
        };
        
        // Called when user hits cancel button. If user confirms his action,
        // he is getting redirected to pages listing page
        $scope.cancel = function() {
            if (!$window.confirm('Your changes will be lost. Are you sure?')) {
                return;
            }
            $scope.go('/pages');
        };
        
        $scope.go = LocationService.goTo;
    }]);
