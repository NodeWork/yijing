define(
[
   'jquery',
   'backbone',
   'underscore',
   'mustache',
   'text!templates/yang.mustache'
],

function ($, Backbone, _, Mustache, template) {

   var ItemView = Backbone.View.extend(
      {
         tagName: 'label',

         initialize : function () {
            _.bindAll(this, 'render', 'unrender');
         },

         render : function render () {
            $(this.el).html(Mustache.to_html(template, this.model.toTemplateData()));
            return this;
         },

         unrender : function unrender () {
            $(this.el).remove();
         }

   });

   return ItemView;

});
