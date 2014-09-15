var paper = Snap(800, 600);

// Creates circle at x = 50, y = 40, with radius 10
var circle = paper.circle(100, 100, 50);
circle.attr("fill", "#CC0000");
circle.attr("stroke", "#00DD00");

var textStyle1 = { "font-style": "italic"
                };

var startX = 200,
    startY = 150;

paper.text(210, 50, "Type designation")
   .attr({ "text-anchor":"start",
           "font-size": "20px"
         });



paper.text(startX, startY, "N");
paper.line(200,158, 210, 158);

paper.text(220, 150, "TE");
paper.line(222,158, 238, 158);
paper.line(241,145, 249, 145);
paper.text(250, 150, "8");
paper.line(250,158, 258, 158);
paper.rect(270, 140, 10, 12);
paper.line(270,158, 280, 158);
paper.rect(285, 140, 10, 12);
paper.line(285,158, 295, 158);

// === explanation
paper.path("M205,158V285H330");
paper.text(340, 285, "Explanation 1111")
     .attr(textStyle1);

paper.path("M230,158V265H330");
paper.text(340, 265, "Explanation 222")
     .attr(textStyle1);

paper.path("M254,158V235H330");
paper.text(340, 235, ["Explanation 333", "More for 333 3333333 777777", "Even More"])
     .attr(textStyle1);

paper.path("M275,158V205H330");
paper.text(340, 205, "Explanation 44444")
   .attr(textStyle1);

paper.path("M290,158V185H330");
paper.text(340, 185, "Explanation 555")
   .attr(textStyle1);
