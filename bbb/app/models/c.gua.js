define([
   'backbone',
   'underscore',
   'sixfour',
   'models/m.yao',
   'models/m.yang',
   'models/m.yin'
],

function (Backbone, _, SF, Yao, Yang, Yin) {

   var Gua = Backbone.Collection.extend(
      {
         model: Yao
      });

   var createYao =
          function (xs) {
             var index = xs[0], code = xs[1];
             return Yao.prototype.isYangYao(code)
                    ? new Yang({id: index})
                    : new Yin({id: index});
          };

   return {
         /**
          * @param code {string} e.g. "000111"
          */
         init : function (code) {
            if (!code) {
               throw Error("Code is required when create Gua.");
            }

            var data = SF[code];
            console.log("data is: ", data);

            var xs = code.split(""),
                ys = _.range(0, xs.length).reverse(),
                zs = _.zip(ys, xs),
                models = _.map(zs, createYao);
            return new Gua(models);
         }

      };
});
