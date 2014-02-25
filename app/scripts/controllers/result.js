'use strict';

angular.module('yijing')
   .controller('ResultCtrl',['$scope', '$routeParams', function ($scope, $routeParams) {
      $scope.keyParam = $routeParams.key;

      // show Gua info when input complete
      $scope.checkInputComplete = function () {
         var xs = [6,7,8,9,8,6],
             ys = xs.map(function (x) { return x % 2; });
         ys.reverse();
         $scope.keyParam = ys.join('');
      };
  }]);
