/* 
 * app.js
 * 
 * Our base app code, including Express configs
 */

var fs = require('fs')
  , express = require('express')
  , http = require('http')
  , https = require('https')
  , engine = require('ejs-locals')
  , app = express()
  , credentials = {};

exports.init = function(config) {

    app.configure(function(){
        app.set('views', __dirname + '/views');
        app.set('view engine', 'ejs');
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.static(__dirname + '/static'));
        app.use(app.router);
        app.enable("jsonp callback");
    });

    app.engine('ejs', engine);

    app.configure('development', function(){
       app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
        // app.use(express.logger({ format: ':method :url' }));
    });

    app.configure('production', function(){
       app.use(express.errorHandler()); 
    });


    app.use( function(err, req, res, next) {
        res.render('500.ejs', { locals: { error: err }, status: 500 });
    });
    
    server = app.listen(process.env.PORT || config.port);

    console.log("Listening on port %d in %s mode", process.env.PORT || config.port, app.settings.env);

    return app;
}