'use strict';

angular.module('yijing')
   .controller('NavCtrl',
               [         '$scope', '$routeParams',
                function ($scope, $routeParams) {
      $scope.navClick = function () {
         //console.log(this);
      };
  }]);
