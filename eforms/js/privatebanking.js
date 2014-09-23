/**
 * ProgressBar for jQuery
 *
 * @version 1 (29. Dec 2012)
 * @author Ivan Lazarevic
 * @requires jQuery
 * @see http://workshop.rs
 *
 * @param  {Number} percent
 * @param  {Number} $element progressBar DOM element
 */
function progressBar(percent, $element) {
	var progressBarWidth = percent * $element.width() / 100;
	$element.find('div').animate({ width: progressBarWidth }, 500).html(percent + "%&nbsp;");
}

function getother(id){	
		$('#'+id).change(function() {
			var opt = this.options[this.selectedIndex].value;
			if(opt == '0') { $("#specifyother"+id).show(); $("#"+id+"other").focus();  } else $("#specifyother"+id).hide();
		});	
}

function getothercheck(id){
	$.each($("input[name='"+id+"[]']:checked"), function() {
 		 if($(this).val() == 'other') 
		 $("#specifyother"+id).show(); else $("#specifyother"+id).hide();
		 
		});
	
}

// FORM VALIDATION
$("#signup").validate({
  success : function(label){
    label.addClass("valid").text("✓");
  },
  error : function(e){
//     console.log(e);
  },
  onsubmit:false,
  rules: {
	email: {
		required: true,
		email: true
	},
	email2: {
		required: true,
		email: true,
		equalTo: "#email"
	},
	firstname: "required",
	lastname: "required",
	nametitle: { 
		required: false,
		valueNotEquals: "default" 
	},
	dd: { 
		required: false,
		valueNotEquals: "DD", 
		minlength:2,
		maxlength:2,
		number:true	
	},
	mm: { 
		required: false,
		minlength:2,
		maxlength:2,
		valueNotEquals: "MM",
		number:true 
	},
	yyyy: { 
		required: false,
		minlength:4,
		maxlength:4,
		valueNotEquals: "YYYY",
		number:true  
	},
	mnumber: { 
		required: true,
		minlength:10,
		maxlength:15,
		number:true  
	},
	},
	messages: {
	   nametitle: {
			valueNotEquals: "Please select a Title!"
	   },
	   email2: {
			equalTo: "Email and Confirm Email must match!"
	   }
	}
});

$("body").on("keyup", "form", function(e){
  if (e.which == 13){
    if ( $("li.activePage").find("input, select").valid() ){
      e.preventDefault();
      //nextSection();$("#next").is(":visible") &&
      return false;
    }
  }
});

