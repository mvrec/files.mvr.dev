/* © Copyright 2024 https://www.mixviberecords.com
* Licensed Code With No Open Source Code
* jQuery Codes
* MVR Developers */

for (var i = 0; i < tracklist.length; ++i) {
  let artistData = tracklist[i].artists
  $("#loadSongItems").append("<div class='song-item up-next' data-playtrkid='" + i + "'><div class='row'><div class='col-lg-12'><div class='song-item-info-box'><img src='" + tracklist[i].artwork + "'/><div class='song-info'><h4>" + tracklist[i].song + "</h4><span>" + artistData.map(function (data) { return `${data.name}` }).join(' • ') + "</span></div><span class='single-item-time'>" + tracklist[i].length + "</span></div></div></div></div>");
}

// function loadPopMenu() {
//   $("[data-togglemore='dropdown']").on('click', function () {
//     var idx = $(this).data('idx');
//     var pop = $('.dropdown-menu');
//     pop.not($(this).next()).removeClass('show');
//     $(document).on("click", function (event) {
//       if (!$(event.target).closest(".dropdown").length) {
//         window.setTimeout(function () { pop.removeClass('show'); }, 100);
//       }
//     });
//     pop.eq(idx).toggleClass('show');
//   });
// }

function waveSurferControll() {
  var $audio = $('#audiowave'),
    audio_down = $('#audio-down'),
    playlistLength = tracklist.length,i = 0;
  function songInfo() {
     // Artist More Menu
     let artistData = tracklist[i].artists;
     $('.aBm-aTst-box').html(artistData.map(function (data, index) {
       return `<span class="aTst-nMe"><span class="dropdown moremenu">
             <span data-togglemore='more' data-idx='${index ++}'>
               ${data.name}
             </span>
             <div class="dropdown-menu">
               ${data.href && data.href ? (`<a class="dropdown-item" href="${data.href}" target="_blank"><svg viewBox="0 0 16 16" class="svg-inline--fa"><path d="M11.757 2.987A4.356 4.356 0 0 0 7.618 0a4.362 4.362 0 0 0-4.139 2.987 5.474 5.474 0 0 0-.22 1.894 5.604 5.604 0 0 0 1.4 3.312l.125.152a.748.748 0 0 1-.2 1.128l-2.209 1.275A4.748 4.748 0 0 0 0 14.857v1.142h8.734A5.48 5.48 0 0 1 8.15 14.5H1.517a3.245 3.245 0 0 1 1.6-2.454l2.21-1.275a2.25 2.25 0 0 0 .6-3.386l-.128-.153a4.112 4.112 0 0 1-1.05-2.44A4.053 4.053 0 0 1 4.89 3.47a2.797 2.797 0 0 1 1.555-1.713 2.89 2.89 0 0 1 3.293.691c.265.296.466.644.589 1.022.12.43.169.876.144 1.322a4.12 4.12 0 0 1-1.052 2.44l-.127.153a2.239 2.239 0 0 0-.2 2.58c.338-.45.742-.845 1.2-1.173 0-.162.055-.32.156-.447l.126-.152a5.598 5.598 0 0 0 1.4-3.312 5.499 5.499 0 0 0-.218-1.894zm3.493 3.771a.75.75 0 0 0-.75.75v3.496h-1a2.502 2.502 0 0 0-2.31 1.542 2.497 2.497 0 0 0 1.822 3.406A2.502 2.502 0 0 0 16 13.502V7.508a.75.75 0 0 0-.75-.75zm-.75 6.744a.998.998 0 0 1-1.707.707 1 1 0 0 1 .707-1.706h1v1z"></path></svg> Go to artist</a>`) : ""}
               ${data.external_urls.spotify && data.external_urls.spotify ? (`<a class="dropdown-item" href="${data.external_urls.spotify}" target="_blank"><svg class="svg-inline--fa" height="1em" viewBox="0 0 496 512"><path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"/></svg> Spotify</a>`) : ""}
               ${data.external_urls.instagram && data.external_urls.instagram ? (`<a class="dropdown-item" href="${data.external_urls.instagram}" target="_blank"><i class="fa-brands fa-instagram"></i> Instagram</a>`) : ""}
             </div>
           </span></span>`
     }).join(''));
    $audio.attr('data-waveurl', tracklist[i].source);
    audio_down.attr("onclick","openDownloadlink('" + tracklist[i].Tdownloadlink + "','" + tracklist[i].song + ' - ' +'[Mix Vibe Rec].'+ tracklist[i].Tdownloadformat +"')");
    $('.up-next').removeClass('active');
    $('.up-next:nth-child(' + (i + 1) + ')').addClass('active');
   
    // Custom Settings
    $('.aBm-aTst').html(artistData.map(function (data) {
      return `${data.name}`
    }).join(' • '));
    $('.aBm-PGbg').css('background-image', 'url(' + tracklist[i].artwork + ')');
    $('.coverart').attr('src', tracklist[i].artwork);
    $('.add-fav-btn').attr('data-coverartimg', tracklist[i].artwork);
    $('.aBm-tLe').html(tracklist[i].song);
    $('.aBm-cPsr').html(tracklist[i].composer);
    $('.aBm-pRod').html(tracklist[i].producer);
    $('.aBm-lYst').html(tracklist[i].lyricist);
    $('.aBm-lAng').html(tracklist[i].language);
    $('.aBm-RDte').html(tracklist[i].releasedate);
    $('.aBm-duTin').html(tracklist[i].length);
    $('.aBm-id').html(tracklist[i].musicID);
	  $('.shrturl, #getlink1').attr('value', tracklist[i].shorturl);
  }

  songInfo();
  // Play When Clicked
  $('.up-next').on('click', function () {
    i = $(this).data('playtrkid');
    songInfo();
    wavesurferInit(wavesurfer);
    loadPopMenu();
  });
} // End Audio Player Function

waveSurferControll();

// Artist More Menu Toggle
$(document).ready(function () {
  const $dropdownToggles = $('[data-togglemore="more"]');

  if ($dropdownToggles.length > 0) {
    // Function to position dropdown menu
    function positionDropdownMenu($dropdownMenu, $toggleElement) {
      const toggleRect = $toggleElement[0].getBoundingClientRect();
      const dropdownRect = $dropdownMenu[0].getBoundingClientRect();
      const screenWidth = $(window).width();
      const flexContainerRect = $toggleElement
        .closest(".aTst-nMe")[0]
        .getBoundingClientRect();

      // Calculate the left position of the dropdown menu
      let left = toggleRect.left - flexContainerRect.left;
      if (left + dropdownRect.width > screenWidth) {
        left = flexContainerRect.right - dropdownRect.width;
      }

      if ($(window).width() < 767) {
        left = 0;
        return;
      }

      // Calculate the top position of the dropdown menu
      let top = toggleRect.bottom - flexContainerRect.top;

      // Set the top and left positions of the dropdown menu
      $dropdownMenu.css({
        top: top,
        left: left,
      });
    }

    // Add event listener to each dropdown toggle
    $dropdownToggles.on("click", function (event) {
      event.stopPropagation(); // prevent event from bubbling up to document

      // Hide all other dropdown menus
      $dropdownToggles.not(event.currentTarget).next().removeClass("show");

      // Toggle the current dropdown menu
      const $dropdownMenu = $(event.currentTarget).next();
      $dropdownMenu.toggleClass("show");
      if ($dropdownMenu.hasClass("show")) {
        positionDropdownMenu($dropdownMenu, $(event.currentTarget));
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