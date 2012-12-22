
define(
[
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

   var YangYao = Yao.extend({defaults: defaults});

   return YangYao;
});
