'use strict';

angular.module('interviewTaskApp')
    .factory('API', ['$http', '$window', function($http, $window) {

        var urlPrefix = 'http://pagesmanagement.azurewebsites.net';

        function extractResponse(response) {
            return response.data;
        }
        
        function reportError(response) {
            var errorMessage = response.errorMessage || '';
            
            $window.alert('An unexpected error occured.' + errorMessage);
            return null;
        }
        
        var API = {

            pageCreate: function(page) {
                var config = {
                    url: urlPrefix + '/api/ResponsivePages',
                    method: 'POST',
                    data: page
                };

                return $http(config).then(extractResponse, reportError);
            },
            pageRead: function(id) {
                var config = {
                    url: urlPrefix + '/api/ResponsivePages/' + id,
                    method: 'GET'
                };

                return $http(config).then(extractResponse, reportError);
            },
            pageUpdate: function(id, page) {
                var config = {
                    url: urlPrefix + '/api/ResponsivePages/' + id,
                    method: 'PUT',
                    data: page
                };

                return $http(config).then(extractResponse, reportError);
            },
            pageDelete: function(id) {
                var config = {
                    url: urlPrefix + '/api/ResponsivePages/' + id,
                    method: 'DELETE'
                };

                return $http(config).then(extractResponse, reportError);
            },
            pagesRead: function() {
                var config = {
                    url: urlPrefix + '/api/ResponsivePages',
                    method: 'GET'
                };

                return $http(config).then(extractResponse, reportError);
            }

        };

        return API;
}]);

