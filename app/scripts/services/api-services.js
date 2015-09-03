'use strict';

angular.module('interviewTaskApp')
    .factory('API', ['$http', function($http) {

        var urlPrefix = 'http://pagesmanagement.azurewebsites.net';

        function extractResponse(response) {
            return response.data;
        }
        
        var API = {

            pageCreate: function(page) {
                var config = {
                    url: urlPrefix + '/api/ResponsivePages',
                    method: 'POST',
                    data: page
                };

                return $http(config).then(extractResponse);
            },
            pageRead: function(id) {
                var config = {
                    url: urlPrefix + '/api/ResponsivePages/' + id,
                    method: 'GET'
                };

                return $http(config).then(extractResponse);;
            },
            pageUpdate: function(id, page) {
                var config = {
                    url: urlPrefix + '/api/ResponsivePages/' + id,
                    method: 'PUT',
                    data: page
                };

                return $http(config).then(extractResponse);;
            },
            pageDelete: function(id) {
                var config = {
                    url: urlPrefix + '/api/ResponsivePages/' + id,
                    method: 'DELETE'
                };

                return $http(config).then(extractResponse);;
            },
            pagesRead: function() {
                var config = {
                    url: urlPrefix + '/api/ResponsivePages',
                    method: 'GET'
                };

                return $http(config).then(extractResponse);;
            }

        };

        return API;
}]);

