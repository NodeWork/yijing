define(
[
   'jquery',
   'backbone',
   'underscore',
   'routers'
],

function ($, Bacbbone, _, Router) {
   var router = new Router({routers: {}});
   //TODO: set {pushState:true} doesnt work.
   Backbone.history.start();
});

