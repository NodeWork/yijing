define([
   'backbone',
   'models/m.yao'
],

function (Backbone, Yao) {
   var defaults =
      {
         name: 'YANG YAO',
         code: "1",
         clazz: 'yang',
         isYangYao : true
      };

   var createYang = function (options) {
      options || (options = {});
      return new Yao(_.extend(defaults, options));
   };

   return createYang;
});
