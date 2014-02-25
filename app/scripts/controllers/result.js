'use strict';

angular.module('yijing')
   .controller('ResultCtrl',['$scope', '$routeParams', function ($scope, $routeParams) {
      $scope.keyParam = $routeParams.key;
      console.log($scope.keyParam);
  }]);
