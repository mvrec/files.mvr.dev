/* © Copyright 2024 https://www.mixviberecords.com
 * Licensed Code With No Open Source Code
 * jQuery Codes
 * MVR Developers */

(function ($) {
  "use strict";

  var browserWindow = $(window);
  // :: Scripts initialization
  $.exists = function (selector) {
    return $(selector).length > 0;
  };

  $(window).on("load", function () {
    //$(window).trigger('scroll');
    //$(window).trigger('resize');
    preloader();
    // isotopInit();
  });

  $(function () {
    // $(window).trigger('resize');
    // mainNav();
    // stickyHeader();
    // dynamicBackground();
    slickInit();
    // isotopInit();
    // review();
    // modalVideo();
    // tabs();
    //  accordian();
    //  counterInit();
    //  rippleInit();
    //  parallaxEffect();
    hobbleEffect();
    //  hoverTab();
    //  lightGalleryInit();
    //  scrollUp();
    //  portfolioSection();
    //   parallaxSwiperSlider();
    //  fullScreenSwiperSlider();
    //  ecommerce();
     if ($.exists('.wow')) {
       new WOW().init();
     }
  });

  // :: Preloader
  function preloader() {
    $(".loader").fadeOut();
    $("#preloder").delay(400).fadeOut("slow");
  }

  // :: Slick Slider
  function slickInit() {
    if ($.exists(".cs-slider")) {
      $(".cs-slider").each(function () {
        // Slick Variable
        var $ts = $(this).find(".cs-slider_container");
        var $slickActive = $(this).find(".cs-slider_wrapper");

        // Auto Play
        var autoPlayVar = parseInt($ts.attr("data-autoplay"), 10);
        // Auto Play Time Out
        var autoplaySpdVar = 3000;
        if (autoPlayVar > 1) {
          autoplaySpdVar = autoPlayVar;
          autoPlayVar = 1;
        }
        // Slide Change Speed
        var speedVar = parseInt($ts.attr("data-speed"), 10);
        // Slider Loop
        var loopVar = Boolean(parseInt($ts.attr("data-loop"), 10));
        // Slider Center
        var centerVar = Boolean(parseInt($ts.attr("data-center"), 10));
        // Variable Width
        var variableWidthVar = Boolean(parseInt($ts.attr("data-variable-width"), 10));
        // Pagination
        var paginaiton = $(this).find(".cs-pagination").hasClass("cs-pagination");
        // Slide Per View
        var slidesPerView = $ts.attr("data-slides-per-view");
        if (slidesPerView == 1) {
          slidesPerView = 1;
        }
        if (slidesPerView == "responsive") {
          var slidesPerView = parseInt($ts.attr("data-add-slides"), 10);
          var lgPoint = parseInt($ts.attr("data-lg-slides"), 10);
          var mdPoint = parseInt($ts.attr("data-md-slides"), 10);
          var smPoint = parseInt($ts.attr("data-sm-slides"), 10);
          var xsPoing = parseInt($ts.attr("data-xs-slides"), 10);
        }
        // Fade Slider
        var fadeVar = parseInt($($ts).attr("data-fade-slide"));
        fadeVar === 1 ? (fadeVar = true) : (fadeVar = false);

        // Slick Active Code
        $slickActive.slick({
          autoplay: autoPlayVar,
          dots: paginaiton,
          centerPadding: "28%",
          speed: speedVar,
          infinite: loopVar,
          autoplaySpeed: autoplaySpdVar,
          centerMode: centerVar,
          fade: fadeVar,
          prevArrow: $(this).find(".cs-left_arrow"),
          nextArrow: $(this).find(".cs-right_arrow"),
          appendDots: $(this).find(".cs-pagination"),
          slidesToShow: slidesPerView,
          variableWidth: variableWidthVar,
          // slidesToScroll: slidesPerView,
          responsive: [
            {
              breakpoint: 1600,
              settings: {
                slidesToShow: lgPoint,
                // slidesToScroll: lgPoint,
              },
            },
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: mdPoint,
                // slidesToScroll: mdPoint,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: smPoint,
                // slidesToScroll: smPoint,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: xsPoing,
                slidesToScroll: xsPoing,
              },
            },
          ],
        });
      });
    }
    // Testimonial Slider
    $(".slider-for").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      asNavFor: ".slider-nav",
    });

    $(".slider-nav").slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      asNavFor: ".slider-for",
      dots: true,
      centerMode: true,
      focusOnSelect: true,
      variableWidth: true,
    });
  }

  // :: 3.0 Sliders Active Code
  if ($.fn.owlCarousel) {
    var welcomeSlide = $(".hero-slides");
    var testimonials = $(".testimonials-slide");
    var albumSlides = $(".albums-slideshow");

    welcomeSlide.owlCarousel({
      items: 1,
      margin: 0,
      loop: true,
      nav: false,
      dots: false,
      autoplay: true,
      autoplayTimeout: 7000,
      smartSpeed: 1000,
      animateIn: "fadeIn",
      animateOut: "fadeOut",
    });

    welcomeSlide.on("translate.owl.carousel", function () {
      var slideLayer = $("[data-animation]");
      slideLayer.each(function () {
        var anim_name = $(this).data("animation");
        $(this)
          .removeClass("animated " + anim_name)
          .css("opacity", "0");
      });
    });

    welcomeSlide.on("translated.owl.carousel", function () {
      var slideLayer = welcomeSlide.find(".owl-item.active").find("[data-animation]");
      slideLayer.each(function () {
        var anim_name = $(this).data("animation");
        $(this)
          .addClass("animated " + anim_name)
          .css("opacity", "1");
      });
    });

    $("[data-delay]").each(function () {
      var anim_del = $(this).data("delay");
      $(this).css("animation-delay", anim_del);
    });

    $("[data-duration]").each(function () {
      var anim_dur = $(this).data("duration");
      $(this).css("animation-duration", anim_dur);
    });

    testimonials.owlCarousel({
      items: 1,
      margin: 0,
      loop: true,
      dots: false,
      autoplay: true,
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
          items: 1,
        },
        480: {
          items: 2,
        },
        768: {
          items: 3,
        },
        992: {
          items: 4,
        },
        1200: {
          items: 5,
        },
      },
    });
  }

  // :: 4.0 Popup Single Image
  if ($.fn.magnificPopup) {
    $(".image-popup-vertical-fit").magnificPopup({
      type: "image",
      closeOnContentClick: true,
      mainClass: "mfp-img-mobile",
      image: {
        verticalFit: true,
      },
    });
  }

  // :: 5.0 Popup Image Gallery
  if ($.fn.magnificPopup) {
    $(".popup-gallery").magnificPopup({
      delegate: "a",
      type: "image",
      tLoading: "Loading image #%curr%...",
      mainClass: "mfp-img-mobile",
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
      },
      image: {
        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
        titleSrc: function (item) {
          return item.el.attr("title") + " by Mix Vibe Records";
        },
      },
    });
  }

  // :: Hobble Effect
  function hobbleEffect() {
    $(document)
      .on('mousemove', '.cs-hobble', function (event) {
        var halfW = this.clientWidth / 2;
        var halfH = this.clientHeight / 2;
        var coorX = halfW - (event.pageX - $(this).offset().left);
        var coorY = halfH - (event.pageY - $(this).offset().top);
        var degX1 = (coorY / halfH) * 8 + 'deg';
        var degY1 = (coorX / halfW) * -8 + 'deg';
        var degX2 = (coorY / halfH) * -50 + 'px';
        var degY2 = (coorX / halfW) * 70 + 'px';
        var degX3 = (coorY / halfH) * -10 + 'px';
        var degY3 = (coorX / halfW) * 10 + 'px';
        var degX4 = (coorY / halfH) * 15 + 'deg';
        var degY4 = (coorX / halfW) * -15 + 'deg';
        var degX5 = (coorY / halfH) * -30 + 'px';
        var degY5 = (coorX / halfW) * 60 + 'px';

        $(this)
          .find('.cs-hover_layer1')
          .css('transform', function () {
            return (
              'perspective( 800px ) translate3d( 0, 0, 0 ) rotateX(' +
              degX1 +
              ') rotateY(' +
              degY1 +
              ')'
            );
          });
        $(this)
          .find('.cs-hover_layer2')
          .css('transform', function () {
            return (
              'perspective( 800px ) translateY(' +
              degX2 +
              ') translateX(' +
              degY2 +
              ')'
            );
          });
        $(this)
          .find('.cs-hover_layer3')
          .css('transform', function () {
            return (
              'perspective( 800px ) translateX(' +
              degX3 +
              ') translateY(' +
              degY3 +
              ') scale(1.02)'
            );
          });
      })
      .on('mouseout', '.cs-hobble', function () {
        $(this).find('.cs-hover_layer1').removeAttr('style');
        $(this).find('.cs-hover_layer2').removeAttr('style');
        $(this).find('.cs-hover_layer3').removeAttr('style');
      });
  }

  // :: 7.0 CounterUp Active Code
  if ($.fn.counterUp) {
    $(".counter").counterUp({
      delay: 10,
      time: 2000,
    });
  }

  // :: 8.0

  // :: 9.0

  // :: 10.0 audioPlayer Active Code
  if ($.fn.audioPlayer) {
    $("audio").audioPlayer();
  }

  // :: 11.0 Tooltip Active Code
  if ($.fn.tooltip) {
    $('[data-toggle="tooltip"]').tooltip();
  }

  // :: 12.0 prevent default a click
  $('a[href="#"]').on("click", function ($) {
    $.preventDefault();
  });

  // :: 14.0 Gallery Menu Active Code
  $(".catagory-menu a").on("click", function () {
    $(".catagory-menu a").removeClass("active");
    $(this).addClass("active");
  });

  // :: 15.0 Set Background Image
  $(".set-bg").each(function () {
    var bg = $(this).data("bgimg");
    $(this).css("background-image", "url(" + bg + ")");
  });
  $(".bg-img").each(function () {
    var bg = $(this).data("bgimg");
    $(this).css("background-image", "url(" + bg + ")");
  });
})(jQuery);
