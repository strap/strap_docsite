/* 
 * app.js
 * 
 * Our base app code, including Express configs
 */

var fs = require('fs')
  , express = require('express')
  , engine = require('ejs-locals')
  , app = express()
  , credentials = {};

exports.init = function(config) {

    app.configure(function(){
        app.set('views', __dirname + '/views');
        app.set('view engine', 'ejs');
        app.use(express.static(__dirname + '/static'));
        app.use(app.router);
        app.enable("jsonp callback");
    });

    app.engine('ejs', engine);
   


    // app.get('/*', function(req,res){
    //   res.render('layout.ejs');
    // });

    app.get('/', function(req,res){
      res.render('home.ejs');
    }); 


    app.use( function(err, req, res, next) {
        res.render('500.ejs', { locals: { error: err }, status: 500 });
    });
    
    server = app.listen(process.env.PORT || config.port);

    console.log("Listening on port %d in %s mode", process.env.PORT || config.port, app.settings.env);

    return app;
}