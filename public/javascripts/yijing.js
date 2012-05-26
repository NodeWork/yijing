(function ($) {

var positions1 = { '0': '六', '1': '九'},
    positions2 = { '1': '初', '2': '二', '3':'三', '4':'四', '5':'五','6':'上'};

function describeGua (data) {
    $('div.content section[name="guaci"]').show();
    $('div.content section[name="yaoci"]').hide();

    $('div.content section[name="guaci"] > p').html(data.guaci);
    $('div.content section[name="xiang"] > p').html(data.xiang);

    $('div.content section[name="tuan"]').show();
    $('div.content section[name="tuan"] > p').html(data.tuan);
};

function describeYao (data, index) {

    $('div.content section[name="guaci"]').hide();
    $('div.content section[name="yaoci"]').show();

    $('div.content section[name="yaoci"] > p').html(data['yao'+index]);
    $('div.content section[name="xiang"] > p').html(data['yao'+index+'-xiang']);
    $('div.content section[name="tuan"]').hide();
};

function getName (key1, key2) {
    if(key2 == '1' || key2 == '6') {
        return positions2[key2] + positions1[key1];
    } else {
        return positions1[key1] + positions2[key2] ;
    }
};

function triangle (x1, x2, x3, color) {
    jc('#pointerPart2').del();
    return jc.line([x1, x2, x3], color, 1)
           .id('pointerPart2');;
};


$.gua = {
    positionOffsetX: 20,
    offsetX  : 70,
    interval : 10,  /* interval in Yin Yao */
    margin  : 10,   /* height margin between Yaos */
    width   : 160,
    height  : 30,
    yangColor : 'rgba(255,0,0,0.8)',
    yinColor  : 'rgba(0,0,0,0.8)',
    
    drawPointer : function (x, y, color) {
        var that = this,
            x1 = x + that.width + 10,
            y1 = y + 10;
    
        jc('#pointerPart1').del();

        jc.rect(x1, y1, 20, 10, color, 1).id('pointerPart1');

        var x2 = x1 + 20;
        triangle([x2,y1-5], [x2,y1+15], [x2+20,y1+5], color);
    },

    drawName : function (name, x, y) {
        var that = this;
        jc.text(name, x - 60, y + that.height - 10)
          .font('20pt Tahoma');
    },

    drawYangYao : function (x, y, name) {
        var that = this;

        that.drawName(name, x, y);

        return jc.rect(x, y, that.width, that.height, that.yangColor, 1);
    },

    drawYinYao : function (x, y, name) {
        var that = this
          , a = (that.width - that.interval ) / 2;

        that.drawName(name, x, y);

        jc.rect(x, y, a, that.height, that.yinColor,1);
        jc.rect(x + a + that.interval, y, a, that.height, that.yinColor ,1);
        return jc.rect(x, y, that.width, that.height, 'rgba(255,255,255, 0)', 1);
    },

    draw : function (gua) {
        var that = this,
            xs = gua.split(''),
            start = 260,
            step = that.height + that.margin,
            yinyang = { '1' : that.drawYangYao, 
                        '0' : that.drawYinYao },
            colors  = { '1' : that.yangColor, 
                        '0' : that.yinColor },
            data = $.yidata[gua];

        jc.start('canvas_1', true);

        jc.text(data.name, 120, 40)
          .font('30pt Tahoma')
          .click(function () { 
                describeGua(data);
                jc('#pointerPart1').del(); 
                jc('#pointerPart2').del(); 
          });
        
        describeGua(data);

        xs.reverse().map(function (x, i) {
            var index = i + 1;
            yinyang[x].call(that, that.offsetX, start - i * step, getName(x, index))
                      .click(function () { 
                                 describeYao(data, index);
                                 that.drawPointer(that.offsetX, start - i * step, colors[x]);
                             });
            
        });
        
        jc.start('canvas_1');
    }

};

var taiGua = '000111';
$.gua.draw(taiGua);

})(jQuery)