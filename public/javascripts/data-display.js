;(function ($, yiData) {

   var shangJing = ["乾", "坤", "屯", "蒙", "需", "讼", "师", "比", "小畜", "履", "泰", "否", "同人", "大有", "谦", "豫", "随", "蛊", "临", "观", "噬嗑", "贲", "剥", "复", "无妄", "大畜", "颐", "大过", "坎", "离"],
       xiaJing = ["咸", "恒","遯", "大壮", "晋", "明夷", "家人", "睽", "蹇", "解", "损", "益", "夬", "姤", "萃", "升", "困", "井", "革", "鼎", "震", "艮", "渐", "归妹", "丰", "旅", "巽", "兑", "涣", "节", "中孚", "小过", "既济", "未济"];

    var tpl = "<li><a href='/gua?guakey={name}'>{name}</a>: {value}</li>";

/**
 * Filter raw data from yijing.datas
 */
function allCertainData (dataKey) {
    var tuans = {};
    Object.keys(yiData).map(function (key) {
        var d = yiData[key];
        tuans[d.name] = dataKey ? d[dataKey] : d;
    });
    return tuans;
}

/**
 * Raw Data for Tuan Zhuang
 */
function allTuanData () {
    return allCertainData('tuan');
}

/**
 * Raw Data for Xiang Zhuang
 */
function allXiangData () {
    return allCertainData('xiang');
}

function fetchData (datas, guas) {
    return guas.map(function (guaName) {
               return {name: guaName, value: datas[guaName]};
           });
}

/**
 * Data for Gua and Yaos.
 */
function fetchGuaData (datas, guas) {
    return guas.map(function (guaName) {
               var x = datas[guaName],
                   yaoci = x.yaoci;
               yaoci.unshift(x.guaci);
               return {name: guaName, value: yaoci};
           });
}



/**
 * Insert Tuan Zhuang Data into DOM.
 */
function updateTuanDataToPage (xs) {
    var ys = xs.map(function (x) { 
                 return tpl.replace(/\{name\}/g, x.name).replace('{value}',x.value);
             }).join('');
    $('#shiyiData > ol').html(ys);
}

/**
 * Tuan Zhuang Shang.
 */
function displayTuan1 () {
    var xs = fetchData(allTuanData(), shangJing);
    updateTuanDataToPage(xs);
}

/**
 * Tuan Zhuang Xia.
 */
function displayTuan2 () {
    var xs = fetchData(allTuanData(), xiaJing);
    updateTuanDataToPage(xs);
}

/**
 * Xiang Zhuang Shang.
 */
function displayXiang1 () {
    var xs = fetchData(allXiangData(), shangJing);
    updateXiangDataToPage(xs);
}

/**
 * Xiang Zhuang Xia.
 */
function displayXiang2 () {
    var xs = fetchData(allXiangData(), xiaJing);
    updateXiangDataToPage(xs);
}

/**
 * Insert data for Xiang Zhuang.
 */
function updateXiangDataToPage (xs) {
    var ys = xs.map(function (x) { 
                 return tpl.replace(/\{name\}/g, x.name).replace('{value}', genHtmlOfXiangs(x.value));
             }).join('');
    $('#shiyiData > ol').html(ys);
}

/**
 * List Xiang for each Yao.
 */
function genHtmlOfXiangs (xs) {
    var xiangUL = "<ul>{value}</ul>",
        xiangLI = "<li>{value}</li>";
    return xiangUL.replace("{value}", xs.map(function (x) { return xiangLI.replace("{value}", x);}).join(''));
}

/**
 * 64 Gua Shang.
 */
function display64Gua1 () {
    var xs = fetchGuaData(allCertainData(), shangJing);
    updateXiangDataToPage(xs);
}
function display64Gua2 () {
    var xs = fetchGuaData(allCertainData(), xiaJing);
    updateXiangDataToPage(xs);
}

/**
 * Publish Globally.
 */
$.yijing = $.yijing || {};
$.extend($.yijing, {
    displayXiang1: displayXiang1,
    displayXiang2: displayXiang2,
    displayTuan1: displayTuan1,
    displayTuan2: displayTuan2,
    display64Gua1: display64Gua1,
    display64Gua2: display64Gua2
});

})(jQuery, $.yijing.datas);
