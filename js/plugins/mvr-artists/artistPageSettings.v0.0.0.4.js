/* 
| © Copyright 2024 https://www.mixviberecords.com
| Author: Mix Vibe Records
| Version: 1.1.0
| Licensed Code With No Open Source Code
| Modern JS Upgrade
| MVR Developers
*/

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // ===== UTILITY FUNCTIONS =====
  const $ = (selector, context = document) => context ? context.querySelector(selector) : null;
  const $$ = (selector, context = document) => context ? Array.from(context.querySelectorAll(selector)) : [];

  // ===== SAFE HELPERS =====
  $.exists = (selector, context = document) => !!$(selector, context);

  Element.prototype.hasClass = function(className) {
    return this && this.classList ? this.classList.contains(className) : false;
  };

  // Fade in/out helper
  function fadeToggle(element, show = true, duration = 300) {
    if (!element) return;
    if (show) {
      element.classList.remove("hidden");
      element.style.opacity = 0;
      element.offsetHeight; // force reflow
      element.style.transition = `opacity ${duration}ms`;
      element.style.opacity = 1;
    } else {
      element.style.transition = `opacity ${duration}ms`;
      element.style.opacity = 0;
      setTimeout(() => element.classList.add("hidden"), duration);
    }
  }

  // ===== PROFILE TAB SWITCHING =====
  const tabButtonsContainer = $("#profile__tabs");
  const tabContentsContainer = $("#tab-content") || document.getElementById("tab-contents");

  function showTab(tabId) {
    const allTabs = $$(".tab-content", tabContentsContainer);
    const allButtons = $$(".tab-button", tabButtonsContainer);
    const targetTab = $(`#content-${tabId}`, tabContentsContainer);
    const targetButton = $(`#tab-${tabId}`, tabButtonsContainer);

    // Remove active class from all buttons
    allButtons.forEach((btn) => btn.classList.remove("active"));
    targetButton.classList.add("active");

    // Fade out all tabs
    allTabs.forEach((tab) => fadeToggle(tab, false));

    // Fade in target tab after fade out
    setTimeout(() => fadeToggle(targetTab, true), 300);
  }

  // Attach click listeners to tab buttons
  $$(".tab-button", tabButtonsContainer).forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabId = btn.id.replace("tab-", "");
      showTab(tabId);
    });
  });

  // Show default tab on page load
  showTab("releases");

  // ===== PROFILE BACKGROUND IMAGE =====
  function profileBackground() {
    const pfImg = $(".profile-img");
    const target = $(".header-bg");
    if (pfImg && target) {
      const imgSrc = pfImg.src;
      target.style.background = `url('${imgSrc}')`;
    }
  }
  profileBackground();

  // ===== NON-CLAIMED PROFILE HANDLER =====
  function handleNonClaimed() {
    const avatar = $(".artist__avatar");
    if (!avatar.hasClass("artist__avatar--verified")) {
      const promo = $("#NonClaimPromo");
      if (promo) promo.style.display = "block";
      $(".artist__nickname").textContent = "NOT CLAIMED";
      [".artist__social", ".artist__code", ".artist__sinfo", ".artist__link"].forEach((sel) => {
        $$(sel).forEach((el) => el.remove());
      });
      $(".artist_main__artist").style.backgroundImage = "url(https://cdn.jsdelivr.net/gh/mvrec/files.mvr.dev@master/img/bgimgs/mixbgmx8.webp)";
    }
  }
  handleNonClaimed();

  // ===== YOUTUBE PLAYLIST TAB =====
  async function youTubePlaylistVideosTab() {
    const playlistSpan = $("span[data-yt-playlist]");
    if (!playlistSpan) return;

    const playlistIds = playlistSpan
      .getAttribute("data-yt-playlist")
      .split(",")
      .map((id) => id.trim());
    if (!playlistIds.length) return;

    const tabVideos = document.createElement("div");
    tabVideos.id = "content-videos";
    tabVideos.className = "tab-content hidden";
    tabVideos.innerHTML = `
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-base! font-NPM">Featured YouTube Playlist${playlistIds.length > 1 ? "'s" : ""}</h2>
        <div class="flex items-center space-x-4">
          <a href="#" class="text-brand-500 hover:text-lime-300 text-sm">View All</a>
        </div>
      </div>
      <div id="yTpvideos" class="yTp-container"></div>
    `;
    tabContentsContainer.appendChild(tabVideos);

    // Add tab button
    const btn = document.createElement("button");
    btn.id = "tab-videos";
    btn.className = "tab-button font-NPM pb-2 focus:outline-none";
    btn.textContent = "VIDEOS";
    btn.addEventListener("click", () => showTab("videos"));
    tabButtonsContainer.appendChild(btn);

    const container = $("#yTpvideos");

    const checkThumbnail = (videoId) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () =>
          resolve(
            img.width <= 120 ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
          );
        img.onerror = () => resolve(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
        img.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        setTimeout(() => resolve(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`), 2000);
      });

    for (const playlistId of playlistIds) {
      try {
        const feedURL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
          `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`
        )}`;
        const response = await fetch(feedURL);
        const data = await response.json();
        if (!data.items || !data.feed) continue;

        const section = document.createElement("div");
        section.className = "bottom border-gray-600 [&:not(:last-child)]:border-b [&:not(:last-child)]:pb-4 [&:not(:first-child)]:mt-4";
        section.innerHTML = `
          <div class="playlist-header mb-3">
            <h2 class="text-sm! font-NPM"><a href="https://youtube.com/playlist?list=${playlistId}" target="_blank">${data.feed.title} <i class="fas fa-external-link-alt"></i></a></h2>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 playlist-videos"></div>
        `;
        container.appendChild(section);
        const videoRow = $(".playlist-videos", section);

        for (const item of data.items) {
          const videoId = item.link.split("v=")[1];
          const pubDate = new Date(item.pubDate);
          const day = ("0" + pubDate.getDate()).slice(-2);
          const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
          const month = monthNames[pubDate.getMonth()];

          const a = document.createElement("a");
          a.href = `https://youtube.com/watch?v=${videoId}`;
          a.target = "_blank";
          a.className = "video-item";
          a.innerHTML = `
            <div class="w-full aspect-video rounded-lg overflow-hidden relative shadow-xl mb-3 bg-neutral-800 flex items-center justify-center">
              <img class="plyst-thumb w-full h-full object-cover transition duration-300 group-hover:opacity-80" src="" alt="Playlist Thumbnail">
              <svg class="absolute w-10 h-10 text-brand-500 opacity-80 group-hover:opacity-100 transition duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 9v2H8V9h8zm0 4v2H8v-2h8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
            </div>
            <p class="text-base! font-syne font-medium truncate">${item.title}</p>
            <p class="text-sm text-gray-400 truncate">${day} ${month}</p>
          `;
          videoRow.appendChild(a);
          a.querySelector(".plyst-thumb").src = await checkThumbnail(videoId);
        }
      } catch (err) {
        console.error("Error fetching playlist:", err);
      }
    }
  }

  youTubePlaylistVideosTab();

  // Function to display a brief toast notification
  let toastTimeout;
  function showToast(message) {
    const toastContainer = document.getElementById("toast-container");
    const toastText = document.getElementById("toast-text");

    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    toastText.textContent = message;
    toastContainer.classList.remove("opacity-0", "translate-y-full");
    toastContainer.classList.add("translate-y-0");

    toastTimeout = setTimeout(() => {
      toastContainer.classList.remove("translate-y-0");
      toastContainer.classList.add("opacity-0", "translate-y-full");
    }, 3000);
  }

  // Function to copy text from an element and show a toast
  function copyLink(elementId, type = "Link") {
    const element = document.getElementById(elementId);
    if (!element) return;

    const textToCopy = element.textContent.trim();
    const tempInput = document.createElement("textarea");
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();

    try {
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

    document.body.removeChild(tempInput);
  }

  // === MODAL LOGIC ===
  const modal = document.getElementById("artist-pick-modal");

  function openArtistPickModal() {
    modal.classList.remove("modal-hidden");
    modal.classList.add("modal-visible");
    document.addEventListener("keydown", handleEscKey);
  }

  function closeArtistPickModal(event) {
    if (event && event.target !== modal) return;
    modal.classList.remove("modal-visible");
    modal.classList.add("modal-hidden");
    document.removeEventListener("keydown", handleEscKey);
  }

  function handleProfileClick(element) {
    if (element.hasClass("artist-pick")) {
      openArtistPickModal();
    }
  }

  function handleEscKey(event) {
    if (event.key === "Escape" && modal.hasClass("modal-visible")) {
      closeArtistPickModal();
    }
  }
});
