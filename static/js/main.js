//Scripts for Main page

var url = {};
var segs = [];

//Get everything rolling
$( window ).ready(kickstart);

//Main function for homepage
function kickstart() {

    url = $.url();
    segements();

    load_page( mdName() );
}

function segements() {
    segs = [];
    for(var i=1; i<3; i++) {
        if(url.segment(i)){
            segs.push(url.segment(i));
        }
    }
}

function mdName() {
    return segs.join("-");
}

function load_page(page) {
    $.ajax({
        url: "/markdown/"+page+".md",
        success: function(data) {
            $("#content").html( marked(data) );
            console.log("loaded page "+page);
        }
    });
}




