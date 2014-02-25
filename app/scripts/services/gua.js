(function (WIN, angular) {
   'use strict';

   var yijing = WIN.yijing; // @see data/*.js

   function getGuaData (key) {
      return yijing.datas[key] || {};
   }

   /**
    * 64 Gua
    */
    function getSixFourGuas () {
       /* Generate 64 Guas base on XianTian-8-Gua */
       var gua8 = yijing.xianTian8Gua.map(function (o) { return o.key; }),
           length = gua8.length-1,
           i = length,
           k,
           key,
           o,
           xs = [];
       for (;i >= 0; i--) {
          for (var j=length; j >= 0; j--) {
             k = length - i;
             if (!xs[k]) {
                xs[k] = [];
             }
             key = gua8[j] + gua8[i];
             o = getGuaData(key);
             xs[k].push({key:key, name: o.name});
          }
       }

      return xs;
   }


   function zongGua (key) {
      var xs = key.split('');
      xs.reverse();
      return xs.join('');
   }

   function cuoGua (key) {
      var xs = [];
      angular.forEach(key.split(''), function (v) {
         xs.push(v === '1' ? '0' : '1');
      });
      return xs.join('');
   }

   function jiaoGua (key) {
      var xs = key.split(''),
          ys = xs.slice(0, 3),
          zs = xs.slice(3, 6);
      return zs.concat(ys).join('');
   }

   function transform (key) {
      return { base : key,
               zong : zongGua(key),
               cuo  : cuoGua(key),
               jiao : jiaoGua(key)
             };
   }

   angular.module('yijing')
      .service('guaService', function Yigua() {
         // AngularJS will instantiate a singleton by calling "new" on this function

         this.guaData = getGuaData;
         this.getSixFourGuas = getSixFourGuas;
         this.transform = transform;
      });

})(window, angular);
