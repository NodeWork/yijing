$(function () {

      $('#show64Map').click(function () {
          $("#div1").slideToggle("slow");
          $('#div2').slideToggle(); 
      });

      //
      $('#zonggua').click(function () {
          var cur = $.yijing.global.currentGua;
          if (cur) {
              $.yijing.showGua(cur.split('').reverse().join(''));
          }
      });

      $('#cuogua').click(function () {
          var cur = $.yijing.global.currentGua;
          if (cur) {
              var a = parseInt(cur, 2) ^ 63; // 63 is '111111' in binary.
              $.yijing.showGua(a.toString(2));
          }
      });
    
      $('#jiaogua').click(function () {
          var cur = $.yijing.global.currentGua;
          if (cur) {
              var a = cur.substr(3, 3) + cur.substr(0, 3);
              $.yijing.showGua(a);
          }
      });

      function drawMap () {
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

        jc.start('canvas_1', true);
        jc.circle(400,300,300);
        jc.rect(rectX, rectY, rectW, rectW);

        var i = 0,
            gua8 = $.yijing.xianTian8Gua.map(function (o) { return o.key; }),
            length = gua8.length;
        for (;i < length; i++) {
          for (var j=0; j < length; j++) {
            //console.log(gua8[j]+gua8[i])
            guaDrawer.drawGuaSimple(gua8[j]+gua8[i], startX - stepX * j, startY - stepY * i);
          }
        }
        
        jc.start();
      };

      function addSearchHandler () {
        function showResult (val) {
            var val = val || "Not Found";
            $('#searchResult').html(val);
        }
        function searchByName (name) {
            var ds = $.yijing.datas;
            for  ( var x in ds) { 
                if (ds[x].name === name) {
                    return x;
                }
            }
            return "";
        }

        $('#searchGua').click(function () {
            showResult(" ");
            var v = $('#searchContent').val();
            if (/^[01]+$/g.test(v)) {
                $.yijing.showGua(""+v);
            } else {
                $.yijing.showGua(searchByName(v));
            }
        });
      }

      drawMap();
      addSearchHandler();
        
   });