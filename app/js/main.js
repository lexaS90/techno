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

	/*
	 * equalHeights
	 */

	 $('.featured-products__product').equalHeights();
	 $('.main-footer__item').equalHeights();

});

$(window).scroll(function(){

});

$(window).resize(function(){
    $('.featured-products__product').css('height','auto');;
    $('.featured-products__product').equalHeights();

    $('.main-footer__item').css('height','auto');;
    $('.main-footer__item').equalHeights();    
});