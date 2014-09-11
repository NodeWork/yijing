var paper = Raphael(10, 10, 1024, 768);

// ====================================== 8 Gua

var circle = paper.circle(700, 150, 110);
paper.text(700, 20, "二");
paper.text(700, 280, "三");
paper.text(830, 150, "四");
paper.text(570, 150, "五");
paper.text(600, 70, "六").attr({'transform': 'r-50'});
paper.text(600, 230, "七").attr({'transform': 'r-130'});
paper.text(800, 70, "八").attr({'transform': 'r50'});
paper.text(800, 230, "九").attr({'transform': 'r130'});

_yao(1);
_yao(0);

function _yao(key) {
    if (key == 1) {
        paper.rect(100, 300, 105, 20).attr({"fill": "#FF0000", "stroke": "#FFF"});
    } else {
        paper.rect(100, 330, 50, 20).attr({"fill": "#000000", "stroke": "#FFF"});
        paper.rect(155, 330, 50, 20).attr({"fill": "#000000", "stroke": "#FFF"});
    }
}
// ======================================= Type designation

var textStyle1 = { "text-anchor":"start",
                  "font-style": "italic"
                },
    textStyle2 = { "text-anchor":"start",
                   "font-size": "13px"
                 };

var startX = 210,
    startY = 120;
paper.text(startX, startY, "Type designation")
   .attr({ "text-anchor":"start",
           "font-size": "20px"
         });


paper.text(startX, startY+30, "N").attr(textStyle2);
paper.path("M210,158H218");
paper.text(220, 150, "TE").attr(textStyle2);
paper.path("M222,158H236");
paper.path("M240,150H250");
paper.text(255, 150, "8").attr(textStyle2);
paper.path("M255,158H262");
paper.rect(268, 145, 8, 10);
paper.path("M267,158H277");
paper.rect(283, 145, 8, 10);
paper.path("M282,158H292");

paper.path("M214,158V285H330");
paper.text(340, 285, "Explanation 1111")
     .attr(textStyle1);

paper.path("M230,158V265H330");
paper.text(340, 265, "Explanation 222")
     .attr(textStyle1);

paper.path("M258,158V235H330");
paper.text(340, 235, "Explanation 333\nMore for 333 3333333 777777\nEven More")
     .attr(textStyle1);

paper.path("M272,158V205H330");
paper.text(340, 205, "Explanation 44444")
   .attr(textStyle1);

paper.path("M285,158V185H330");
paper.text(340, 185, "Explanation 555")
   .attr(textStyle1);
