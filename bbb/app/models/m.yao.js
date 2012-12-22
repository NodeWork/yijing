define([
   'backbone'
],

function (Backbone) {
   var Yao = Backbone.Model.extend(
      {
         isYangYao : function (c) { return c === "1"; },

         toTemplateData : function () {
            return {
               clazz: this.get('clazz')
            };
         }

      });
   return Yao;
});
