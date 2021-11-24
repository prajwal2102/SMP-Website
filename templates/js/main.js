(function($) {
	"use strict"
	$("#preloader").delay(1000).fadeOut();
	// Preloader
	//$(window).on('load', function() {
	//	$("#preloader").delay(600).fadeOut();
	//});

	// Mobile Toggle Btn
	$('.navbar-toggle').on('click',function(){
		$('#header').toggleClass('nav-collapse')
	});
	
})(jQuery);