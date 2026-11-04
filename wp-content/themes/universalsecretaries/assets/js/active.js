/*********************************************************************************

	Template Name: Universal Secretaries  
	Template URI: https://themeforest.net/user/hastech
	Description: Universal Secretaries is a beautifula and unique tax service html template.
	Author: HasTech
	Author URI: https://hastech.company/
	Version: 1.1

	Note: This is active js. Plugins activation code here.

**********************************************************************************/


/*===============================================================================
			[ INDEX ]
=================================================================================

	Scroll Up Activation
	Slider Activation
	Banner Slider
	Banner Slider Style 2
	Banner Slider Style 3
	Banner Content Slider
	Testimonial Content
	Testimonial Author
	Testimonial Slider Style 2 Active
	Testimonial Slider Style 3 Active
		Blog Slider
	Wowjs active
	CounterUp Active
	Mobile menu
	Videopopup
	Instafeed
	Calender
	Video Player
	Selct2 active
	Instafeed active
	Fake Loader
	
	=================================================================================
			[ END INDEX ]
================================================================================*/

(function ($) {
	'use strict';


	/* --------------------------
	   scrollUp
	---------------------------- */
	var btn = $('#backBTn');

	$(window).scroll(function () {
		if ($(window).scrollTop() > 300) {
			btn.fadeIn();
		} else {
			btn.fadeOut();
		}
	});

	btn.on('click', function (e) {
		e.preventDefault();
		$('html, body').animate({ scrollTop: 0 }, '300');
	});



	/*--
		Off Canvas Menu
	-----------------------------------*/
	/*Variables*/
	var $offCanvasNav = $('.canvas-menu'),
		$offCanvasNavSubMenu = $offCanvasNav.find('.sub-menu, .mega-sub-menu');

	/*Add Toggle Button With Off Canvas Sub Menu*/
	$offCanvasNavSubMenu.parent().prepend('<span class="mobile-menu-expand"></span>');

	/*Close Off Canvas Sub Menu*/
	$offCanvasNavSubMenu.slideUp();

	/*Category Sub Menu Toggle*/
	$offCanvasNav.on('click', 'li a, li .mobile-menu-expand, li .menu-title', function (e) {
		var $this = $(this);
		var parentClass = $this.parent().attr('class') || '';
		if ((parentClass.match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/)) && ($this.attr('href') === '#' || $this.hasClass('mobile-menu-expand'))) {
			e.preventDefault();
			if ($this.siblings('ul:visible').length) {
				$this.parent('li').removeClass('active-expand');
				$this.siblings('ul').slideUp();
			} else {
				$this.parent('li').addClass('active-expand');
				$this.closest('li').siblings('li').find('ul:visible').slideUp();
				$this.closest('li').siblings('li').removeClass('active-expand');
				$this.siblings('ul').slideDown();
			}
		}
	});

	$offCanvasNav.find('.sub-menu, .mega-sub-menu').parent('li').addClass('menu-item-has-children');
	$offCanvasNav.find('.mega-sub-menu').parent('li').css('position', 'static');




	/* Slider Activation */
	// Banner Slider
	$('.banner-slider-active').slick({
		arrows: true,
		infinite: true,
		pauseOnHover: true,
		slidesToShow: 1,
		slideToScroll: 1,
		fade: true,
		cssEase: 'ease-out',
		easing: 'ease-out',
		speed: 600,
		adaptiveHeight: true,
		prevArrow: '<button class="cr-slick-arrow cr-slick-prev"><i class="fa fa-angle-left"></i></button>',
		nextArrow: '<button class="cr-slick-arrow cr-slick-next"><i class="fa fa-angle-right"></i></button>'
	});


	// Banner Slider Style 2
	$('.banner--style2-slider-active').slick({
		arrows: false,
		infinite: true,
		pauseOnHover: true,
		slidesToShow: 1,
		slideToScroll: 1,
		fade: true,
		cssEase: 'ease-out',
		easing: 'ease-out',
		speed: 600,
		dots: true,
		adaptiveHeight: true,
	});


	// Banner Slider Style 3
	$('.banner-slider-active--with-pagination').slick({
		arrows: false,
		infinite: true,
		pauseOnHover: true,
		slidesToShow: 1,
		slideToScroll: 1,
		fade: true,
		cssEase: 'ease-out',
		easing: 'ease-out',
		speed: 600,
		dots: true,
		adaptiveHeight: true,
	});

	// Banner Content Slider
	$('.banner-contnet-slider').slick({
		arrows: true,
		infinite: true,
		pauseOnHover: true,
		slidesToShow: 1,
		slideToScroll: 1,
		cssEase: 'ease-out',
		easing: 'ease-out',
		speed: 600,
		adaptiveHeight: true,
		prevArrow: '<button class="cr-slick-arrow cr-slick-prev"><i class="fa fa-angle-left"></i></button>',
		nextArrow: '<button class="cr-slick-arrow cr-slick-next"><i class="fa fa-angle-right"></i></button>'
	});

	// Testimonial Content
	$('.testimonial-content-slider-active').slick({
		adaptiveHeight: true,
		autoplay: true,
		autoplaySpeed: 8000,
		arrows: false,
		infinite: true,
		pauseOnHover: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		asNavFor: '.testimonial-author-slider-active'
	});

	// Testimonial Author
	$('.testimonial-author-slider-active').slick({
		centerMode: true,
		autoplay: true,
		autoplaySpeed: 8000,
		arrows: false,
		focusOnSelect: true,
		infinite: true,
		pauseOnHover: true,
		slidesToShow: 3,
		slideToScroll: 1,
		asNavFor: '.testimonial-content-slider-active',
		responsive: [
			{
				breakpoint: 577,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	// Testimonial Slider Style 2 Active
	$('.testimonial-slider-active').slick({
		centerMode: true,
		autoplay: true,
		autoplaySpeed: 8000,
		arrows: false,
		focusOnSelect: true,
		infinite: true,
		pauseOnHover: true,
		slidesToShow: 3,
		slideToScroll: 1,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	// Testimonial Slider Style 3 Active
	$('.testimonial-slider-style3-active').slick({
		centerMode: true,
		autoplay: true,
		autoplaySpeed: 8000,
		arrows: false,
		focusOnSelect: true,
		infinite: true,
		pauseOnHover: true,
		slidesToShow: 2,
		slideToScroll: 1,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	// Blog Slider
	$('.blog--slider-active .blog__thumb').slick({
		arrows: true,
		infinite: true,
		pauseOnHover: true,
		slidesToShow: 1,
		slideToScroll: 1,
		prevArrow: '<button class="cr-slick-arrow cr-slick-prev"><i class="fa fa-angle-left"></i></button>',
		nextArrow: '<button class="cr-slick-arrow cr-slick-next"><i class="fa fa-angle-right"></i></button>'
	});


	// Blog Slider
	$('.pg-blog-thumb-gallery-active').slick({
		arrows: true,
		infinite: true,
		pauseOnHover: true,
		slidesToShow: 1,
		slideToScroll: 1,
		prevArrow: '<button class="cr-slick-arrow cr-slick-prev"><i class="fa fa-angle-left"></i></button>',
		nextArrow: '<button class="cr-slick-arrow cr-slick-next"><i class="fa fa-angle-right"></i></button>'
	});



	/* Wowjs active */
	new WOW().init();





	/* CounterUp Active */
	$('.counter').counterUp({
		delay: 10,
		time: 1000
	});



	/* Videopopup */
	$('.video-popup-trigger').YouTubePopUp();





	/* Calender */
	$('#my-calendar').zabuto_calendar({
		cell_border: false,
		today: true,
		show_days: true,
		weekstartson: 0,
		nav_icon: {
			prev: '<i class="fa fa-angle-left"></i>',
			next: '<i class="fa fa-angle-right"></i>'
		}
	});




	/* Video Player */
	plyr.setup('.video-player');




	/* Selct2 active */
	$('select').select2();




	/* Fake Loader */
	$('.fakeloader').fakeLoader({
		timeToHide: 1200,
		bgColor: 'rgba(225,225,225,0.95)',
		spinner: 'spinner2'
	});




})(jQuery);
