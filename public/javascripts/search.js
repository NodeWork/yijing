(function ($) {

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

      
      function searchByName (name) {
          var ds = $.yijing.datas;
          for  ( var x in ds) { 
              if (ds[x].name === name) {
                  return x;
              }
          }
          return "";
      };

      function showgua (v) {
          if (/^[01]+$/g.test(v)) {
              $.yijing.showGua(""+v);
          } else {
              $.yijing.showGua(searchByName(v));
          }
      };
        
      if ($('input[name="defaultGua"]').length && $('input[name="defaultGua"]').val()) {
          showgua($('input[name="defaultGua"]').val());
      }

})(jQuery);