$(document).ready(function(){
	// hide or show extra field
	//getother('idtype');
	//getother('title');
	//getothercheck("account_purpose",true);
	
// DOM Ready
$(function(){
	$('#slider').anythingSlider({
		mode            	: "vertical",   // Set mode to "horizontal", "vertical" 
		buildArrows         : false,      // If true, builds the forwards and backwards buttons
		buildNavigation     : false,      // If true, builds a list of anchor links to link to each panel
		buildStartStop      : false, 
		hashTags            : false,      // Should links change the hashtag in the URL?
		infiniteSlides      : false,      // if false, the slider will not wrap & not clone any panels
		navigationFormatter : null,
		resizeContents 		: false
	}).anythingSliderFx({'.next'         : [ 'top', '50px', '200', 'easeInOutCirc' ]	});
	
	// slider instance for API ACCESS
	var slider = $('#slider').data('AnythingSlider');
	
	// disable prev btn on first page
	if(slider.currentPage == '1') { 
		updateBar(0);
		$("#prev").attr('disabled', 'disabled');
		$("#prev").addClass('disabled'); 
	}
	
	$("#nav ul li a").click(function(e){
		
			
		var slide_index = $(this).parent().index()+1;
		$("#nav ul li").removeClass('active');
		$(this).parent().addClass('active');
		//slider.currentPage = slide_index;
		slider.gotoPage(slide_index);
		
		// disable/enable next/prev button if on last page
		if( slide_index == slider.pages  ) {
			$("#next").attr('disabled', 'disabled');
			$("#next").addClass('disabled');
			// enable previous button 
			$("#prev").removeAttr('disabled');
			$("#prev").removeClass('disabled'); 
			
			// hide/show btns for submits
			$("#pausebtn").hide(); 
			$("#submitbtn").show();			
		} else {
			$("#next").removeAttr('disabled');
			$("#next").removeClass('disabled'); 
			$("#submitbtn").hide(); 
			$("#pausebtn").show();
			
		}
		
		// disable/enable prev/next button if on first page
		if( slide_index == 1  ) {
			//alert(slide_index);
			$("#prev").attr('disabled', 'disabled');
			$("#prev").addClass('disabled');
			// enable previous button 
			$("#next").removeAttr('disabled');
			$("#next").removeClass('disabled'); 
		} else {
			$("#prev").removeAttr('disabled');
			$("#prev").removeClass('disabled'); 	
		}
		
		updateBar(slide_index);
		e.preventDefault();
	});
	
	// API ACCESS
	
	$("#next").click(function(e){
		
		// only move forward if not on last page
		if( slider.currentPage+1 <= slider.pages ) {
			$('#slider').data('AnythingSlider').goForward();
		}
		
		// enable next button if not on last page
		if( slider.currentPage+1 == slider.pages ) { 
			$("#next").attr('disabled', 'disabled');
			$("#next").addClass('disabled'); 
			// hide/show btns for submits
			$("#pausebtn").hide(); 
			$("#submitbtn").show();	
		} else {
			// enable previous button 
			$("#prev").removeAttr('disabled');
			$("#prev").removeClass('disabled');
		}
		
		
			
		if( $("li.activePage").find("input, select").valid() ) {
			
			$("#nav ul li").removeClass('active');
			$('#nav ul li:eq(' + slider.currentPage + ')').addClass('active');
			//progressBar(35, $('#progressBar'));			
		}
		updateBar(slider.currentPage+1);
		e.preventDefault();
	});
	$("#prev").click(function(e){
		
		
		// only move back if not on first page
		if( slider.currentPage-1 >= 1 ) {
			$('#slider').data('AnythingSlider').goBack();
			updateBar(slider.currentPage-1);
		}
		
		// enable previous button if not on first page
		if( slider.currentPage-1 == 1 ) { 
			$("#prev").attr('disabled', 'disabled');
			$("#prev").addClass('disabled'); 
			updateBar(slider.currentPage-1);
		} else {
			// hide/show btns for submits
			$("#pausebtn").show(); 
			$("#submitbtn").hide();	
			// enable next button 
			$("#next").removeAttr('disabled');
			$("#next").removeClass('disabled');
		}
		
		if( $("li.activePage").find("input, select").valid() ) {
			
			$("#nav ul li").removeClass('active');
			$('#nav ul li:eq(' + (slider.currentPage-2) + ')').addClass('active');
			//progressBar(35, $('#progressBar'));			
		}
		
		
		e.preventDefault();
	});
	


	});

});

function updateBar(curpage){
	// alert(curpage);
	// progress bar
	switch (curpage) {
		case 0:
			progressBar(0, $('#progressBar'));
			break;
		case 1:
			progressBar(25, $('#progressBar'));
			break;	
		case 2:
			progressBar(50, $('#progressBar'));
			break;
		case 3:
			progressBar(75, $('#progressBar'));
			break;
		case 4:
			progressBar(100, $('#progressBar'));
			break;
	}	
}


/*
$("#next").on("click", function(e){
  if ($("#next").is(":visible") && $("fieldset.current").find("input, textarea").valid() ){
      e.preventDefault();
      nextSection();
      return false;
    }
});


$("form").on("submit", function(e){
  if ($("#next").is(":visible") || $("fieldset.current").index() < 3 || !$("fieldset.current").find("input, textarea").valid()){
    e.preventDefault();
    return false;
  }
});
  
 */ 
  
/*function nextSection(){
  var i = $("fieldset.current").index();
  if (i < 3){
    $("li").eq(i+1).addClass("active");
    goToSection(i+1);
  }
}

$("li").on("click", function(e){
  var i = $(this).index();
  if ($(this).hasClass("active")){
    goToSection(i);
  } else {
    alert("Please complete previous sections first.");
  }
})
*/

/*function goToSection(i){
  $("fieldset:gt("+i+")").removeClass("current").addClass("next");
  $("fieldset:lt("+i+")").removeClass("current");
  $("li").eq(i).addClass("current").siblings().removeClass("current");
  setTimeout(function(){
    $("fieldset").eq(i).removeClass("next").addClass("current active");
      if ($("fieldset.current").index() == 3){
        $("#next").hide();
        $("input[type=submit]").show();
      } else {
        $("#next").show();
        $("input[type=submit]").hide();
      }
  }, 80);

}*/
  
  
jQuery.validator.addMethod("phoneUS", function(phone_number, element) {
    phone_number = phone_number.replace(/\s+/g, ""); 
	return this.optional(element) || phone_number.length > 9 &&
		phone_number.match(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
}, "Please specify a valid phone number");

$.validator.addMethod("valueNotEquals", function(value, element, arg){
	  return arg != value;
	 }, "Value must not equal arg.");
$.validator.addMethod("emails_not_same", function(value, element) {
   return $('#email').val() != $('#email2').val()
}, "* Email and Confirm Email does not match!");

