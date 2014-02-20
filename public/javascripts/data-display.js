;(function ($, yiData) {

   var shangJing = $.yijing.shangJing,
       xiaJing = $.yijing.xiaJing;

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
