(function ($) {

/* extends jquery */

if (! $.isFunction($.objKeys)) {
    /** 
     * Get a Object keys into a list
     */
    $.objKeys = function (obj) {
        var re = [];
        if (obj) {
            for(var x in obj ) { 
                if(obj.hasOwnProperty(x)) {
                    re.push(x);
                }
            }
        }
        return re;
    };

}
/* ============================= display content */

function explainGua (gua) {
    $('div.content section[name="guaci"]').show();
    $('div.content section[name="yaoci"]').hide();

    $('div.content section[name="guaci"] > p:first').html(gua.getGuaCi());
    $('div.content section[name="xiang"] > p:first').html(gua.getGuaDaXiang());

    if (gua.isYiGates()) {
        $('div.content section[name="guaci"] > p.special').html(gua.getYaoCi(7));
        $('div.content section[name="xiang"] > p.special').html(gua.getYaoXiaoXiang(7));
    }

    $('div.content section[name="tuan"]').show();
    $('div.content section[name="tuan"] > p:first').html(gua.getGuaTuanCi());
    $('#explaination').show();
};

function explainYao (gua, index) {

    $('div.content section[name="guaci"]').hide();
    $('div.content section[name="yaoci"]').show();

    $('div.content section[name="yaoci"] > p:first').html(gua.getYaoCi(index));
    $('div.content section[name="xiang"] > p:first').html(gua.getYaoXiaoXiang(index));
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
        getYaoXiaoXiang: function (index) { return this.datas['xiang'][index]; },
        isYiGates: function () { return this.guaNameStr === "111111" || this.guaNameStr === "000000"; }
    }
});

/* ============================= Gua Painter */

var guaPainter = function (opts) {
    
    this.opts = opts || {
        yaoWeiDescOffset: 20,
        yaoOffsetX  : 70,
        interval : 10,  /* interval in Yin Yao */
        margin  : 10,   /* height margin between Yaos */
        width   : 160,
        height  : 30,
    };
};

$.extend(guaPainter, {
    prototype: {

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
        var notMe = notMe || [-1];
        gua.yaos.map(function (x1, y1) {
                    var tmp = y1 + 1;
                    if (notMe.indexOf(tmp) < 0) {
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
                             that.opacityYaos(gua, 0.2, [index]);
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
            gua = new $.yijing.gua(guaNameStr),
            mouseoverH = (function (g) { return function () {
                    if (g.hasDatas()) {
                        this.color('rgba(240,240,240,0.5)');
                    }
            }; })(gua),
            mouseoutH = (function (g) { return function () {
                    if (g.hasDatas()) {
                        this.color('rgba(0,0,0,0)');
                    }
            }; })(gua),
            clickH = (function (g) { return function () {
                    window.location = '/gua?guakey=' + g; 
                    // $("#divMap").slideToggle("slow", function () {
                    //     $('#divGuaDetail').show();
                    //     $.yijing.showGua(g);
                    // });
            }; })(guaNameStr);

        gua.yaos.map(function (x, i) {
                var index = i + 1,
                    target = drawer[x].call(that, startX, startY - i * step);
        });
        
        jc.rect(startX, startY - 5 * step, opts.width, opts.height + 5 * step, 'rgba(0,0,0,0)', 1)
                 .click(clickH)
                 .mouseover(mouseoverH)
                 .mouseout(mouseoutH);

        if (gua.hasDatas()) {
            var x = opts.width / 2 - 5 * (gua.getGuaName().length);
            jc.text(gua.getGuaName(), startX + x, startY - 5 * step - 2 ).font('11px Tahoma')   
        }
    }

}});

/* ============================= Extends to jQuery. */

$.yijing = $.yijing || {};
$.yijing.gua = gua;
$.yijing.guaPainter = guaPainter;

/* ============================= display */

function showGua(guaNameStr) {

    while (guaNameStr && guaNameStr.length < 6) {
        guaNameStr = '0' + guaNameStr;
    };

    if ($.yijing.global.currentGua === guaNameStr) { 
        return; 
    }

    var gua = new $.yijing.gua(guaNameStr);
    if (gua.hasDatas()) {
        $.yijing.global.currentGua = guaNameStr;
        guaDrawer = new $.yijing.guaPainter();
        jc.canvas('canvas_2').clear();
        guaDrawer.draw(gua);
    } else {
        console.log('no gua info found: ' + guaNameStr);
    }
    
};

$.yijing.global = $.yijing.global || {};
$.yijing.showGua = showGua;


})(jQuery)
