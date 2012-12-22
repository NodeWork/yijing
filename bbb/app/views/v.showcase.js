define(
[
   'jquery',
   'backbone',
   'underscore',
   'models/m.yang',
   'views/v.yang',
   'models/m.yin',
   'views/v.yin',
   'views/v.gua',
   'models/c.gua',
   'models/util'

],

function ($, Backbone, _, YangModel, YangView, YinModel, YinView,
         GuaView, guaCollection, ModelUtil) {

   var ItemView = Backbone.View.extend(
      {
         initialize : function initialize () {
            _.bindAll(this, 'render');

            this.yangView = new YangView({model: YangModel()});
            this.yinView = new YinView({model: YinModel()});
            var gua = ModelUtil.gua("000111");
            this.guaView = new GuaView({collection: new guaCollection(gua)});

         },

         render : function render () {
            var that = this;
            _([this.yangView, this.yinView, this.guaView])
            .each(function (v) {
                     v.render();
                     $(that.el).append(v.el);
                  });

            return this;
         }

   });

   return ItemView;

});
