

var pkg = require("./package.json"),
	app = require('./app').init(pkg.server);

//Other Pages
app.get('/:page', function(req,res){

	//console.log("Page ID:", req.params.page);
	var page = req.params.page || "",
		temp = {body: "home.ejs", page: page, config: pkg.config};
	switch(page){
		case "docpsection":
			temp.body = page+".ejs"
			res.render('layout.ejs', temp);
		break;
	}
});

//home Page
app.get('/', function(req,res){
    res.render('layout.ejs', {body: "home.ejs", page: "home", config: pkg.config});
});

/* The 404 Route (ALWAYS Keep this as the last route) */
app.get('/*', function(req, res){
    res.render('404.ejs');
});

