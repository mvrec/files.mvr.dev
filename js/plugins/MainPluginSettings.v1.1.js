/* © Copyright 2024 https://www.mixviberecords.com
* Licensed Code With No Open Source Code
* jQuery Codes
* MVR Developers */

(function ($) {
    'use strict';

    var browserWindow = $(window);

    // :: 1.0 Preloader Active Code
    browserWindow.on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(400).fadeOut("slow");
    });

    // :: 2.0 More Menu Active Code
    browserWindow.on("load", function () {
      // Get all dropdown toggles
      const $dropdownToggles = $('[data-togglemore="more"]');

      if ($dropdownToggles.length > 0) {
        // Function to position dropdown menu
        function positionDropdownMenu($dropdownMenu, $toggleElement) {
          const toggleRect = $toggleElement[0].getBoundingClientRect();
          const dropdownRect = $dropdownMenu[0].getBoundingClientRect();
          const screenWidth = $(window).width();

          // Calculate the left position of the dropdown menu
          let left = toggleRect.left;
          if (toggleRect.left + dropdownRect.width > screenWidth) {
            left = toggleRect.right - dropdownRect.width;
          }

          // Set the top and left positions of the dropdown menu
          $dropdownMenu.css({
            top: toggleRect.bottom,
            left: left,
          });
        }

        // Add event listener to each dropdown toggle
        $dropdownToggles.on("click", function (event) {
          event.stopPropagation(); // prevent event from bubbling up to document

          // Hide all other dropdown menus
          $dropdownToggles.not(this).next().removeClass("show");

          // Toggle the current dropdown menu
          const $dropdownMenu = $(this).next();
          $dropdownMenu.toggleClass("show");
          if ($dropdownMenu.hasClass("show")) {
            positionDropdownMenu($dropdownMenu, $(this));
          }
        });

        // Update position on window resize
        $(window).on("resize", function () {
          $dropdownToggles.each(function () {
            const $dropdownMenu = $(this).next();
            if ($dropdownMenu.hasClass("show")) {
              positionDropdownMenu($dropdownMenu, $(this));
            }
          });
        });

        // Add event listener to document to hide dropdown menu when clicking outside
        $(document).on("click", function (event) {
          const target = $(event.target);
          const isDropdownToggle = target.data("togglemore");
          const isDropdownMenu = target.hasClass("dropdown-menu");

          if (!isDropdownToggle && !isDropdownMenu) {
            $dropdownToggles.next().removeClass("show");
          }
        });
      }
    });

    // :: 3.0 Sliders Active Code
    if ($.fn.owlCarousel) {
        var welcomeSlide = $('.hero-slides');
        var testimonials = $('.testimonials-slide');
        var albumSlides = $('.albums-slideshow');

        welcomeSlide.owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            nav: false,
            dots: false,
            autoplay: true,
            autoplayTimeout: 7000,
            smartSpeed: 1000,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut'
        });

        welcomeSlide.on('translate.owl.carousel', function () {
            var slideLayer = $("[data-animation]");
            slideLayer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).removeClass('animated ' + anim_name).css('opacity', '0');
            });
        });

        welcomeSlide.on('translated.owl.carousel', function () {
            var slideLayer = welcomeSlide.find('.owl-item.active').find("[data-animation]");
            slideLayer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).addClass('animated ' + anim_name).css('opacity', '1');
            });
        });

        $("[data-delay]").each(function () {
            var anim_del = $(this).data('delay');
            $(this).css('animation-delay', anim_del);
        });

        $("[data-duration]").each(function () {
            var anim_dur = $(this).data('duration');
            $(this).css('animation-duration', anim_dur);
        });

        testimonials.owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            dots: false,
            autoplay: true
        });

        albumSlides.owlCarousel({
            items: 5,
            margin: 30,
            loop: true,
            nav: true,
            navText: ['<i class="fa fa-angle-double-left"></i>', '<i class="fa fa-angle-double-right"></i>'],
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 750,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 4
                },
                1200: {
                    items: 5
                }
            }
        });
    }

    // :: 4.0

    // :: 5.0

    // :: 6.0

    // :: 7.0 CounterUp Active Code
    if ($.fn.counterUp) {
        $('.counter').counterUp({
            delay: 10,
            time: 2000
        });
    }

    // :: 8.0

    // :: 9.0 

    // :: 10.0 audioPlayer Active Code
    if ($.fn.audioPlayer) {
        $('audio').audioPlayer();
    }

    // :: 11.0 Tooltip Active Code
    if ($.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip()
    }

    // :: 12.0 prevent default a click
    $('a[href="#"]').on('click', function ($) {
        $.preventDefault();
    });

    // :: 13.0 wow Active Code
    if (browserWindow.width() > 767) {
        new WOW().init();
    }
    
    // :: 14.0 Gallery Menu Active Code
    $('.catagory-menu a').on('click', function () {
        $('.catagory-menu a').removeClass('active');
        $(this).addClass('active');
    })

     // :: 15.0 Set Background Image
     $('.set-bg').each(function() {
		var bg = $(this).data('bgimg');
		$(this).css('background-image', 'url(' + bg + ')');
	});
     $('.bg-img').each(function() {
		var bg = $(this).data('bgimg');
		$(this).css('background-image', 'url(' + bg + ')');
	});

})(jQuery);