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
   'models/c.gua'

],

function ($, Backbone, _, YangModel, YangView, YinModel, YinView,
         GuaView, guaCollection) {

   var ItemView = Backbone.View.extend(
      {
         className: 'showcase',

         initialize : function initialize () {
            _.bindAll(this, 'render');

            this.yangView = new YangView({model: new YangModel()});
            this.yinView = new YinView({model: new YinModel()});
            var code = "000111";;
            this.guaView = new GuaView({collection: guaCollection.init(code)});

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
