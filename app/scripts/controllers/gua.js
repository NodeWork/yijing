'use strict';

angular.module('yijingAngularApp')
   .controller('GuaCtrl',['$scope', '$routeParams', function ($scope, $routeParams) {
      $scope.keyParam = $routeParams.key;
  }]);
