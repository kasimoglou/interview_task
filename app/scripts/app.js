'use strict';
/* global $ */
angular.module('interviewTaskApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angularMoment',
    'validator',
    'validator.rules'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/pages', {
        templateUrl: 'views/pages.html',
        controller: 'ListPagesController'
      })
      .when('/pages/new', {
        templateUrl: 'views/new_page.html',
        controller: 'NewPageController'
      })
      .when('/pages/:id', {
        templateUrl: 'views/edit_page.html',
        controller: 'EditPageController'
      })
      .otherwise({
        redirectTo: '/pages'
      });
  })
    .config(function($validatorProvider) {
        
        $validatorProvider.register('maxLength', {
            validator: function(value, scope, element, attrs) {
                if (typeof value === 'undefined') {
                    return true;
                }
                
                return (value.length > attrs.maxLength) ? false : true; 
            },
            error: function(value, scope, element, attrs) {
                var $label, label, parent, _i, _len, _ref, _results;
                parent = $(element).parent();
                _results = [];
                while (parent.length !== 0) {
                    if (parent.hasClass('form-group')) {
                        parent.addClass('has-error');
                        _ref = parent.find('label');
                        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                            label = _ref[_i];
                            if ($(label).hasClass('error')) {
                              $(label).remove();
                            }
                        }
                        $label = $('<label class=\'control-label error\'>This field should be at most ' + 
                              attrs.maxLength + ' characters long.</label>');
                        if (attrs.id) {
                            $label.attr('for', attrs.id);
                        }
                        if ($(element).parent().hasClass('input-group')) {
                            $(element).parent().parent().append($label);
                        } else {
                            $(element).parent().append($label);
                        }
                        break;
                    }
                    _results.push(parent = parent.parent());
                }
                return _results;
            }
        });
  });
