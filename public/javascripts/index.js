(function ($) {

      $('#show64Map').click(function () {
          $("#divMap").slideToggle("slow");
          $('#divGuaDetail').slideToggle(); 
      });

      function drawMap (mapId) {
        var rectX = 200,
            rectY = 100,
            rectW = 400,
            guaDrawer = new $.yijing.guaPainter({
                width: 30,
                height: 3,
                interval: 3,
                margin: 2
            }),
            startX = rectX + rectW - 60,
            startY = rectY + rectW - 20,
            stepX = 45,
            stepY = 45;

        jc.start(mapId, true);
        jc.circle(400,300,300);
        jc.rect(rectX, rectY, rectW, rectW);

        var i = 0,
            gua8 = $.yijing.xianTian8Gua.map(function (o) { return o.key; }),
            length = gua8.length;
        for (;i < length; i++) {
          for (var j=0; j < length; j++) {
            guaDrawer.drawGuaSimple(gua8[j]+gua8[i], startX - stepX * j, startY - stepY * i);
          }
        }
        
        jc.start();
      };

      if ($('#canvas_1').length) {
        drawMap('canvas_1');
      }
       
})(jQuery);
