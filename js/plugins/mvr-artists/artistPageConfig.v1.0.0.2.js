
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

  $(function () {
    nonClaimed();
    pinnedStatus();
    copyInputs();
    youTubeVideosTab();
    youTubePlaylistVideosTab();
  });

  function nonClaimed() {
    $(document).ready(function () {
      $(".artist__avatar").hasClass("artist__avatar--verified")
        ? ($("#NonClaimPromo").remove())
        : ($("#NonClaimPromo").show(),
          $(".artist__nickname").text("NOT CLAIMED"),
          $(".artist__social").remove(),
          $(".artist__sinfo").remove(),
          $(".artist__link").remove(),
          $(".artist_main__artist").css({
            "background-image": "url(https://cdn.jsdelivr.net/gh/mvrec/files.mvr.dev@master/img/bgimgs/mixbgmx8.webp)"}));
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
          $(".artist__avatar").addClass("status");
          $(".artist__avatar").append('<div class="gradient-rng"></div>');
          $("#data-pin").attr({
            src: `https://open.spotify.com/embed/${embedType}/${pinId}?theme=0`,
          });
        }
      }
      var $pinbox = $(".pinStsCnt");
      var $pinboxClose = $(".pinBox .pClose");
      var $pinboxovly = $(".pinfClose");
      $(".artist__avatar.status").on("click", function (e) {
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
      const $videoSpan = $("span[data-yt-video]");
      let videoChannelId = $videoSpan.attr("data-yt-video");
      if (videoChannelId) {
        $(".tab-content").append(
          `<div id="tab-video" role="tabpanel" class="tab-pane fade"><div class="aRt-dTls-bx border-bottom contentbox--profile"><div class="aRt_heading_btn_bx"><h6>YouTube Uploads</h6><div class="aRt_heading_btn"><a href="https://www.youtube.com/channel/${videoChannelId}?sub_confirmation=1" target="_blank"><div class="cs-center aRt_btn_view-all subscribe"><i class="fa-brands fa-youtube"></i> Subscribe</div></a></div></div><div class="cs-height_10 cs-height_lg_20"></div><div class="row" id="yTvideos"></div></div></div>`
        );
        $("#profile__tabs li")
          .last()
          .before(
            `<li class="nav-tabs" role="presentation"><a class="nav-link" data-bs-toggle="tab" href="#tab-video" role="tab" aria-controls="tab-video" aria-selected="false">Videos</a></li>`
          );
        const $ytvcontainer = $("#yTvideos");
        setTimeout(function () {
          if ($ytvcontainer) {
            const ytvfeedURL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
              `https://www.youtube.com/feeds/videos.xml?channel_id=${videoChannelId}`
            )}`;
            $.getJSON(ytvfeedURL, function (data) {
              if (!data.items) return;
              data.items.forEach((item) => {
                const ytvvideoID = item.link.split("v=")[1];
                const ytvdate = new Date(item.pubDate);
                const ytvday = ("0" + ytvdate.getDate()).slice(-2);
                const ytvmonthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
                const ytvmonth = ytvmonthNames[ytvdate.getMonth()];
                const ytvvideoHTML = `<div class="col-12 col-md-6 col-lg-4"><div class="blog-grid"><div class="blog-img"><div class="date"><span>${ytvday}</span><label>${ytvmonth}</label></div><a href="https://youtube.com/watch?v=${ytvvideoID}" target="_blank"><img src="https://img.youtube.com/vi/${ytvvideoID}/maxresdefault.jpg" title="${item.title}" alt="${item.title}"></a></div><div class="blog-info"><h6 class="ellipsis"><a href="https://youtube.com/watch?v=${ytvvideoID}" target="_blank">${item.title}</a></h6><div class="btn-bar"></div></div></div></div>`;
                $ytvcontainer.append(ytvvideoHTML);
              });
            });
          }
        }, 2000);
      }
    });
  }
  // :: Artist Profie YouTube Playlist Tab
  function youTubePlaylistVideosTab() {
    $(document).ready(function () {
      const $playlistSpan = $("span[data-yt-playlist]");
      const playlistIdStr = $playlistSpan.attr("data-yt-playlist");
      if (playlistIdStr) {
        const playlistIds = playlistIdStr.split(",").map((id) => id.trim());
        $(".tab-content").append(
          `<div id="tab-yt-playlist" role="tabpanel" class="tab-pane fade"><div class="aRt-dTls-bx border-bottom contentbox--profile"><div class="aRt_heading_btn_bx"><h6>Featured YouTube Playlist${
            playlistIds.length > 1 ? "s" : ""
          }</h6><div class="aRt_heading_btn"></div></div><div class="cs-height_10 cs-height_lg_20"></div><div class="yTp-container" id="yTpvideos"></div></div></div>`
        );
        $("#profile__tabs li")
          .last()
          .before(
            `<li class="nav-tabs" role="presentation"><a class="nav-link" data-bs-toggle="tab" href="#tab-yt-playlist" role="tab" aria-controls="tab-yt-playlist" aria-selected="false">YT Playlists</a></li>`
          );
        const $ytvpcontainer = $("#yTpvideos");
        setTimeout(function () {
          if ($ytvpcontainer) {
            const ytvpfetchPromises = playlistIds.map((playlistId) => {
              const ytvpfeedURL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
                `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`
              )}`;
              return $.getJSON(ytvpfeedURL);
            });
            Promise.all(ytvpfetchPromises)
              .then((results) => {
                results.forEach((data, index) => {
                  if (!data.items || !data.feed) return;
                  const playlistId = playlistIds[index];
                  const playlistTitle = data.feed.title || `Playlist ${index + 1}`;
                  const playlistHTML = ` <div class="playlist-section aRt-dTls-bx border-bottom"> <div class="playlist-header"> <h6 class="playlist-title"> <a href="https://youtube.com/playlist?list=${playlistId}" target="_blank"> ${playlistTitle} <i class="fas fa-external-link-alt"></i> </a> </h6> </div> <div class="row playlist-videos mb-4"></div> </div>`;
                  const $playlistSection = $(playlistHTML);
                  $ytvpcontainer.append($playlistSection);
                  const $videoRow = $playlistSection.find(".playlist-videos");
                  data.items.forEach((item) => {
                    const ytvpvideoID = item.link.split("v=")[1];
                    const ytvppubDate = new Date(item.pubDate);
                    const ytvpday = ("0" + ytvppubDate.getDate()).slice(-2);
                    const ytvpmonthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
                    const ytvpmonth = ytvpmonthNames[ytvppubDate.getMonth()];
                    const videoHTML = ` <div class="col-12 col-md-6 col-lg-4"> <div class="blog-grid"> <div class="blog-img"> <div class="date"> <span>${ytvpday}</span> <label>${ytvpmonth}</label> </div> <a href="https://youtube.com/watch?v=${ytvpvideoID}" target="_blank"> <img src="https://img.youtube.com/vi/${ytvpvideoID}/maxresdefault.jpg" title="${item.title}" alt="${item.title}"> </a> </div> <div class="blog-info"> <h6 class="ellipsis"> <a href="https://youtube.com/watch?v=${ytvpvideoID}" target="_blank">${item.title}</a> </h6> <div class="btn-bar"></div> </div> </div> </div>`;
                    $videoRow.append(videoHTML);
                  });
                });
              })
              .catch((error) => {
                console.error("Error fetching YouTube playlists:", error);
              });
          }
        }, 2000);
      }
    });
  }

  function copyInputs() {
    $(".artist__code button").on("click", function () {
      var $parent = $(this).closest(".artist__code");
      var copyText = $parent.find(".artist-code")[0];
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      document.execCommand("copy");
      $(this).addClass("active");
      setTimeout(() => {
        $(this).removeClass("active");
      }, 1200);
    });
  }

})(jQuery);
