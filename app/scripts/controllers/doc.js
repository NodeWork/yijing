(function (angular) {
   'use strict';

   function fetchValueOnType (type, datas) {
      if (type === 'yijing') {
         return [].concat(datas.guaci).concat(datas.yaoci);
      } else if (type === 'xiang') {
         return [].concat(datas.daxiang).concat(datas.xiang);
      } else {
         return [].concat(datas[type]);
      }
   }

   function fetchData (datas, guas, type) {
      var xs = guas.map(function (guaName) {
         return {name: guaName, values: fetchValueOnType(type, datas[guaName])};
      });
      return xs;
   }

   angular.module('yijing')
      .controller('DocCtrl',['$scope', '$routeParams', 'guaService', function ($scope, $routeParams, guaService) {
         var type = $routeParams.type,
             index = $routeParams.index || 1;

         $scope.start = (index - 1) * 30 + 1;
         $scope.docs = fetchData(guaService.namedData, guaService.jings[index-1], type);
         $scope.guaUrl = function (n) { return '#gua/'+n; };
      }])
      ;
})(angular);
