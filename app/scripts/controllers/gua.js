(function (angular) {
   'use strict';

   function normalizeInput (key, list) {
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

         $scope.baseKey = normalizeInput($routeParams.key);

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
