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
         initWithCode : function (code) {
            var models = _.map(code,
                               function (c) {
                                 return c === Yang.get("code") ? Yang : Yin;
                               });
            this.add(models);
            return this;
         }

      });
   return new Gua();
});
