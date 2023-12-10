/* Copyright © 2023 https://www.mixviberecords.com
* Licensed Code With No Open Source Code
* jQuery Codes
* Plugin v.1.1 - Codix.dev */

for (var i = 0; i < tracklist.length; ++i) {
  let artistData = tracklist[i].artists
  $("#loadSongItems").append("<div class='song-item up-next' data-playtrkid='" + i + "'><div class='row'><div class='col-lg-12'><div class='song-item-info-box'><img src='" + tracklist[i].artwork + "'/><div class='song-info'><h4>" + tracklist[i].song + "</h4><p>" + artistData.map(function (data) { return `${data.name}` }).join(' - ') + "</p></div></div></div></div></div>");
}

function loadPopMenu() {
  $("[data-togglemore='dropdown']").on('click', function () {
    var idx = $(this).data('idx');
    var pop = $('.dropdown-menu');
    pop.not($(this).next()).removeClass('show');
    $(document).on("click", function (event) {
      if (!$(event.target).closest(".dropdown").length) {
        window.setTimeout(function () { pop.removeClass('show'); }, 100);
      }
    });
    pop.eq(idx).toggleClass('show');
  });
}

function waveSurferControll() {
  var $audio = $('#audiowave'),
    audio_down = $('#audio-down'),
    playlistLength = tracklist.length,i = 0;
  function songInfo() {
     // Artist More Menu
     let artistData = tracklist[i].artists;
     $('.aBm-aTst-box').html(artistData.map(function (data, index) {
       return `<span class="aTst-nMe"><span class="dropdown moremenu">
             <span data-togglemore='dropdown' data-idx='${index ++}'>
               ${data.name}
             </span>
             <div class="dropdown-menu">
               ${data.href && data.href ? (`<a class="dropdown-item" href="${data.href}" target="_blank"><i class="fa-solid fa-user"></i> Label Profile</a>`) : ""}
               ${data.external_urls.spotify && data.external_urls.spotify ? (`<a class="dropdown-item" href="${data.external_urls.spotify}" target="_blank"><svg class="svg-inline--fa" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 496 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"/></svg> Spotify</a>`) : ""}
               ${data.external_urls.instagram && data.external_urls.instagram ? (`<a class="dropdown-item" href="${data.external_urls.instagram}" target="_blank"><i class="fa-solid fa-user"></i> Instagram</a>`) : ""}
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
    }).join(' - '));
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