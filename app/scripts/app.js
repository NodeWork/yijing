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
        .when('/doc/:type/:index', {
           templateUrl: '/views/doc.html',
           controller: 'DocCtrl'
        })

     // ===== static docs

        .when('/xici-1', {
           templateUrl: '/views/docs/xici-1.html'
        })
        .when('/xici-2', {
           templateUrl: '/views/docs/xici-2.html'
        })
        .when('/wen-yan', {
           templateUrl: '/views/docs/wen-yan.html'
        })
        .when('/shuo-gua', {
           templateUrl: '/views/docs/shuo-gua.html'
        })
        .when('/xu-gua', {
           templateUrl: '/views/docs/xu-gua.html'
        })
        .when('/za-gua', {
           templateUrl: '/views/docs/za-gua.html'
        })

        .otherwise({
           redirectTo: '/'
        });

     //$locationProvider.html5Mode(true);
  }]);
