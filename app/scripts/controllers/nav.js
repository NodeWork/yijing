'use strict';

angular.module('yijing')
   .controller('NavCtrl', [ '$scope', '$routeParams', '$window', function ($scope, $routeParams, $window) {
      $scope.items = [ { title: '易經上', url: '#/doc/yijing/1' },
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
      //var siteTitle = $window.document.title;

      $scope.navClick = function (that) {
         //console.log(that);
         //var append = !!name ? (' - ' + name) : '';
         //$window.document.title = siteTitle + append;
         //this.attr('class', 'active');
      };
  }]);
