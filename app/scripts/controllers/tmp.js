'use strict';

angular.module('yijing')
   .controller('TmpCtrl',['$scope', '$routeParams', function ($scope, $routeParams) {
      $scope.keyParam = $routeParams.key;
   }]);
