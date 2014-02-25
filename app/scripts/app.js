'use strict';

angular.module('yijing', [
  'ngSanitize',
  'ngRoute'
])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
     $routeProvider
        .when('/', {
           templateUrl: '/views/main.html',
           controller: 'MainCtrl'
        })
        .when('/gua/:key', {
           templateUrl: '/views/gua-page.html',
           controller: 'GuaCtrl'
        })
        .when('/result/:key', {
           templateUrl: '/views/result-page.html',
           controller: 'ResultCtrl'
        })
        .when('/result', {
           templateUrl: '/views/result-page.html',
           controller: 'ResultCtrl'
        })
        .otherwise({
           redirectTo: '/'
        });
     //$locationProvider.html5Mode(true);
  }]);
