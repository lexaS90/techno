$(document ).ready(function(){	 
	 
	/*
	 * Select2
	 */

	 $("#currencies").select2({
	 	minimumResultsForSearch: -1,
	 });

	 /*
	 * owlCarousel
	 */

	 $("#main-slider").owlCarousel({
      navigation : true,
      navigationText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
      singleItem : true, 
      autoPlay:3000,
	 });

		});

$(window).scroll(function(){

});