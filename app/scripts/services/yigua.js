(function (WIN, angular) {
   'use strict';

   var yijing = WIN.yijing; // @see data/*.js

   function getGuaData (key) {
      return yijing.datas[key] || {};
   }

   angular.module('yijingAngularApp')
      .service('guaService', function Yigua() {
         // AngularJS will instantiate a singleton by calling "new" on this function

         this.guaData = getGuaData;
      });

})(window, angular);
