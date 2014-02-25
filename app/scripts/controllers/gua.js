'use strict';

angular.module('yijing')
   .controller('GuaCtrl',['$scope', '$routeParams', function ($scope, $routeParams) {
      $scope.keyParam = $routeParams.key;
  }]);
