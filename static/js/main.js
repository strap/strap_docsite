
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

function crawl_jumps() {
    
    var set = [];
    var d = 0;
    $("#content h2").each(function() {
        var t = $(this).text();
        var id = "jump"+d;
        $(this).attr("id",id)
        $("#float_nav").append("<li><a href=\"javascript: jumpTo('"+id+"')\">"+t+'</a></li>');
        d++;
    });
}

function jumpTo(id){
    $("#content").scrollTo("#"+id);
}

$.fn.scrollTo = function( target, options, callback ){
  if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
  var settings = $.extend({
    scrollTarget  : target,
    offsetTop     : 50,
    duration      : 500,
    easing        : 'swing'
  }, options);
  return this.each(function(){
    var scrollPane = $(this);
    var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
    var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
    scrollPane.animate({scrollTop : scrollY }, parseInt(settings.duration), settings.easing, function(){
      if (typeof callback == 'function') { callback.call(this); }
    });
  });
}
