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
        //.when('/tmp/:key', {
        //   templateUrl: '/views/gua-page.html',
        //   controller: 'GuaCtrl'
        //})
        .when('/gua/:key', {
           templateUrl: '/views/gua-page.html',
           controller: 'GuaCtrl'
        })
        .when('/gua', {
           templateUrl: '/views/gua-page.html',
           controller: 'GuaCtrl'
        })
        .otherwise({
           redirectTo: '/'
        });
     //$locationProvider.html5Mode(true);
  }]);
