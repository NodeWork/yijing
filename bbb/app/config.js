// Set the require.js configuration for your application.
require.config(
   {
      deps: ["main"],
      paths: {
         jquery: "../assets/js/libs/jquery-1.8.2",
         underscore: "../assets/js/libs/underscore",
         backbone: "../assets/js/libs/backbone",
         mustache: "../assets/js/libs/mustache",
         text: "../assets/js/libs/text",
         sixfour: "../assets/js/six-four.data",
         eight: "../assets/js/eight.data"
      },
      shim: {
         backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
         }
         // Backbone.LayoutManager depends on Backbone.
         //"plugins/backbone.layoutmanager": ["backbone"]
      }

   }
);
