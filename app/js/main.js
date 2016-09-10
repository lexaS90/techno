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

	$('.product-list__product').equalHeights();
	$('.main-footer__item').equalHeights();

 /*
	*	product__gallery
	*/

	$(".product-gallery").fotorama();
	

});

$(window).scroll(function(){

});

$(window).resize(function(){
    $('.product-list__product').css('height','auto');;
    $('.product-list__product').equalHeights();

    $('.main-footer__item').css('height','auto');;
    $('.main-footer__item').equalHeights();    
});