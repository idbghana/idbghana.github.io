//Sticky footer
// function stickyFooter(){
//         jQuery("#cms-menu-bar").css({position: "absolute",top:($(window).scrollTop()+$(window).height()-$("#cms-menu-bar").height())+"px", 'z-index':'10000000'});
//     }
//  
// jQuery(function(){
//     stickyFooter(); 
//  
//     jQuery(window)
//         .scroll(stickyFooter)
//         .resize(stickyFooter);
// });

$(document).ready(function() {
	$(".admin-panel").fancybox({
		maxWidth	: 1024,
		maxHeight	: 450,
		fitToView	: false,
		width		: '100%',
		height		: '450',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none',
		padding		: '0',
		closeBtn	: false
	});
	
	$(".image_preview").fancybox({
		openEffect	: 'none',
		closeEffect	: 'none'
	});
	
});

$(document).ready(function(){
   //onClick event for plugin file add button:
   $('#addPluginFile').click(addPluginFileInputs);
});

var pluginFileInputCounter = 1;
 var addPluginFileInputs = function(event) {
 
     //Get plugin file inputs, clone them
     $("input[name*='[PluginFile][1]']").clone().each(function() {
 
        //Rename the fields increasing numbers:
        this.name = this.name.replace(/\[(\d+)\]/, function (m,x) {
            return '[' + (parseInt(x) + pluginFileInputCounter) + ']'
        });
 
        //Clear the values of the cloned fields:
        this.value = '';
 
        //Append them to the form:
        $('#PluginFiles').append($(this));
     });
     pluginFileInputCounter++;
 }

/*
Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

// This file is not required by CKEditor and may be safely ignored.
// It is just a helper file that displays a red message about browser compatibility
// at the top of the samples (if incompatible browser is detected).

if ( window.CKEDITOR )
{
	(function()
	{
		var showCompatibilityMsg = function()
		{
			var env = CKEDITOR.env;

			var html = '<p><strong>Your browser is not compatible with CKEditor.</strong>';

			var browsers =
			{
				gecko : 'Firefox 2.0',
				ie : 'Internet Explorer 6.0',
				opera : 'Opera 9.5',
				webkit : 'Safari 3.0'
			};

			var alsoBrowsers = '';

			for ( var key in env )
			{
				if ( browsers[ key ] )
				{
					if ( env[key] )
						html += ' CKEditor is compatible with ' + browsers[ key ] + ' or higher.';
					else
						alsoBrowsers += browsers[ key ] + '+, ';
				}
			}

			alsoBrowsers = alsoBrowsers.replace( /\+,([^,]+), $/, '+ and $1' );

			html += ' It is also compatible with ' + alsoBrowsers + '.';

			html += '</p><p>With non compatible browsers, you should still be able to see and edit the contents (HTML) in a plain text field.</p>';

			var alertsEl = document.getElementById( 'alerts' );
			alertsEl && ( alertsEl.innerHTML = html );
		};

		var onload = function()
		{
			// Show a friendly compatibility message as soon as the page is loaded,
			// for those browsers that are not compatible with CKEditor.
			if ( !CKEDITOR.env.isCompatible )
				showCompatibilityMsg();
		};

		// Register the onload listener.
		if ( window.addEventListener )
			window.addEventListener( 'load', onload, false );
		else if ( window.attachEvent )
			window.attachEvent( 'onload', onload );
	})();
}
