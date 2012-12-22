/**
 * View for GUA.
 */

define(
[
   'jquery',
   'backbone',
   'underscore',
   'models/c.gua',
   'views/v.yang',
   'views/v.yin',
   'mustache',
   'text!templates/yang.mustache'
],

function ($, Backbone, _, Gua, YangView, YinView, Mustache, template) {

   var GuaView = Backbone.View.extend(
      {
         tagName: 'section',

         initialize : function () {
            _.bindAll(this, 'render', 'renderYao');
            // TODO: create view for each yao seems wasting
            this.collViews = _(this.collection.models).map(this.createYaoView);
         },

         render : function render () {
            _(this.collViews).each(this.renderYao);
            return this;
         },

         createYaoView : function (model) {
            return model.get("isYangYao")
                   ? new YangView({model: model})
                   : new YinView({model: model});
         },

         renderYao : function (yaoView) {
            yaoView.render();
            $(this.el).append(yaoView.el);
            return this;
         }


   });

   return GuaView;

});
