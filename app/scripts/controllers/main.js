'use strict';

angular.module('yijing')
  .controller('MainCtrl', ['$scope', 'guaService', function ($scope, guaService) {

     $scope.itemss = guaService.getSixFourGuas();
     console.log($scope.itemss);

  }]);
