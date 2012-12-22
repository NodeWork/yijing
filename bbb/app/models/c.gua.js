define([
   'backbone',
   'underscore',
   'models/m.yao',
   'models/m.yang',
   'models/m.yin'
],

function (Backbone, _, Yao, Yang, Yin) {
   var Gua = Backbone.Collection.extend(
      {
         model: Yao,

         /**
          * @param code {string} e.g. "000111"
          */
         init : function (code) {
            var models = _.map(code,
                               function (c) {
                                 return c === Yang.get("code") ? Yang : Yin;
                               });
            this.reset(models);
            return this;
         }

      });
   return Gua;
});
