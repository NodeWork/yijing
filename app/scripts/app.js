'use strict';

angular.module('yijingAngularApp', [
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
        .otherwise({
           redirectTo: '/'
        });
     //$locationProvider.html5Mode(true);
  }]);
