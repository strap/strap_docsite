
var url = {}
    , section = ""
    , page = ""
    , error = "";

//Get everything rolling
$(window).ready(function() {

    activate_menu();
    load_page();

    //Load and store the error content
    $.ajax({
        url: "/markdown/error.md",
        success: function(data) {
            error = data;
        }
    });
});

function load_page() {

    url = $.url();
    section = url.segment(1) || "home";
    page = url.segment(2) || "get-started";

    if (section && page) {
        $.ajax({
            url: "/markdown/"+section+"/" + page + ".md",
            success: function(data) {
                $("#content").html(marked(data));
                crawl_jumps();
            },
            error: function() {
                $("#content").html(marked(error));
                clear_float();
            }
        });
    } else {
        $("#content").html(marked(error));
        clear_float();
    }

    $('#float_nav_wrap').affix({
        offset: {
            top: 119
        }
    });
    $('.docs-body').scrollspy({
        target: "#float_nav_wrap"
    });
}

function activate_menu() {
    $("#sidebar_nav li a").click(function() {
    history.pushState({}, '', $(this).attr("href"));
    load_page();
    return false;
  });
}

function clear_float() {
    //Clear the current list
    $("#float_nav").html('');
}

function crawl_jumps() {
    
    clear_float();

    var set = [];
    var d = 0;
    $("#content h2").each(function() {
        var t = $(this).text();
        var id = "jump"+d;
        $(this).attr("id",id)
        $("#float_nav").append("<li><a href=\"#"+id+"\">"+t+'</a></li>');
        d++;
    });
}

