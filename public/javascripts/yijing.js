(function ($) {

/* ============================= display content */

function explainGua (gua) {
    $('div.content section[name="guaci"]').show();
    $('div.content section[name="yaoci"]').hide();

    $('div.content section[name="guaci"] > p').html(gua.getGuaCi());
    $('div.content section[name="xiang"] > p').html(gua.getGuaDaXiang());

    $('div.content section[name="tuan"]').show();
    $('div.content section[name="tuan"] > p').html(gua.getGuaTuanCi());
};

function explainYao (gua, index) {

    $('div.content section[name="guaci"]').hide();
    $('div.content section[name="yaoci"]').show();

    $('div.content section[name="yaoci"] > p').html(gua.getYaoCi(index));
    $('div.content section[name="xiang"] > p').html(gua.getYaoXiaoXiang(index));
    $('div.content section[name="tuan"]').hide();
};

/* ============================= jCanvasScrpit extension */

function triangle (x1, x2, x3, color, id) {
    var x = jc.line([x1, x2, x3], color, 1);
    if (id) {
        x.id(id);
    }
    return x;
};

/* ============================= DS for Gua */

$.yijing.xianTian8Gua = ['111', '011', '101', '001', '110', '010', '100', '000'];

var gua = function (guaNameStr) {
    this.guaNameStr = guaNameStr;
    this.yaos = guaNameStr.split('').reverse();
    this.datas = $.yijing.datas[guaNameStr];
};

$.extend(gua, {
    prototype: {
        positions1 : { '0': '六', '1': '九'},
        positions2 : { '1': '初', '2': '二', '3':'三', '4':'四', '5':'五','6':'上'},
        hasDatas : function () { return this.datas; },
        getGuaName: function () { return this.datas.name; },
        getGuaCi: function () { return this.datas.guaci; },
        getGuaDaXiang: function () { return this.datas.xiang[0]; },
        getGuaTuanCi: function () { return this.datas.tuan; },
        getYaoName: function (index) {
            var that = this,
                yaoNameStr = that.yaos[index-1];
            if(index == '1' || index == '6') {
                return that.positions2[index] + that.positions1[yaoNameStr];
            } else {
                return that.positions1[yaoNameStr] + that.positions2[index] ;
            }
        },
        getYaoCi: function (index) { return this.datas['yaoci'][index-1]; },
        getYaoXiaoXiang: function (index) { return this.datas['xiang'][index]; }
    }
});

/* ============================= Gua Painter */

var guaPainter = function (opts) {
    
    var opts = opts || {};
    $.extend(this.opts, opts);
};

$.extend(guaPainter, {
    prototype: {
    opts : {
        yaoWeiDescOffset: 20,
        yaoOffsetX  : 70,
        interval : 10,  /* interval in Yin Yao */
        margin  : 10,   /* height margin between Yaos */
        width   : 160,
        height  : 30,
    },
    yangColor : 'rgba(255,0,0,0.8)',
    yinColor  : 'rgba(0,0,0,0.8)',
    yangColorLess : 'rgba(255,0,0,0.2)',
    yinColorLess : 'rgba(0,0,0,0.2)',
    
    init : function (opts) {
        var that = this;
        
    },

    drawPointer : function (x, y, color) {
        var that = this,
            opts = that.opts,
            x1 = x + opts.width + 10,
            y1 = y + 10;
    
        jc('#pointerPart1').del();
        jc('#pointerPart2').del();

        jc.rect(x1, y1, 20, 10, color, 1).id('pointerPart1');

        var x2 = x1 + 20;
        triangle([x2,y1-5], [x2,y1+15], [x2+20,y1+5], color, 'pointerPart2');
    },

    drawYaoName : function (name, x, y) {
        var that = this, opts = that.opts;
        jc.text(name, x - 60, y + opts.height - 10, 'rgba(0,0,0,1)')
          .font('20pt Tahoma');
    },

    opacityYaos : function (gua, opacity, notMe) {
        var notMe = notMe || -1;
        gua.yaos.map(function (x1, y1) {
                    var tmp = y1 + 1;
                    if (tmp !== notMe) {
                        jc('#yao'+tmp).opacity(opacity);
                    }
                    
                 });
    },

    drawYangYao : function (x, y, name, yaoNameStr) {
        var that = this, 
            opts = that.opts,
            color = color || that.yangColor;

        // that.drawYaoName(name, x, y);

        return jc.rect(x, y, opts.width, opts.height, color, 1);
    },

    drawYinYao : function (x, y, name, color) {
        var that = this,
            opts = that.opts,
            color = color || that.yinColor,
            a = (opts.width - opts.interval ) / 2;

        // that.drawYaoName(name, x, y);

        res = jc.rect(x, y, opts.width, opts.height, 'rgba(0,0,0,1)', 1);
        jc.rect(x + a , y, opts.interval, opts.height, 'rgba(255,255,255, 1)', 1);
        return res;
    },

    drawGua : function (gua, colors) {
        var that = this,
            opts = that.opts,
            start = 260,
            step = opts.height + opts.margin,
            drawer = { '1' : that.drawYangYao, 
                       '0' : that.drawYinYao };
        gua.yaos
            .map(function (x, i) {
                var index = i + 1;
                drawer[x].call(that, opts.yaoOffsetX, start - i * step, gua.getYaoName(index), colors[x])
                         .id('yao'+index)
                         .click(function () { 
                             explainYao(gua, index);
                             this.opacity(1);
                             that.opacityYaos(gua, 0.2, index);
                          });
            
        });
    },

    drawGuaName : function (gua) {
        var that = this;
        jc.text(gua.getGuaName(), 120, 40)
          .font('30pt Tahoma')
          .click(function () { 
                explainGua(gua);
                that.opacityYaos(gua, 1);
          });
        explainGua(gua);
    },

    /**
     *  @param gua The string representation of a Gua.
     *  @param colors for Yin Yao and Yang Yao
     *  @param one index indicate do not draw this Yao. Especially used when redraw.
     *
     */
    draw : function (gua, colors, notRedrawMe) {
        var that = this,
            opts = that.opts,
            colors  =  colors || { '1' : that.yangColor, 
                                   '0' : that.yinColor },
            data = $.yijing.datas[gua];

        jc.start('canvas_2', true);
        
        that.drawGuaName(gua);
        that.drawGua(gua, colors);

        jc.start('canvas_2');
    },

    /** 
     * Just show Yaos and Gua name
     */
    drawGuaSimple : function (guaNameStr, startX, startY) {
        var that = this,
            opts = that.opts,
            step = opts.height + opts.margin,
            yaos = guaNameStr.split('').reverse();
            drawer = { '1' : that.drawYangYao, 
                       '0' : that.drawYinYao },
            gua = new $.yijing.gua(guaNameStr);

        // FIXME: bettor to add click event to Gua but not Yao.
        //
        gua.yaos.map(function (x, i) {
                var index = i + 1,
                    target = drawer[x].call(that, startX, startY - i * step);
                   if (gua.hasDatas()) {
                        target.click(function () { 
                            $("#div1").slideToggle("slow");
                            $('#div2').slideToggle("slow");
                            // $.yijing.showGua(guaNameStr);
                            // that.drawGua(gua);
                        });
                   } else {
                        // maybe disable;
                        // that.opacityYaos(gua, 0.8);
                   }
            
        });
    }

}});

/* ============================= Extends to jQuery. */

$.yijing = $.yijing || {};
$.yijing.gua = gua;
$.yijing.guaPainter = guaPainter;

/* ============================= display */

function showGua(guaNameStr) {
    
    var gua = new $.yijing.gua(guaNameStr),
    guaDrawer = new $.yijing.guaPainter();
    if (gua.hasDatas()) {
        jc.canvas('canvas_2').clear();
        guaDrawer.draw(gua);
    } else {
        showResult();
    }
    
};

$.yijing.showGua = showGua;



})(jQuery)