;(function($) {
    var tour = new Tour({
        backdrop: true,
        storage: false,
        onShow: function () {
            $(this.element).click()
        },
        onEnd: function (tour) {
            $('#zhu-gua .gua > label').click()
        },

        template: "<div class='popover tour'>" +
            "<div class='arrow'></div>" +
            "<h3 class='popover-title'></h3>" +
            "<div class='popover-content'></div>" +
            "<div class='popover-navigation'>" +
            "  <div class='btn-group'>" +
            "    <button class='btn btn-sm btn-default' data-role='prev'>« 上一步</button>" +
            "    <button class='btn btn-sm btn-default' data-role='next'>下一步 »</button>" +
            "  </div>" +
            "  <button class='btn btn-sm btn-default' data-role='end'>结束</button>" +
            "</div>",
        steps: [

            {
                element: "#zhu-gua .gua span:eq(5)",
                title: "初爻",
                content: "点击查看爻辞"
            },
            {
                element: "#zhu-gua .gua span:eq(4)",
                title: "第二爻",
                content: "点击查看爻辞"
            },
            {
                element: "#zhu-gua .gua span:eq(3)",
                title: "第三爻",
                content: "点击查看爻辞"
            },
            {
                element: "#zhu-gua .gua span:eq(2)",
                title: "第四爻",
                content: "点击查看爻辞"
            },
            {
                element: "#zhu-gua .gua span:eq(1)",
                title: "第五爻",
                content: "点击查看爻辞"
            },
            {
                element: "#zhu-gua .gua span:eq(0)",
                title: "第六爻",
                content: "点击查看爻辞"
            },
            {
                element: "#zhu-gua .gua > label",
                title: "卦辞",
                content: "点击查看卦辞"
            }
        ]});

    $('.help-tour').click(function () {
        tour.init();
        tour.start();
    })

})(jQuery);
