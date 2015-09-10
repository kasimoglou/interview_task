'use strict';

angular.module('interviewTaskApp')
    .factory('LocationService', ['$location', function($location) {
        
        // Location Service provides $location related service
        var LocationService = {
            // Redirects to the specified path
            goTo: function(path) {
                $location.path(path);
            }

        };

        return LocationService;
}]);

