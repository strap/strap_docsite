//Scripts for Main page

//Get everything rolling
$( window ).ready(kickstart);

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

//Main function for homepage
function kickstart() {
	console.log("We are kickstarting "+page);
	switch(page) {
		case "docs":
			$(".fitVid").fitVids();
            videos();
		break;
        case "company":
            $(".fitVid").fitVids();
            company_contact();
            investor_form();
        break;
		default:
			homepage();
		break;
	}

	default_funcs();
}

function default_funcs() {

	$(".scrollToLink").click(function(e, tmpl) {
        var _this = this;
        $('html, body').animate({
            scrollTop: $(e.currentTarget.hash).offset().top - 75
        }, 600);
    });
}


function homepage(){

    var header = document.querySelector("#header");
    if (window.location.hash) {
        header.classList.add("header-show");
    }
    new Headroom(header, {
        tolerance: 5,
        offset: 75,
        classes: {
            initial: "animated",
            pinned: "header-show",
            unpinned: "header-hide"
        }
    }).init();
    $('.dropdown-toggle').each(function() {
        if ($(this).find('.dropdown-menu-nub').length==0) {
            $(this).prepend("<div class='dropdown-menu-nub'></div>");
        }
    });
    document.createElement( "picture" );
    
    var responsive_viewport = $(window).width();

    /* if is below 481px */
    if (responsive_viewport < 481) {
        if ($('#home-hero .background-gif').length){

        } else {
            $("#home-hero").prepend("<div class='background-gif'><img src='/img/video/strapDevHands-m.gif'/></div>");
            $("#home-hero video").remove();
        }
        
    } else if (responsive_viewport > 481) {
    
        if ($('#home-hero video').length){

        } else {
            $("#home-hero .background-gif").remove();
            $("#home-hero").vide({
                mp4: '/img/video/strapDevHands.mp4',
                webm: '/img/video/strapDevHands.webm',
                ogv: '/img/video/strapDevHands.ogv',
                poster: '/img/video/strapDevHands.gif'
            }, {
                resizing:false,
                position: "50% 0%"
            });
        }
    }

    $( window ).resize(function() {
        var responsive_viewport = $(window).width();
        if (responsive_viewport < 481) {
            if ($('#home-hero .background-gif').length){

            } else {
                $("#home-hero").prepend("<div class='background-gif'><img src='/img/video/strapDevHands-m.gif'/></div>");
                $("#home-hero video").remove();
            }
        } else if (responsive_viewport > 481) {
            if ($('#home-hero video').length){

            } else {
                $("#home-hero .background-gif").remove();
                $("#home-hero").vide({
                    mp4: '/img/video/strapDevHands.mp4',
                    webm: '/img/video/strapDevHands.webm',
                    ogv: '/img/video/strapDevHands.ogv',
                    poster: '/img/video/strapDevHands.gif'
                }, {
                    resizing:false,
                    position: "50% 0%"
                });
            }
        }
    });

    $("#video-hero").vide({
        mp4: '/img/video/strap-video-poster.mp4',
        webm: '/img/video/strap-video-poster.webm',
        ogv: '/img/video/strap-video-poster.ogv',
        poster: '/img/video/strap-video-poster.jpg'
    });


    $("#video-link .play-button").click(function(e,t) {
        var src = '//player.vimeo.com/video/115874822?autoplay=1';
        
        $('#myModal iframe').attr('src', src);
        $("#myModal").fitVids();

        analytics.track("Home Video Played");
    });

    $("#myModal a .icon-close").click(function() {
        $('#myModal iframe').removeAttr('src');
    });

    //Thumbs
    $("#product-updates-register").on("change", function(e,t){
        var _this = e.currentTarget;
        if ($(_this).is(':checked')) {
            $('#updates .thumbs-up-left').addClass("checked");
        } else {
            $('#updates .thumbs-up-left').removeClass("checked");
        }
    });

    $("#blog-register").on("change", function(e,t){
        var _this = e.currentTarget;
        if ($(_this).is(':checked')) {
            $('#updates .thumbs-up-right').addClass("checked");
        } else {
            $('#updates .thumbs-up-right').removeClass("checked");
        }
    });

    //Various forms
    investor_form();
    updates_form();
    contact_form();
    register_form();

};

function subscribe(type, data) {

	$.ajax({
			type: "POST",
			url: "/subscribe/"+type,
			data: data,
			success: function() { return true}
		});
}

function register_form() {

	$("#hero-register-form, #metrics-register-form").on("submit", function(e) {

        e.preventDefault();
        var email = $('#account-email').val() || $('#account-email-2').val();
            
        if (!email || !validateEmail(email) ) {
            return;
        }

        //Send some analytics
         analytics.track("Intent to Register",{
                email: email,
                'Page Location': this.id
         });

        window.location = dashboard+"/register?email="+encodeURI(email)

        return false;
    });
}

