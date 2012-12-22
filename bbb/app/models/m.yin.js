define(
[
   'backbone',
   'models/m.yao'
],

function (Backbone, Yao) {
   var defaults =
      {
         name: 'YIN YAO',
         code: "0",
         clazz: 'yin'
      };

   var YinYao = Yao.extend({defaults: defaults});

   return YinYao;
});
