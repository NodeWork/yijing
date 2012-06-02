
/*
 * GET home page.
 */

var defaultGua = '111111';

exports.index = function(req, res) {
  res.render('index', { guaname: ''})
};

exports.gua = function(req, res) {
    var param = req.params.guaname || defaultGua ;

  res.render('search', { guaname: param })
};

exports.doc = function(req, res) {
    var docname = req.params.docname;

    res.render(docname);
};