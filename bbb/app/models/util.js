define([
   'backbone',
   'underscore',
   'models/m.yang',
   'models/m.yin'
],

function (Backbone, _, Yang, Yin) {
   return {
         /**
          * @param code {string} e.g. "000111"
          */
         gua : function (code) {
            var models = [];
            _.each(code,
                   function (c, i) {
                      models.push(c === "1" ? Yang({id:i}) : Yin({id:i}));
                   });
            return models;
         }};

});
