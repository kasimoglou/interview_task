'use strict';
// /* globals moment */
angular.module('interviewTaskApp')
    // Not used anymore - transforms an input field to datepicker
    .directive('myDatepicker', function() {
        return {
            restrict: 'EA',
            scope: {
                ngModel: '='
            },
            link: function(scope, element) {
                
                element.datepicker({
                    dateFormat: 'dd-mm-yy'
                });
                
//                scope.$watch('ngModel', function (value, oldValue) {
//                    if (value && typeof oldValue === 'undefined') {
//                        element.datepicker('setDate', moment(value).format('DD-MM-YYYY'));
//                    }
//                });
            }
        };
    })
    .directive('pageForm', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/page.tpl.html',
            controller: function($scope) {
                // page types - used for ng-options in select field
                $scope.pageTypes = [
                    {
                        value: 0,
                        name: 'Menu'
                    },
                    {
                        value: 1,
                        name: 'Events'
                    },
                    {
                        value: 2,
                        name: 'Content'
                    }
                ]; 
            }
        };
    });
