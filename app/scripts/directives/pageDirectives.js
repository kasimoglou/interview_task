'use strict';

angular.module('interviewTaskApp')
    .directive('myDatepicker', function() {
        return {
            restrict: 'EA',
            link: function(scope, element) {
                element.datepicker();
            }
        };
});
