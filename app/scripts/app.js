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
        .when('/gua/:name', {
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


  }])

   .run(['$rootScope', '$anchorScroll', '$location', '$route', '$document', function ($rootScope, $anchorScroll, $location, $route, $document) {
      $rootScope.loading = true;
      var navs = $rootScope.navs =[ { title: '易經上', url: '#/doc/yijing/1' },
                         { title: '易經下', url: '#/doc/yijing/2' },
                         { title: '彖傳上', url: '#/doc/tuan/1' },
                         { title: '彖傳下', url: '#/doc/tuan/2' },
                         { title: '象傳上', url: '#/doc/xiang/1' },
                         { title: '象傳下', url: '#/doc/xiang/2' },
                         { title: '系辭上', url: '#/static/xici-1' },
                         { title: '系辭下', url: '#/static/xici-2' },
                         { title: '文言傳', url: '#/static/wen-yan' },
                         { title: '說卦傳', url: '#/static/shuo-gua' },
                         { title: '序卦傳', url: '#/static/xu-gua' },
                         { title: '雜卦傳', url: '#/static/za-gua' }
                       ];
      var doc = $document[0],
          title = doc.title,
          getPageSubTitle = function () {
             var url = decodeURI($location.url()),
                 route = $route.current,
                 t = '';
             if (route.$$route.originalPath === '/gua/:name') {
                t = route.params.name + '卦';
             } else {
                angular.forEach(navs, function (value, k) {
                   if (value.url === '#' + url) {
                      t = value.title;
                   }
                });
             }

             return t;
          },
          updatePageTitle = function () {
             var name = getPageSubTitle();
             doc.title = title + (!!name ? ' - ' + name : '');
          };
      $rootScope.$on('$routeChangeSuccess', function(events, newRoute) {
         //var url = decodeURI($location.url());
         //console.log($route.current);
         //console.log(url);

         updatePageTitle();
         $rootScope.loading = false;
         $anchorScroll();
      });
   }]);
;
