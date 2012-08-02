
/*
 * GET home page.
 */

var defaultGua = '111111',
    navs = [ 
           //{url: '/', name: '六十四卦图'}
             {url: '/doc/tuanci-1', name: '彖传上'}
           , {url: '/doc/tuanci-2', name: '彖传下'}
           , {url: '/doc/xiang-1', name: '象传上'}
           , {url: '/doc/xiang-2', name: '象传下'}
           , {url: '/doc/xici-1', name: '系辞上'}
           , {url: '/doc/xici-2', name: '系辞下'}
           , {url: '/doc/wenyan', name: '文言传'}
           , {url: '/doc/shuogua', name: '说卦传'}
           , {url: '/doc/xugua', name: '序卦传'}
           , {url: '/doc/zagua', name: '杂卦传'}
           ];

function getResData (req, guanameInput) {
    var guaname = guanameInput || '';
    return {
        guaname: guaname,
        navs: navs,
        url: req.url
    };
}
exports.index = function(req, res) {
    res.render('index', getResData(req));
};

exports.gua = function(req, res) {
    var param = req.params.guakey || req.query.guakey || defaultGua ;
    res.render('search', getResData(req, param));
};

exports.doc = function(req, res) {
    var docname = req.params.docname;
    res.render('doc/' + docname, getResData(req));
};
