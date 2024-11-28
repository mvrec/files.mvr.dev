/* © Copyright 2024 https://www.mixviberecords.com
* Licensed Code With No Open Source Code
* jQuery Codes
* MVR Developers */

for (var i = 0; i < tracklist.length; ++i) {
  let artistData = tracklist[i].artists
  $("#loadSongItems").append("<div class='song-item up-next' data-playtrkid='" + i + "'><div class='row'><div class='col-lg-12'><div class='song-item-info-box'><div class='song-item-cover'><img alt='" + tracklist[i].song + "' src='" + tracklist[i].artwork + "'/><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M18.54,9,8.88,3.46a3.42,3.42,0,0,0-5.13,3V17.58A3.42,3.42,0,0,0,7.17,21a3.43,3.43,0,0,0,1.71-.46L18.54,15a3.42,3.42,0,0,0,0-5.92Zm-1,4.19L7.88,18.81a1.44,1.44,0,0,1-1.42,0,1.42,1.42,0,0,1-.71-1.23V6.42a1.42,1.42,0,0,1,.71-1.23A1.51,1.51,0,0,1,7.17,5a1.54,1.54,0,0,1,.71.19l9.66,5.58a1.42,1.42,0,0,1,0,2.46Z'></path></svg></div><div class='song-info'><h4>" + tracklist[i].song + "</h4><span>" + artistData.map(function (data) { return `${data.name}` }).join(' • ') + "</span></div><span class='single-item-time'>" + tracklist[i].length + "</span></div></div></div></div>");
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
               ${data.href && data.href ? (`<a class="dropdown-item" href="${data.href}" target="_blank"><i class="fa-solid fa-user-large"></i> Go to artist</a>`) : ""}
               ${data.external_urls.spotify && data.external_urls.spotify ? (`<a class="dropdown-item" href="${data.external_urls.spotify}" target="_blank"><i class="fa-brands fa-spotify"></i> Spotify</a>`) : ""}
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