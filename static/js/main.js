//Setup from global and stuff...
var url = {},
    section = "",
    page = "",
    error = "";

//Get everything rolling
$(window).ready(function () {

    hljs.initHighlightingOnLoad();

    marked.setOptions({
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      }
    });

    $('[data-toggle="tooltip"]').tooltip();

    //do some stuff to get everything plugged in
    activate_menu();    //turn on menu pushState
    load_page();        //load the page content

    //Load and store the error content for missing files
    $.ajax({
        url: "/markdown/error.md",
        success: function (data) {
            error = data;  //set result on global error
        }
    });
});

function toggleMenu(target) {
    $(".menu-part").hide();
    //console.log(target);
    if (target) {
        $("#menu-" + target).show();
    }
}

//grab the .md file from the server
function load_page() {

    //Set some info and defaults
    var url = $.url();
    var section = url.segment(1) || "home";
    var page = url.segment(2) || "get-started";

    //just do a check to make sure we have these...  We should never not have them
    if (section && page) {
        $.ajax({
            url: "/docfile/" + section + "/" + page,
            success: function (data) {
                //set the page content and send it thru the marked() library
                $("#content").html(marked(data));
                crawl_jumps();
                collapseCode();
            },
            error: function () {
                //Missing file
                $("#content").html(marked(error));
                clear_float();
            }
        });

        var tt = page.split("-");
        //console.log(tt);
        if (tt[0]) {
            toggleMenu(tt[0])
        }

    } else {
        //Missing values - less likely...
        $("#content").html(marked(error));
        clear_float();
    }

    //Do some hiding stuff
    if (section == "home" || section == "security") {
        //hide the left menu
        $("#menu").hide();
    } else {
        //Show the left menu
        $("#menu").show();
        $("#menu").children().hide();
        $("#" + section).show();
    }

}

//crawl across the links in the menu and plug them into the pushState stuff
function activate_menu() {
    $("#sidebar_nav li a").click(function () {
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
    $("#content h2").each(function () {
        var t = $(this).text();
        var id = "jump" + d;
        $(this).attr("id", id).addClass("anchor");
        $("#float_nav").append("<li><a href=\"#" + id + "\">" + t + '</a></li>');
        d++;
    });
}

function collapseCode() {

    $('code').parent().each(function() {

        var codeClass = $(this).find('code').attr('class');

        if(codeClass) { // If class is set, we have a code block (not inline)

            var button = $('<a/>')
                        .addClass('collapse-button')
                        .on('click', function(e) {
                            var code = $(this).parent().find('code');

                            if(code.is(':visible')) {
                                $(this).addClass('collapsed');
                                code.slideUp();
                            } else {
                                $(this).removeClass('collapsed');
                                code.slideDown();
                            }

                            e.preventDefault();
                        });

            if(codeClass && codeClass.indexOf("lang-json") >= 0) {
                button.addClass('collapsed');
                $(this).find('code').slideUp();
            }

            $(this).prepend(button);

        }
    });

}
