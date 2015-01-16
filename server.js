/* 
 * app.js
 */

var fs = require('fs'),
	config = require('./package.json'),
    express = require('express'),
    engine = require('ejs-locals'),
    app = express(),
    credentials = {};

    //configure Express
    app.configure(function() {
        app.set('views', __dirname + '/views');
        app.set('view engine', 'ejs');
        app.use(express.static(__dirname + '/static'));
        app.use(app.router);
        app.enable("jsonp callback");
    });

    //EJS is the engine - start it up
    app.engine('ejs', engine);

    //Main Home page - two versions
    app.get(['/',"/home"], function(req, res) {
        res.render('home.ejs');
    });

    //Handle other Pages
    app.get('/:template/:section', function(req, res) {
        fs.readFile("./views/"+req.params.template+".ejs", function(err, data){
            if(err) {
                res.render('404');
            } else {
                res.render('layout.ejs', {content: data.toString()});
            }
        });
    });

    //Something wnet wrong
    app.use(function(err, req, res, next) {
        res.render('500.ejs', {
            locals: {
                error: err
            },
            status: 500
        });
    });

    //Pick up the phone
    app.listen(process.env.PORT || config.server.port);

    console.log("Listening on port %d in %s mode", process.env.PORT || config.server.port, app.settings.env);

