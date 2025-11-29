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
    profileBackground();
    nonClaimed();
    showTab("releases");
    pinnedStatus();
    copyInputs();
    youTubePlaylistVideosTab();
  });

  // :: Set Profile Img to Head Cover
  function profileBackground() {
    $(document).ready(function () {
      const pf_img = document.querySelector(".profile-img");
      const target = document.querySelector(".header-bg");
      if (pf_img && target) {
        const imgSrc = pf_img.getAttribute("src");
        if (window.innerWidth >= 1024) {
          target.style.background = `url('${imgSrc}')`;
        } else {
          target.style.background = `url('${imgSrc}')`;
        }
      }
    });
  }

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

  // Artist Page tab switching
  function showTab(tabId) {
    $(document).ready(function () {
      const allTabs = document.querySelectorAll(".tab-content");
      const allButtons = document.querySelectorAll(".tab-button");
      const targetTab = document.getElementById("content-" + tabId);
      const targetButton = document.getElementById("tab-" + tabId);

      // Remove 'active' class from all buttons
      allButtons.forEach((btn) => btn.classList.remove("active"));

      // Add 'active' class to the clicked button
      targetButton.classList.add("active");

      // Start fade out all tabs
      allTabs.forEach((tab) => {
        if (!tab.classList.contains("hidden")) {
          tab.style.opacity = "0";
        }
      });

      // After fade out, hide all and show target
      setTimeout(() => {
        allTabs.forEach((tab) => tab.classList.add("hidden"));
        targetTab.classList.remove("hidden");
        targetTab.style.opacity = "0";

        // Force reflow
        targetTab.offsetHeight;

        // Fade in target tab
        targetTab.style.opacity = "1";
      }, 300);
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
        // Fail-safe timeout (2 sec)
        const timeout = setTimeout(() => resolve(hq), 2000);
        img.onload = () => {
          clearTimeout(timeout);
          if (img.width <= 120) resolve(hq);
          else resolve(maxRes);
        };
        img.onerror = () => {
          clearTimeout(timeout);
          resolve(hq);
        };
        img.src = maxRes;
      });
    }

    $(document).ready(function () {
      const $playlistSpan = $("span[data-yt-playlist]");
      const playlistIdStr = $playlistSpan.attr("data-yt-playlist");
      if (!playlistIdStr) return;
      const playlistIds = playlistIdStr.split(",").map((id) => id.trim());
      $("#tab-content").append(
        `<div id="content-videos" class="tab-content hidden"><div class="flex justify-between items-center mb-6"><h2 class="text-base! font-NPM">Featured YouTube Playlist${
          playlistIds.length > 1 ? "'s" : ""
        } </h2><div class="flex items-center space-x-4"><a href="#" class="text-brand-500 hover:text-lime-300 text-sm">View All</a></div></div><div id="yTpvideos" class="yTp-container"></div></div>`
      );
      $("#profile__tabs").append(
        `<button id="tab-videos" class="tab-button font-NPM pb-2 focus:outline-none" onclick="showTab('videos')">VIDEOS</button>`
      );
      const $ytvpcontainer = $("#yTpvideos");
      setTimeout(function () {
        if (!$ytvpcontainer) return;
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
              const playlistHTML = ` <div class="bottom border-gray-600 [&:not(:last-child)]:border-b [&:not(:last-child)]:pb-4 [&:not(:first-child)]:mt-4"><div class="playlist-header mb-3"><h2 class="text-sm! font-NPM"><a href="https://youtube.com/playlist?list=${playlistId}" target="_blank">${playlistTitle} <i class="fas fa-external-link-alt"></i></a></h2></div><div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 playlist-videos"></div></div>`;
              const $playlistSection = $(playlistHTML);
              $ytvpcontainer.append($playlistSection);
              const $videoRow = $playlistSection.find(".playlist-videos");
              data.items.forEach((item) => {
                const videoId = item.link.split("v=")[1];
                const pubDate = new Date(item.pubDate);
                const day = ("0" + pubDate.getDate()).slice(-2);
                const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
                const month = monthNames[pubDate.getMonth()];
                // --- Render placeholder in correct order ---
                const $placeholder = $(
                  `<a href="https://youtube.com/watch?v=${videoId}" class="video-item"><div class="w-full aspect-video rounded-lg overflow-hidden relative shadow-xl mb-3 bg-neutral-800 flex items-center justify-center"><img class="plyst-thumb w-full h-full object-cover transition duration-300 group-hover:opacity-80" src="" alt="Playlist Thumbnail"><svg class="absolute w-10 h-10 text-brand-500 opacity-80 group-hover:opacity-100 transition duration-300" fill="currentColor" viewBox="0 0 24 24"><path d="M16 9v2H8V9h8zm0 4v2H8v-2h8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg></div><p class="text-base! font-syne font-medium truncate">${item.title}</p><p class="text-sm text-gray-400 truncate">${day} ${month}</p></a>`
                );
                $videoRow.append($placeholder);
                // --- Load thumbnail asynchronously without changing order ---
                checkThumbnail(videoId).then((thumbnailURL) => {
                  $placeholder.find(".plyst-thumb").attr("src", thumbnailURL);
                });
              });
            });
          })
          .catch((error) => {
            console.error("Error fetching YouTube playlists:", error);
          });
      }, 2000);
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

  // Function to display a brief toast notification
  let toastTimeout;
  function showToast(message) {
    const toastContainer = document.getElementById("toast-container");
    const toastText = document.getElementById("toast-text");

    // Clear any existing timeout
    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    // Set the message and show the toast
    toastText.textContent = message;
    toastContainer.classList.remove("opacity-0", "translate-y-full");
    toastContainer.classList.add("translate-y-0");

    // Hide the toast after 3 seconds
    toastTimeout = setTimeout(() => {
      toastContainer.classList.remove("translate-y-0");
      toastContainer.classList.add("opacity-0", "translate-y-full");
    }, 3000);
  }

  // Function to copy text from an element and show a toast
  function copyLink(elementId, type = "Link") {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Use a temporary textarea to hold the text for copying
    const textToCopy = element.textContent.trim();
    const tempInput = document.createElement("textarea");
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);

    // Select and copy the text
    tempInput.select();

    try {
      // document.execCommand('copy') is used for compatibility in iframes
      const successful = document.execCommand("copy");
      if (successful) {
        showToast(`${type} copied!`);
      } else {
        console.error("Copy command failed.");
        showToast("Copy failed. Please try manually.");
      }
    } catch (err) {
      console.error("Error during copy operation:", err);
      showToast("Copy failed. Please try manually.");
    }

    // Clean up the temporary element
    document.body.removeChild(tempInput);
  }

  // === MODAL LOGIC ===
  const modal = document.getElementById("artist-pick-modal");
  // Opens the Artist Pick modal.
  function openArtistPickModal() {
    modal.classList.remove("modal-hidden");
    modal.classList.add("modal-visible");
    // Add event listener for ESC key press
    document.addEventListener("keydown", handleEscKey);
  }

  function closeArtistPickModal(event) {
    // If event is defined, check if the click target is the modal backdrop itself
    if (event && event.target !== modal) {
      return;
    }
    modal.classList.remove("modal-visible");
    modal.classList.add("modal-hidden");
    // Remove event listener for ESC key press
    document.removeEventListener("keydown", handleEscKey);
  }

  function handleProfileClick(element) {
    if (element.classList.contains("artist-pick")) {
      openArtistPickModal();
    }
  }

  function handleEscKey(event) {
    if (event.key === "Escape" && modal.classList.contains("modal-visible")) {
      closeArtistPickModal();
    }
  }
})(jQuery);
