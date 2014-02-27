'use strict';

angular.module('yijing', [
  'ngSanitize',
  'ngRoute'
])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
     $routeProvider

     // ===== Home page
        .when('/', {
           templateUrl: '/views/main.html',
           controller: 'MainCtrl'
        })

     // ===== single gua main page
        .when('/gua/:key', {
           templateUrl: '/views/gua-page.html',
           controller: 'GuaCtrl'
        })
        .when('/gua', {
           templateUrl: '/views/gua-page.html',
           controller: 'GuaCtrl'
        })

     // ===== docs generated from yijing.datas
        .when('/doc/:type/:index', {
           templateUrl: '/views/doc.html',
           controller: 'DocCtrl'
        })

     // ===== static docs

        .when('/static/:name', {
           templateUrl: '/views/tmp.html',
           controller: 'StaticDocCtrl'
        })

     // ===== Otherwises
        .otherwise({
           redirectTo: '/'
        });

     //$locationProvider.html5Mode(true);
  }]);
