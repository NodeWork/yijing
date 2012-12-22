define(
[
   'jquery',
   'backbone',
   'underscore',
   'views/v.showcase'
],

function ($, Bacbbone, _, Showcase) {


   var Router = Backbone.Router.extend(
      {
         routes: {
                  "" : "index",
                 "index" : "index",
                  "showcase" : "showcase",
                  "*filter" : "filter"
                 },

         initialize : function (options) {
            console.log("router initialize. Options: %s", JSON.stringify(options));
         },

         index : function () {
            console.log("Router: index fn ");
            //!!this.appview || (this.appview = new ItemListView());
            //this.appview.render();
         },

         showcase : function () {
            console.log("Router: showcase fn");
            var view = new Showcase();
            view.render();
            $('#main').html(view.el);
         },

         filter : function (param) {
            console.log("Router: filter %s", param);
         }

      });

   return Router;

});
