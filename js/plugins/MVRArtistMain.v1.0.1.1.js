/* 
| © Copyright 2024 https://www.mixviberecords.com
| Author: Mix Vibe Records
| Version: 1.0.0
| Licensed Code With No Open Source Code
| jQuery Codes
| MVR Developers
*/

(function ($) {
  "use strict";
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
    stickyHeader();
    dynamicBackground();
    slickInit();
    hobbleEffect();
    scrollUp();
    coverArtMoreOption();
    pinnedStatus();
   // youTubeVideosTab();
   // youTubePlaylistVideosTab();
    if ($.exists(".wow")) {
      new WOW().init();
    }
  });

  $(window).on("scroll", function () {
    //  counterInit();
    // parallaxEffect();
    showScrollUp();
  });

  // :: Preloader
  function preloader() {
    $(".loader").fadeOut();
    $("#preloder").delay(400).fadeOut("slow");
    $(".cs-preloader_in").fadeOut();
    $(".cs-preloader").delay(150).fadeOut("slow");
  }

  // :: Sticky Header
  function stickyHeader() {
    var $window = $(window);
    var lastScrollTop = 0;
    var $header = $(".cs-sticky_header");
    var headerHeight = $header.outerHeight() + 30;

    $window.scroll(function () {
      var windowTop = $window.scrollTop();

      if (windowTop >= headerHeight) {
        $header.addClass("cs-gescout_sticky");
      } else {
        $header.removeClass("cs-gescout_sticky");
        $header.removeClass("cs-gescout_show");
      }

      if ($header.hasClass("cs-gescout_sticky")) {
        if (windowTop < lastScrollTop) {
          $header.addClass("cs-gescout_show");
        } else {
          $header.removeClass("cs-gescout_show");
        }
      }

      lastScrollTop = windowTop;
    });
  }

  // :: Dynamic Background
  function dynamicBackground() {
    $("[data-src]").each(function () {
      var src = $(this).attr("data-src");
      $(this).css({
        "background-image": "url(" + src + ")",
      });
    });
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
      .on("mousemove", ".cs-hobble", function (event) {
        var halfW = this.clientWidth / 2;
        var halfH = this.clientHeight / 2;
        var coorX = halfW - (event.pageX - $(this).offset().left);
        var coorY = halfH - (event.pageY - $(this).offset().top);
        var degX1 = (coorY / halfH) * 8 + "deg";
        var degY1 = (coorX / halfW) * -8 + "deg";
        var degX2 = (coorY / halfH) * -50 + "px";
        var degY2 = (coorX / halfW) * 70 + "px";
        var degX3 = (coorY / halfH) * -10 + "px";
        var degY3 = (coorX / halfW) * 10 + "px";
        var degX4 = (coorY / halfH) * 15 + "deg";
        var degY4 = (coorX / halfW) * -15 + "deg";
        var degX5 = (coorY / halfH) * -30 + "px";
        var degY5 = (coorX / halfW) * 60 + "px";

        $(this)
          .find(".cs-hover_layer1")
          .css("transform", function () {
            return "perspective( 800px ) translate3d( 0, 0, 0 ) rotateX(" + degX1 + ") rotateY(" + degY1 + ")";
          });
        $(this)
          .find(".cs-hover_layer2")
          .css("transform", function () {
            return "perspective( 800px ) translateY(" + degX2 + ") translateX(" + degY2 + ")";
          });
        $(this)
          .find(".cs-hover_layer3")
          .css("transform", function () {
            return "perspective( 800px ) translateX(" + degX3 + ") translateY(" + degY3 + ") scale(1.02)";
          });
      })
      .on("mouseout", ".cs-hobble", function () {
        $(this).find(".cs-hover_layer1").removeAttr("style");
        $(this).find(".cs-hover_layer2").removeAttr("style");
        $(this).find(".cs-hover_layer3").removeAttr("style");
      });
  }

  // :: 7.0 CounterUp Active Code
  if ($.fn.counterUp) {
    $(".counter").counterUp({
      delay: 10,
      time: 2000,
    });
  }

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

  // :: Album Cover More Option
  function coverArtMoreOption() {
    $(".mv_cover_more_icon").on("click", function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var $box = $(this).closest(".more_options_box");
      var $menu = $box.find("ul.cover_more_option");
      var $overlay = $box.find(".ms_tranding_box_overlay");
      if ($menu.hasClass("cover_open_option")) {
        $menu.removeClass("cover_open_option");
        $overlay.removeClass("active");
      } else {
        $("ul.cover_more_option.cover_open_option").removeClass("cover_open_option");
        $menu.addClass("cover_open_option");
        $(".ms_tranding_box_overlay.active").removeClass("active");
        $overlay.addClass("active");
      }
    });

    $(document).on("click", function () {
      $("ul.cover_more_option.cover_open_option").removeClass("cover_open_option");
      $(".ms_tranding_box_overlay.active").removeClass("active");
    });
  }
  // :: Artist Profie DP Status
  function pinnedStatus() {
    $(document).ready(function () {
      const $targetSpan = $("span[data-pin-track], span[data-pin-album]");
      if ($targetSpan.length > 0) {
        let pinId = $targetSpan.attr("data-pin-track");
        let embedType = "track";
        if (!pinId) {
          pinId = $targetSpan.attr("data-pin-album");
          embedType = "album";
        }
        if (pinId) {
          $(".profile__img").addClass("status");
          $(".profile__img").append('<div class="dot-lg"></div><div class="gradient-ring"></div>');
          $("#data-pin").attr({
            src: `https://open.spotify.com/embed/${embedType}/${pinId}?theme=0`,
          });
        }
      }
      var $pinbox = $(".pinStsCnt");
      var $pinboxClose = $(".pinBox .pClose");
      var $pinboxovly = $(".pinfClose");
      $(".profile__img.status").on("click", function (e) {
        e.preventDefault();
        $pinbox.toggleClass("show");
        $pinboxovly.toggleClass("show");
      });
      $pinboxClose.on("click", function (e) {
        e.preventDefault();
        $pinbox.removeClass("show");
        $pinboxovly.removeClass("show");
      });
    });
  }
  // :: Artist Profie YouTube Tab
  function youTubeVideosTab() {
    $(document).ready(function () {
      const $targetSpan = $("span[data-yt-video]");
      let pinId = $targetSpan.attr("data-yt-video");
      if (pinId) {
        $(".tab-content").append(`<div role="tabpanel" class="tab-pane" id="artist-videos"><div class="aRt-dTls-bx border-bottom"><div class="aRt_heading_btn_bx"><h6>Recent YouTube Uploads</h6><div class="aRt_heading_btn"><a href="https://www.youtube.com/channel/${pinId}" target="_blank"><div class="cs-center aRt_btn_view-all">View All </div></a></div></div><div class="cs-height_10 cs-height_lg_20"></div><div class="row" id="yTvideos"></div></div></div>`);
        $(".artist_navigation_tabs").append(`<span role="presentation"><a href="#artist-videos" class="font-NPB navigation_tab_btns tab_btns_size_md variant-secondary" aria-controls="related-artists" role="tab" data-toggle="tab" aria-expanded="false"><i class="fa-brands fa-youtube"></i> Videos</a></span>`);
        const $ytvcontainer = $("#yTvideos");
        setTimeout(function () {
          if ($ytvcontainer) {
            const feedURL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${pinId}`)}`;
            $.getJSON(feedURL, function (data) {
              if (!data.items) return;
              data.items.forEach((item) => {
                const videoID = item.link.split("v=")[1];
                const date = new Date(item.pubDate);
                const day = ("0" + date.getDate()).slice(-2);
                const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
                const month = monthNames[date.getMonth()];
                const videoHTML = `<div class="col-12 col-md-6 col-lg-4"><div class="blog-grid"><div class="blog-img"><div class="date"><span>${day}</span><label>${month}</label></div><a href="https://youtube.com/watch?v=${videoID}" target="_blank"><img src="https://img.youtube.com/vi/${videoID}/maxresdefault.jpg" title="${item.title}" alt="${item.title}"></a></div><div class="blog-info"><h6 class="ellipsis"><a href="https://youtube.com/watch?v=${videoID}" target="_blank">${item.title}</a></h6><div class="btn-bar"></div></div></div></div>`;
                $ytvcontainer.append(videoHTML);
              });
            });
          }
        }, 2000);
      } else {
        // console.log("data-yt-video not enabled");
      }
    });
  }
  // :: Artist Profie YouTube Playlist Tab
  function youTubePlaylistVideosTab() {
    $(document).ready(function () {
      const $targetSpan = $("span[data-yt-playlist]");
      let pinId = $targetSpan.attr("data-yt-playlist");
      if (pinId) {
        $(".tab-content").append(`<div role="tabpanel" class="tab-pane" id="artist-playlist-videos"><div class="aRt-dTls-bx border-bottom"><div class="aRt_heading_btn_bx"><h6>Featured YouTube Playlist</h6><div class="aRt_heading_btn"><a href="https://youtube.com/playlist?list=${pinId}" target="_blank"><div class="cs-center aRt_btn_view-all">View All </div></a></div></div><div class="cs-height_10 cs-height_lg_20"></div><div class="row" id="yTpvideos"></div></div></div>`);
        $(".artist_navigation_tabs").append(`<span role="presentation"><a href="#artist-playlist-videos" class="font-NPB navigation_tab_btns tab_btns_size_md variant-secondary" aria-controls="related-artists" role="tab" data-toggle="tab" aria-expanded="false"><i class="fa-brands fa-youtube"></i> Playlist Videos</a></span>`);
        const $ytvcontainer = $("#yTpvideos");
        setTimeout(function () {
          if ($ytvcontainer) {
            const feedURL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?playlist_id=${pinId}`)}`;
            $.getJSON(feedURL, function (data) {
              if (!data.items) return;
              data.items.forEach((item) => {
                const videoID = item.link.split("v=")[1];
                const date = new Date(item.pubDate);
                const day = ("0" + date.getDate()).slice(-2);
                const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
                const month = monthNames[date.getMonth()];
                const videoHTML = `<div class="col-12 col-md-6 col-lg-4"><div class="blog-grid"><div class="blog-img"><div class="date"><span>${day}</span><label>${month}</label></div><a href="https://youtube.com/watch?v=${videoID}" target="_blank"><img src="https://img.youtube.com/vi/${videoID}/maxresdefault.jpg" title="${item.title}" alt="${item.title}"></a></div><div class="blog-info"><h6 class="ellipsis"><a href="https://youtube.com/watch?v=${videoID}" target="_blank">${item.title}</a></h6><div class="btn-bar"></div></div></div></div>`;
                $ytvcontainer.append(videoHTML);
              });
            });
          }
        }, 2000);
      } else {
        // console.log("data-yt-video not enabled");
      }
    });
  }

  // :: Scroll Up
  function scrollUp() {
    $(".cs-scrollup").on("click", function (e) {
      e.preventDefault();
      $("html,body").animate(
        {
          scrollTop: 0,
        },
        0
      );
    });
  }
  // :: For Scroll Up
  function showScrollUp() {
    let scroll = $(window).scrollTop();
    if (scroll >= 350) {
      $(".cs-scrollup").addClass("cs-scrollup_show");
    } else {
      $(".cs-scrollup").removeClass("cs-scrollup_show");
    }
  }

  // :: Cursor Animation
  $(document).ready(function () {
    $(function () {
      $("body").append('<span class="cs-cursor_lg d"></span>');
      $("body").append('<span class="cs-cursor_sm"></span>');
      $(".cs-text_btn, .cs-site_header a, .cs-down_btn, .cs-social_btns a, .cs-menu_widget").on("mouseenter", function () {
        $(".cs-cursor_lg").addClass("opacity-0");
        $(".cs-cursor_sm").addClass("opacity-0");
      });
      $(".cs-text_btn, .cs-site_header a, .cs-down_btn, .cs-social_btns a, .cs-menu_widget").on("mouseleave", function () {
        $(".cs-cursor_lg").removeClass("opacity-0");
        $(".cs-cursor_sm").removeClass("opacity-0");
      });
    });
    function cursorMovingAnimation(event) {
      try {
        const timing = gsap.timeline({
          defaults: {
            x: event.clientX,
            y: event.clientY,
          },
        });
        timing.to(".cs-cursor_lg", { ease: "power2.out" }).to(".cs-cursor_sm", { ease: "power2.out" }, "-=0.4");
      } catch (err) {
        console.log(err);
      }
    }
    document.addEventListener("mousemove", cursorMovingAnimation);
  });
})(jQuery);
