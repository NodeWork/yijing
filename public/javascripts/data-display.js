;(function ($, yiData) {

   var shangJing = ["乾", "坤", "屯", "蒙", "需", "讼", "师", "比", "小畜", "履", "泰", "否", "同人", "大有", "谦", "豫", "随", "蛊", "临", "观", "噬嗑", "贲", "剥", "复", "无妄", "大畜", "颐", "大过", "坎", "离"],
       xiaJing = ["咸", "恒","遯", "大壮", "晋", "明夷", "家人", "睽", "蹇", "解", "损", "益", "夬", "姤", "萃", "升", "困", "井", "革", "鼎", "震", "艮", "渐", "归妹", "丰", "旅", "巽", "兑", "涣", "节", "中孚", "小过", "既济", "未济"];

    var tpl = "<li><span>{name}</span>: {value}</li>";

function allCertainData (dataKey) {
    var tuans = {};
    Object.keys(yiData).map(function (key) {
        var d = yiData[key];
        tuans[d.name] = d[dataKey];
    });
    return tuans;
}

function allTuanData () {
    return allCertainData('tuan');
}

function allXiangData () {
    return allCertainData('xiang');
}

function updateDataToPage (xs) {
    var ys = xs.map(function (x) { 
                 return tpl.replace('{name}', x.name).replace('{value}',x.value);
             }).join('');
    $('#shiyiData > ol').html(ys);
}

function displayTuan1 () {
    var xs = fetchData(allTuanData(), shangJing);
    updateDataToPage(xs);
}

function displayTuan2 () {
    var xs = fetchData(allTuanData(), xiaJing);
    updateDataToPage(xs);
}

function fetchData (datas, guas) {
    return guas.map(function (guaName) {
               return {name: guaName, value: datas[guaName]};
           });
}

function displayXiang1 () {
    var xs = fetchData(allXiangData(), shangJing);
    updateDataToPage(xs);
}

function displayXiang2 () {
    var xs = fetchData(allXiangData(), xiaJing);
    updateDataToPage(xs);
}

$.yijing = $.yijing || {};
$.extend($.yijing, {
    displayXiang1: displayXiang1,
    displayXiang2: displayXiang2,
    displayTuan1: displayTuan1,
    displayTuan2: displayTuan2
});

})(jQuery, $.yijing.datas);
