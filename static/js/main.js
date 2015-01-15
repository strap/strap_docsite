//Scripts for Main page

var url = {};

//Get everything rolling
$( window ).ready(kickstart);

//Main function for homepage
function kickstart() {

    url = $.url();

	console.log("We are kickstarting "+ url.attr('path') );
    load_page("home");
}

function load_page(page) {
    $.ajax({
        url: "markdown/"+page+".md",
        success: function(data) {
            $("#content").html( marked(data) );
            console.log("loaded page "+page);
        }
    });
}




