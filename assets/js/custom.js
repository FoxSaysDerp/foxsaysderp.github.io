(function($){

	/* ---------------------------------------------- /*
	 * Preloader
	/* ---------------------------------------------- */

	$(window).load(function() {
		$('#status').fadeOut();
		$('#preloader').delay(350).fadeOut('slow');
	});

	$(document).ready(function() {

		/* ---------------------------------------------- /*
		 * Initialization General Scripts for all pages
		/* ---------------------------------------------- */

		HeroHeight();
		NavbarSubmenu();

		$(window).resize(function() {
			NavbarSubmenu();
			HeroHeight();
		});

		/* ---------------------------------------------- /*
		 * One page navigation
		/* ---------------------------------------------- */

		$('body').scrollspy({
			target: '.navbar-custom',
			offset: 80
		})

		/* ---------------------------------------------- /*
		 * Transparent navbar animation
		/* ---------------------------------------------- */

		var navtransp = $('.navbar-transparent');
		var hero = $('.intro-module');
		var navHeight = navtransp.height();

		if (navtransp.length > 0 && hero.length > 0) {
			$(window).scroll(function() {
				if($(this).scrollTop() >= navHeight) {
					navtransp.removeClass('navbar-transparent');
				} else {
					navtransp.addClass('navbar-transparent');
				}
			});
		} else {
			navtransp.removeClass('navbar-transparent');
		}

		/* ---------------------------------------------- /*
		 * Navbar submenu
		/* ---------------------------------------------- */

		function NavbarSubmenu() {
			var width = Math.max($(window).width(), window.innerWidth);
			if (width > 767) {
				$('.dropdown').on('shown.bs.dropdown', function () {
					if ($('.dropdown-submenu', $(this)).length) {
						var MenuLeftOffset = $('.dropdown-menu', $(this)).offset().left;
						var Menu1Level     = $(this).children('.dropdown-menu').width();
						var Menu2Level     = $(this).find('.dropdown-menu .dropdown-menu').width();
						if(width - MenuLeftOffset - Menu1Level < Menu2Level) {
							$(this).children('.dropdown-menu').addClass('left-side');
						} else {
							$(this).children('.dropdown-menu').removeClass('left-side');
						}
					}
				});
			} else {
				$('.dropdown-toggle').not('.binded').addClass('binded').on('click', function () {
					$(this).toggleClass('angle-up');
				});
				$('.dropdown-submenu > a').not('.binded').addClass('binded').on('click', function () {
					$(this).toggleClass('angle-up');
					var Menu2Level = $(this).next('.dropdown-menu');
					Menu2Level.toggleClass('dropdown-open');
					return false;
				});
			}
		}

		/* ---------------------------------------------- /*
		 * Navbar collapse on click
		/* ---------------------------------------------- */

		$(document).on('click','.navbar-collapse.in',function(e) {
			if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
				$(this).collapse('hide');
			}
		});

		/* ---------------------------------------------- /*
		 * Hero height
		/* ---------------------------------------------- */

		function HeroHeight() {
			$('.heightfull').height($(window).height());
		}

		/* ---------------------------------------------- /*
		 * Parallax images on mobile
		/* ---------------------------------------------- */

		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			$('.parallax').each(function(){
				$(this).css({'background-attachment': 'scroll'});
			});
		}

		/* ---------------------------------------------- /*
		 * Slideshow background
		/* ---------------------------------------------- */

		$('.slideshow').backstretch([
			'assets/images/home-1.jpg',
			'assets/images/home-2.jpg',
			'assets/images/home-3.jpg'
		], {duration: 1800, fade: 600});

		/* ---------------------------------------------- /*
		 * Video background
		/* ---------------------------------------------- */

		var $videoBackground = $('.video-background');

		if ($videoBackground.length > 0) {
			var BV = new $.BigVideo({
				container: $('.video-background'),
				useFlashForFirefox: false
			});
			BV.init();
			BV.show(
				{ type: 'video/mp4',   src: 'assets/video/video.mp4', ambient:true },
				{ type: 'video/webm',  src: 'assets/video/video.webm', ambient:true },
				{ type: 'video/ogg',   src: 'assets/video/video.ogv', ambient:true }
			);
		}

		/* ---------------------------------------------- /*
		 * Intro, testimonials slider
		/* ---------------------------------------------- */

		$('.intro-slider').owlCarousel({
			paginationSpeed: 600,
			pagination: false,
			navigation: false,
			singleItem: true,
			slideSpeed: 600,
			autoPlay: 3000
		});

		$('.testimonials-slider').owlCarousel({
			paginationSpeed: 600,
			pagination: false,
			navigation: false,
			singleItem: true,
			slideSpeed: 300,
			autoPlay: 5000
		});

		/* ---------------------------------------------- /*
		 * Equal height columns
		/* ---------------------------------------------- */

		$(function() {
			$('.equal-height').matchHeight();
		});

		/* ---------------------------------------------- /*
		 * Service hover effect
		/* ---------------------------------------------- */

		var service_item = $('.iconbox');

		service_item.mouseenter(function(){
			if (!(service_item.hasClass('service-opened'))) {
				$(this).addClass('js-hovered');
				service_item.filter(':not(.js-hovered)').addClass('js-fade');
			}
		});

		service_item.mouseleave(function(){
			if (!(service_item.hasClass('service-opened'))) {
				$(this).removeClass('js-hovered');
				service_item.removeClass('js-fade');
			}
		});


		/* ---------------------------------------------- /*
		 * Popup images
		/* ---------------------------------------------- */

		$('a.popup-image').magnificPopup({
			type: 'image',
			image: {
				titleSrc: 'title',
				tError: 'The image could not be loaded.',
			}
		});

		$('a.gallery').magnificPopup({
			type: 'image',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1]
			},
			image: {
				titleSrc: 'title',
				tError: 'The image could not be loaded.',
			}
		});

		/* ---------------------------------------------- /*
		 * WOW Animation When You Scroll
		/* ---------------------------------------------- */

		wow = new WOW({
			mobile: false
		});
		wow.init();


		/* ---------------------------------------------- /*
		 * Contact form ajax
		/* ---------------------------------------------- */

		$('#contact-form').find('input,textarea').jqBootstrapValidation({
			preventSubmit: true,
			submitError: function($form, event, errors) {
				// additional error messages or events
			},
			submitSuccess: function($form, event) {
				event.preventDefault();

				var submit          = $('#contact-form submit');
				var ajaxResponse    = $('#contact-response');

				var name            = $('input#cname').val();
				var email           = $('input#cemail').val();
				var message         = $('textarea#cmessage').val();

				$.ajax({
					type: 'POST',
					url: 'assets/php/contact.php',
					dataType: 'json',
					data: {
						name: name,
						email: email,
						message: message,
					},
					cache: false,
					beforeSend: function(result) {
						submit.empty();
						submit.append('<i class="fa fa-cog fa-spin"></i> Wait...');
					},
					success: function(result) {
						if(result.sendstatus == 1) {
							ajaxResponse.html(result.message);
							$form.fadeOut(500);
						} else {
							ajaxResponse.html(result.message);
						}
					}
				});
			}
		});

		/* ---------------------------------------------- /*
		 * Google Map
		/* ---------------------------------------------- */

		var mapLocation = new google.maps.LatLng(50.0587186,19.9443,18.25);

		var $mapis = $('#map');

		if ($mapis.length > 0) {

			map = new GMaps({
				streetViewControl : false,
				overviewMapControl: false,
				mapTypeControl: false,
				zoomControl : false,
				panControl : false,
				scrollwheel: false,
				center: mapLocation,
				el: '#map',
				zoom: 18,
				styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
			});

			var image = new google.maps.MarkerImage('assets/images/map-icon.png',
				new google.maps.Size(80, 80),
				new google.maps.Point(0, 0),
				new google.maps.Point(40, 40)
			);

			map.addMarker({
				position: mapLocation,
				icon: image,
				animation: google.maps.Animation.BOUNCE,
			});

		}

		/* ---------------------------------------------- /*
		 * Animated scrolling / Scroll Up
		/* ---------------------------------------------- */

		$('.page-scroll a').bind('click', function(e){
			var anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $(anchor.attr('href')).offset().top
			}, 1000);
			e.preventDefault();
		});

		$(window).scroll(function() {
			if ($(this).scrollTop() > 100) {
				$('.scroll-up').fadeIn();
			} else {
				$('.scroll-up').fadeOut();
			}
		});

		$('a[href="#totop"]').click(function() {
			$('html, body').animate({ scrollTop: 0 }, 'slow');
			return false;
		});

	});

})(jQuery);