/* 
 * app.js
 */

var fs = require('fs'),
    config = require('./package.json'),
    express = require('express'),
    engine = require('ejs-locals'),
    app = express();

var request = require('request'),
    docsMap = require('./docsUrls');

//configure Express
app.configure(function () {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.static(__dirname + '/static'));
    app.use(app.router);
    app.enable("jsonp callback");
});

//EJS is the engine - start it up
app.engine('ejs', engine);

//Main Home page
app.get("/", function(req, res) {
    res.render('layout.ejs', {index: true, home: true});
});

app.get("/home", function(req, res) {
    res.render('layout.ejs', {index: false, home: true});
});

//Handle other Pages
app.get('/:template/:section', function(req, res) {
    res.render('layout.ejs', {index: false, home: false});
});

app.get('/docfile/:section/:page', function (req, res) {
    var section = req.params.section,
        page = req.params.page,
        url;

    if( (section in docsMap) &&
        (page in docsMap[section]) ){

        url = docsMap[section][page];
        request.get(url,function(err,data){
            if(!err){
                res.send(data.body);
            }else{
                // send message to be displayed to user
                res.send("# No Documentation found.");
            }
        });
    }else{
        // fallback for locally hosted docs from private repos
        var fileName = page + ".md";
        var filepath = 'static/markdown/' + section + '/'+fileName;
        res.sendfile(filepath);
    }
});

//Something went wrong
app.use(function (err, req, res, next) {
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

