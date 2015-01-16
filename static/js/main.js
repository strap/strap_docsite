
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
            },
            error: function() {
                $("#content").html(marked(error));
            }
        });
    } else {
        $("#content").html(marked(error));
    }
}

function activate_menu() {
    $("#sidebar_nav li a").click(function() {
    history.pushState({}, '', $(this).attr("href"));
    load_page();
    return false;
  });
}
