// Version 2
// Draw Gua in terms of HTML element but canvas.

;(function ($) {
   var guaS = '.gua',
       yaoS = guaS + ' > p';
   $(yaoS).click(function (e) {
      var that = $(e.target),
          yaos = that.parents(guaS).find('p');
      console.log(that);
      yaos.addClass('inactive');
      
   });

})(jQuery);
