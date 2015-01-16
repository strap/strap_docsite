
//Setup from global and stuff...
var url = {}
    , section = ""
    , page = ""
    , error = "";

//Get everything rolling
$(window).ready(function() {

    // $('#float_nav_wrap').affix({
    //     offset: {
    //         top: 119
    //     }
    // });
    // $('#content').scrollspy({
    //     target: "#float_nav_wrap"
    // });

    $('[data-toggle="tooltip"]').tooltip()

    //do some stuff to get everything plugged in
    activate_menu();    //turn on menu pushState
    load_page();        //load the page content

    //Load and store the error content for missing files
    $.ajax({
        url: "/markdown/error.md",
        success: function(data) {
            error = data;  //set result on global error 
        }
    });
});

//gran the .md file from the server
function load_page() {

    //Set some info and defaults
    url = $.url();
    section = url.segment(1) || "home";
    page = url.segment(2) || "get-started";

    //just do a check to make sure we have these...  We should never not have them
    if (section && page) {
        $.ajax({
            url: "/markdown/"+section+"/" + page + ".md",
            success: function(data) {
                //set the page content and send it thru the marked() library
                $("#content").html(marked(data));
                crawl_jumps();
            },
            error: function() {
                //Missing file
                $("#content").html(marked(error));
                clear_float();
            }
        });
    } else {
        //Missing values - less likely...
        $("#content").html(marked(error));
        clear_float();
    }
}

//crawl across the links in the menu and plug them into the pushState stuff
function activate_menu() {
    $("#sidebar_nav li a").click(function() {
    history.pushState({}, '', $(this).attr("href"));
    load_page();    //Set the page content
    return false;
  });
}

//Remove all the content from the floating right menu
function clear_float() {
    //Clear the current list
    $("#float_nav").html('');
}

//run across the <h2>'s from md content and turn them into floating menu jumps
function crawl_jumps() {
    
    clear_float();

    var set = [];
    var d = 0;
    $("#content h2").each(function() {
        var t = $(this).text();
        var id = "jump"+d;
        $(this).attr("id",id);
        $("#float_nav").append("<li><a href=\"#"+id+"\">"+t+'</a></li>');
        d++;
    });
}

