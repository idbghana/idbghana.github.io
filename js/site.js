;(function ($, window, undefined) {
  'use strict';

  var $doc = $(document),
      Modernizr = window.Modernizr;

  $(document).ready(function() {
    $.fn.foundationAlerts           ? $doc.foundationAlerts() : null;
    $.fn.foundationButtons          ? $doc.foundationButtons() : null;
    $.fn.foundationAccordion        ? $doc.foundationAccordion() : null;
    $.fn.foundationNavigation       ? $doc.foundationNavigation() : null;
    $.fn.foundationTopBar           ? $doc.foundationTopBar() : null;
    $.fn.foundationCustomForms      ? $doc.foundationCustomForms() : null;
    $.fn.foundationMediaQueryViewer ? $doc.foundationMediaQueryViewer() : null;
    $.fn.foundationTabs             ? $doc.foundationTabs({callback : $.foundation.customForms.appendCustomMarkup}) : null;
    $.fn.foundationTooltips         ? $doc.foundationTooltips() : null;
    $.fn.foundationMagellan         ? $doc.foundationMagellan() : null;
    $.fn.foundationClearing         ? $doc.foundationClearing() : null;

    $.fn.placeholder                ? $('input, textarea').placeholder() : null;
  });

  // UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE8 SUPPORT AND ARE USING .block-grids
  // $('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'both'});
  // $('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'both'});
  // $('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'both'});
  // $('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'both'});

  // Hide address bar on mobile devices (except if #hash present, so we don't mess up deep linking).
  if (Modernizr.touch && !window.location.hash) {
    $(window).load(function () {
      setTimeout(function () {
        window.scrollTo(0, 1);
      }, 0);
    });
  }

})(jQuery, this);

//Orbit Plugin
$(window).load(function(){
     $("#banner-roll").orbit({
		  animation: 'fade',                  // fade, horizontal-slide, vertical-slide, horizontal-push
		  animationSpeed: 4000,                // how fast animtions are
		  timer: true,                        // true or false to have the timer
		  resetTimerOnClick: false,           // true resets the timer instead of pausing slideshow progress
		  advanceSpeed: 8000,                 // if timer is enabled, time between transitions
		  pauseOnHover: true,                // if you hover pauses the slider
		  startClockOnMouseOut: true,        // if clock should start on MouseOut
		  startClockOnMouseOutAfter: 1000,    // how long after MouseOut should the timer start again
		  directionalNav: true,               // manual advancing directional navs
		  captions: true,                     // do you want captions?
		  captionAnimation: 'fade',           // fade, slideOpen, none
		  captionAnimationSpeed: 800,         // if so how quickly should they animate in
		  bullets: false,                     // true or false to activate the bullet navigation
		  bulletThumbs: false,                // thumbnails for the bullets
		  bulletThumbLocation: '',            // location from this file where thumbs will be
		  afterSlideChange: function(){},     // empty function
		  fluid: true
	});
});

// initialise plugins
$(document).ready(function(){
	
	//preload css images
	 $.preloadCssImages();
	
	//Reveal
	$("#confirm").reveal();

	$("ul.submenu").parent().append("<span></span>"); //Only shows drop down trigger when js is enabled (Adds empty span tag after ul.subnav*)
	
	$("ul.menu li a, ul.menu li span").hover(function() { //When trigger is clicked...
		
		//Following events are applied to the subnav itself (moving subnav up and down)
		$(this).parent().find("ul.submenu").fadeIn('slow').show(); //Drop down the subnav on click

		$(this).parent().hover(function() {
		}, function(){	
			$(this).parent().find("ul.submenu").fadeOut('slow'); //When the mouse hovers out of the subnav, move it back up
		});

		//Following events are applied to the trigger (Hover events for the trigger)
		}).hover(function() { 
			$(this).addClass("subhover"); //On hover over, add class "subhover"
		}, function(){	//On Hover Out
			$(this).removeClass("subhover"); //On hover out, remove class "subhover"
	});

});

//prepare the form when the DOM is ready
$(document).ready(function() {
    var options = {
        target:        '#output-message',   // target element(s) to be updated with server response
        beforeSubmit:  showRequest,  // pre-submit callback
        success:       showResponse  // post-submit callback

        // other available options:
        //url:       url         // override for form's 'action' attribute
        //type:      type        // 'get' or 'post', override for form's 'method' attribute
        //dataType:  null        // 'xml', 'script', or 'json' (expected server response type)
        //clearForm: true        // clear all form fields after successful submit
        //resetForm: true        // reset the form after successful submit

        // $.ajax options can be used here too, for example:
        //timeout:   3000
    };

    $("#contact-form").validate();
    // bind form using 'ajaxForm'
    $('#contact-form').ajaxForm(options);
});

// pre-submit callback
function showRequest(formData, jqForm, options) {
    // formData is an array; here we use $.param to convert it to a string to display it
    // but the form plugin does this for you automatically when it submits the data
    var queryString = $.param(formData);

    // jqForm is a jQuery object encapsulating the form element.  To access the
    // DOM element for the form do this:
    // var formElement = jqForm[0];
    if(confirm('You are about to send the information below to The Royal Bank. Please confirm... \n\n First Name: ' + $("#ContactFirstname").val()
       	+ '\n\n Last Name: ' + $("#ContactLastname").val()
		+ '\n\n E-mail: ' + $("#ContactEmail").val()
		+ '\n\n Enquiry Type: ' + $("#ContactEnquiryType").val()
		+ '\n\n Message: ' + $("#ContactMessage").val()
        + '')){
        return true;
    }else {
        // here we could return false to prevent the form from being submitted;
        // returning anything other than false will allow the form submit to continue
        return false;
    }
}

// post-submit callback
function showResponse(responseText, statusText, xhr, $form)  {
    // for normal html responses, the first argument to the success callback
    // is the XMLHttpRequest object's responseText property

    // if the ajaxForm method was passed an Options Object with the dataType
    // property set to 'xml' then the first argument to the success callback
    // is the XMLHttpRequest object's responseXML property

    // if the ajaxForm method was passed an Options Object with the dataType
    // property set to 'json' then the first argument to the success callback
    // is the json data object returned by the server

    //alert('status: ' + statusText + '\n\nresponseText: \n' + responseText +
      //  '\n\nThe output div should have already been updated with the responseText.');
      $('#output-message').css('display', 'block');
      $('#contact-form').get(0).reset();
}

$(document).ready(function() {
    $("#welcome-more").click(function(e) {
	  e.preventDefault();
      $("#welcome-message").reveal();
    });
  });