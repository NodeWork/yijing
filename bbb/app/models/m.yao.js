define([
   'backbone'
],

function (Backbone) {
   var Yao = Backbone.Model.extend(
      {
         defaults: {
            //name: 'YIN YAO',
            //code: 0,
            //clazz: 'yin'
         },

         toTemplateData : function () {
            return {
               clazz: this.get('clazz')
            };
         }

      });
   return Yao;
});