function investor_form() {

	$("#investors-form").on("submit", function(e) {
        e.preventDefault();

        var email = $("#investors-email").val() || "";

        if (!email || !validateEmail(email) ) {
            return false;
        }

        //Create the Contact object
        var contact = {  name: 		$("#investors-name").val() || "Subscriber",
        			 	 email: 	email};

        //create the User on the List
       subscribe( "investors", contact, function(response) {
	            if (!response.success) {
	                bootbox.alert("Error signing you up! Shoot us a note at hello@straphq.com.");
	            } else {
	                bootbox.alert("Thanks for signing up! Check your email to confirm the subscription.");
	            }
	        });

        //Send some analytics
        contact['Page Location'] = this.id;
        analytics.track("Investor Form",contact);

        return false;
    });
}

function updates_form() {

	$("#updates-register-form").on("submit", function(e, t) {
        e.preventDefault();

        var email = $("#updates-register-email").val()
        if (!email || !validateEmail(email) ) {
            return false;
        }

        var productUpdates_check = $('#product-updates-register').is(':checked'),
            strapBlog_check = $('#blog-register').is(':checked');

        //Check for checked lists
        if ((!productUpdates_check) && (!strapBlog_check)) {
            console.log("Nothing Checked");
        	bootbox.alert("Check which updates you'd like to receive.");
            return;
        }

        //Create the Contact object
        var contact = { email: 	email };

        if (productUpdates_check) {
           subscribe( "products", contact, function(response) {
                if (!response.success) {

                    bootbox.alert("Error signing you up! Shoot us a note at hello@straphq.com.");
                    Session.set("loading", false);
                }
            });
        }

        if (strapBlog_check) {
           subscribe( "blog", contact, function(response) {
                if (response.success) {
                    bootbox.alert("Error signing you up! Shoot us a note at hello@straphq.com.");

                }
            });
        }

        bootbox.alert("Thanks for signing up! Check your email to confirm the subscription.");

        //Add in the flag for the type of sign up
        contact['Page Location'] = this.id;
        contact.productUpdates = productUpdates_check;
        contact.blogUpdates = strapBlog_check;

        //Send some analytics
        analytics.track("Stay Updated",contact);
        $("#updates-register-email").val("");
        $('#product-updates-register').attr("checked", false);
        $('#blog-register').attr("checked", false);
        $('#updates .thumbs-up-right').removeClass("checked");
        $('#updates .thumbs-up-left').removeClass("checked");

        return false;
    });
}


function contact_form() {

	$("#connect-contact-form").on("submit", function(e, t) {

        e.preventDefault();
        // retrieve the input field values
        var email = $('#connect-contact-email').val(),
            message = $('#connect-contact-message').val();

        if (!email || !validateEmail(email) || !message) {
        	console.log("Invalid Submission");
        	//TODO: invalid submission message
            return;
        }

        var data = {
            name: email,
            email: email,
            message: message
        }

        $.ajax({
            type: "POST",
            url: "/email",
            data: data,
            success: function() { return true}
        });

        $('#connect-contact-email').val("");
        $('#connect-contact-message').val("");

        //Send some analytics
        delete data.message;
        data['Page Location'] = this.id;
        analytics.track("Contact Form", data);
        
        bootbox.alert("Thanks for reaching out! We'll be in touch soon.");

        return false;
    })
}

function company_contact() {

    $("#contact-form").on("submit", function(e, t) {

        e.preventDefault();
        // retrieve the input field values
        var name = $('#contact-name').val(),
            email = $('#contact-email').val(),
            message = $('#contact-message').val();

        if (!name.length || !email.length || !message.length) {
            bootbox.alert("Please ensure all fields are filled in!");
            return;
        }

        var data = {
            name: name || email,
            email: email,
            message: message
        }
        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        $.ajax({
            type: "POST",
            url: "/email",
            data: data,
            success: function() { return true}
        });

        $('#contact-name').val("");
        $('#contact-email').val("");
        $('#contact-message').val("");

        //Send some analytics
        delete data.message;
        data['Page Location'] = this.id;
        analytics.track("Company Contact Form", data);
        
        bootbox.alert("Thanks for reaching out! We'll be in touch soon.");
        $("#contact-form").reset();
        return false;
    });
}

function videos() {

    $("#vid1, #vid2, #vid3").click(function(e) {

        e.preventDefault();
        var vids = {"vid1": "105564454",
                    "vid2": "105564698",
                    "vid3": "106435979" }

        var vid = $(this).get(0).id;
        console.log(vid, "//player.vimeo.com/video/"+vids[vid]);
        $("#vidframe").attr("src","//player.vimeo.com/video/"+vids[vid]);

    });
}




