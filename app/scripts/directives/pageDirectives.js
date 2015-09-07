'use strict';
/**
 * @ngdoc function
 * @name interviewTaskApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the interviewTaskApp
 */
angular.module('interviewTaskApp')
    .directive('myDatepicker', function() {
        return {
            restrict: 'EA',
            link: function(scope, element) {
                element.datepicker();
            }
        };
});
