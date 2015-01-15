

var pkg = require("./package.json"),
	app = require('./app').init(pkg.server);

//Other Pages
app.get('*', function(req,res){
	res.render('layout.ejs');
});

