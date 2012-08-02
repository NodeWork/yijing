
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , gzippo = require('gzippo')
  , path = require('path');;

var app = module.exports = express.createServer();

// Configuration
var static_dir = path.join(__dirname, 'public');
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', { layout: false });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(static_dir));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
	var maxAge = 3600000 * 24 * 30;
	app.use(express.static(static_dir, { maxAge: maxAge }));
	app.use(express.errorHandler()); 
	app.set('view cache', true);
    app.use(gzippo.staticGzip(static_dir));
    app.use(gzippo.compress());
});

// Routes
app.get('/doc/:docname', routes.doc);
app.get('/gua', routes.gua);
app.get('/gua/:guaname', routes.gua);
app.get('/', routes.index);

app.listen(process.env.VCAP_APP_PORT || 3002);
