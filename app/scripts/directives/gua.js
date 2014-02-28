(function (angular) {
   'use strict';

   angular.module('yijing')
      .directive('gua', ['guaService', function (guaService) {
         return {
            replace: true,
            restrict:'E',
            scope: { guaKey: '=', guaSize: '=' },
            link: function(scope, element, attrs) {
               scope.guaSize = attrs.guaSize;

               // FIXME:
               // 1. any smarter way to do active/inactive style?
               // 2. the `items` array and yao data array are just reverse seq..wired!??
               // 3. error out when key in not one of 64
               // 4. disable click on each yao but just whole gua
               // 5. animation for transform
               //

               var _doLink = function (guaKey) {
                  var key = guaKey,
                      xs = key ? key.split('') : [];
                  // FIXME: duplicated function (generate Yang/Yin Yaos)
                  scope.items = xs.map(function (x) {
                     return { v: parseInt(x, 10),
                              clazz: [(parseInt(x,10) === 1 ? 'yang' : 'yin')]
                            };
                  });
                  var data = guaService.guaData(key);
                  //scope.guaData = data;
                  scope.showGuaInfo = true;
                  scope.vo = { name: data.name,
                               guaCi: data.guaci,
                               daXiang: data.daxiang, // Da Xiang
                               tuanCi: data.tuan,     // Tuan
                               yaoCi: '',        // Yao Ci
                               xiaoXiang : ''     // Xiao Xiang
                             };

                  scope.yaoClick = function (k) {
                     scope.vo.yaoCi = data.yaoci[k];
                     scope.vo.xiaoXiang = data.xiang[k];
                     scope.showGuaInfo = false;
                     angular.forEach(scope.items, function (v, i) {
                        if (v.clazz.length > 1) {
                           v.clazz.pop();
                        }
                        var a = (i+k===5) ? 'active' : 'inactive';
                        v.clazz.push(a);
                     });
                  };

                  scope.guaClick = function () {
                     scope.showGuaInfo = true;
                     angular.forEach(scope.items, function (v) {
                        if (v.clazz.length > 1) {
                           v.clazz.pop();
                        }
                     });

                  };
               };

               scope.$watch('guaKey', function (newValue, oldValue) {
                  _doLink(newValue);
               });
            },

            templateUrl: 'gua.html'
         };

      }])

   /**
    * Gua in a simple format, which only show its name and Yaos
    */
      .directive('guaSimple', ['guaService', function (guaService) {
         return {
            replace: true,
            restrict:'E',
            scope: { guaKey: '=', guaSize: '=' },
            link: function(scope, element, attrs){
               scope.guaSize = attrs.guaSize;

               var _doLink = function (guaKey) {
                  var key = guaKey,
                      xs = key ? key.split('') : [];
                  // FIXME: duplicated function (generate Yang/Yin Yaos)
                  scope.items = xs.map(function (x) {
                     return { v: parseInt(x, 10),
                              clazz: [(parseInt(x,10) === 1 ? 'yang' : 'yin')]
                            };
                  });
                  var data = guaService.guaData(key);
                  scope.vo = { name: data.name,
                               urlPath: '#gua/' + data.name //FIXME: move 'gua' as a constant
                             };

               };

               scope.$watch('guaKey', function (newValue, oldValue) {
                  _doLink(newValue);
               });
            },

            templateUrl: 'gua-simple.html'
         };

      }])
   ;

})(angular);