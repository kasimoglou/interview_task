'use strict';

/**
 * @ngdoc overview
 * @name interviewTaskApp
 * @description
 * # interviewTaskApp
 *
 * Main module of the application.
 */
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
      .otherwise({
        redirectTo: '/pages'
      });
  });
