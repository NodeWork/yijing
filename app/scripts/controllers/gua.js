(function (angular) {
   'use strict';

   /**
    * @param key {string} either Gua name.
    * @param datas {object} which key is gua name;
    */
   function normalizeInput (key, datas) {
      return parseInt(key) >= 0 ? key : datas[key].key;
   }

   /**
    * Allow use 6,7,8,9 as key value
    */
   function normalizeKey (key, list) {
      var xs = key.split(''),
          ys = xs.map(function (x) { return x % 2; });
      if (!list) {
         return ys.join('');
      } else {
         return ys;
      }
   }

   angular.module('yijing')
      .controller('GuaCtrl',['$scope', '$routeParams', 'guaService', function ($scope, $routeParams, guaService) {

         $scope.$watch('baseKey', function (newV, oldV) {
            var obj = guaService.transform(newV);
            $scope.guas = { base: obj.base,
                            xs: [obj.zong, obj.cuo, obj.jiao]
                          };
         });

         var k = normalizeInput($routeParams.name, guaService.namedData);
         $scope.baseKey = normalizeKey(k);

         // show Gua info when input complete
         $scope.checkInputComplete = function () {
            var xs = [6,7,8,9,8,6],
                ys = normalizeInput(xs, true);
            var el = angular.element(this);
            ys.reverse();
            $scope.baseKey = ys.join('');
         };
      }]);

})(angular);
