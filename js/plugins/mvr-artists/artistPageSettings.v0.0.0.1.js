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
        ? $("#NonClaimPromo").remove()
        : ($("#NonClaimPromo").show(),
          $(".artist__nickname").text("NOT CLAIMED"),
          $(".artist__social").remove(),
          $(".artist__code").remove(),
          $(".artist__sinfo").remove(),
          $(".artist__link").remove(),
          $(".artist_main__artist").css({
            "background-image": "url(https://cdn.jsdelivr.net/gh/mvrec/files.mvr.dev@master/img/bgimgs/mixbgmx8.webp)",
          }));
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
          $(".artist__meta").append('<span class="statustooltip">Artist Pick</span>');
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
    // --- Thumbnail checker (maxres → hq fallback) ---
    function checkThumbnail(videoId) {
      return new Promise((resolve) => {
        const maxRes = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        const hq = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

        const img = new Image();

        img.onload = () => {
          // YouTube returns 120x90 if high-res doesn't exist
          if (img.width <= 120) resolve(hq);
          else resolve(maxRes);
        };

        img.onerror = () => resolve(hq);
        img.src = maxRes;
      });
    }
    $(document).ready(function () {
      const $playlistSpan = $("span[data-yt-playlist]");
      const playlistIdStr = $playlistSpan.attr("data-yt-playlist");
      if (playlistIdStr) {
        const playlistIds = playlistIdStr.split(",").map((id) => id.trim());
        $("#tab-content").append(
          `<div id="content-videos" class="tab-content hidden"><div class="flex justify-between items-center mb-6"><h2 class="text-base! font-NPM">Featured YouTube Playlist${playlistIds.length > 1 ? "'s" : ""
          }</h2><div class="flex items-center space-x-4"><a href="#" class="text-brand-500 hover:text-lime-300 text-sm">View All</a></div></div><div id="yTpvideos" class="yTp-container"></div></div>`
        );
        $("#profile__tabs").append(
          `<button id="tab-videos" class="tab-button font-NPM pb-2 focus:outline-none" onclick="showTab('videos')">VIDEOS</button>`
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
                  const playlistHTML = ` <div class="bottom border-gray-600 [&:not(:last-child)]:border-b [&:not(:last-child)]:pb-4 [&:not(:first-child)]:mt-4"> <div class="playlist-header mb-3"> <h2 class="text-sm! font-NPM"> <a href="https://youtube.com/playlist?list=${playlistId}" target="_blank"> ${playlistTitle} <i class="fas fa-external-link-alt"></i> </a> </h2> </div> <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 playlist-videos"></div> </div>`;
                  const $playlistSection = $(playlistHTML);
                  $ytvpcontainer.append($playlistSection);
                  const $videoRow = $playlistSection.find(".playlist-videos");
                  data.items.forEach((item) => {
                    const ytvpvideoID = item.link.split("v=")[1];
                    const ytvppubDate = new Date(item.pubDate);
                    const ytvpday = ("0" + ytvppubDate.getDate()).slice(-2);
                    const ytvpmonthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
                    const ytvpmonth = ytvpmonthNames[ytvppubDate.getMonth()];
                    // --- 🔥 Load correct thumbnail before inserting HTML ---
                    checkThumbnail(ytvpvideoID).then((thumbnailURL) => {
                      const videoHTML = `<a href="https://youtube.com/watch?v=${ytvpvideoID}">
                                                <div class="w-full aspect-video rounded-lg overflow-hidden relative shadow-xl mb-3 bg-neutral-800 flex items-center justify-center">
                                                    
                                                    <img src="${thumbnailURL}"
                                                        alt="Playlist Thumbnail"
                                                        class="w-full h-full object-cover transition duration-300 group-hover:opacity-80">

                                                    <svg class="absolute w-10 h-10 text-brand-500 opacity-80 group-hover:opacity-100 transition duration-300"
                                                        fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M16 9v2H8V9h8zm0 4v2H8v-2h8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                                                    </svg>

                                                </div>

                                                <p class="text-base! font-medium truncate">${item.title}</p>
                                                <p class="text-sm text-gray-400 truncate">${ytvpday} ${ytvpmonth}</p>
                                            </a>`;

                      $videoRow.append(videoHTML);
                    });
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
