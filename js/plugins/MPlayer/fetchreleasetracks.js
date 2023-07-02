for (var i = 0; i < tracklist.length; ++i)
  $("#loadSongItems").append(
    "<div class='song-item up-next' data-playtrkid='" + i + "'><div class='row'><div class='col-xl-12 col-lg-12 col-md-12'><div class='song-item-info-box'><img src='" + tracklist[i].artwork + "'/><div class='song-info'><h4>" + tracklist[i].song + "</h4><span>" + tracklist[i].artist + "</span></div></div></div></div></div>"
  );

function waveSurferControll() {
  var $audio = $('#audiowave'),
    audio_down = $('#audio-down'),
    playlistLength = tracklist.length,i = 0;
  function songInfo() {
    $audio.attr('data-waveurl', tracklist[i].source);
    audio_down.attr("onclick","openDownloadlink('" + tracklist[i].Tdownloadlink + "','" + tracklist[i].song + ' - ' + tracklist[i].artist +' [Mix Vibe Rec].'+ tracklist[i].Tdownloadformat +"')");
    $('.up-next').removeClass('active');
    $('.up-next:nth-child(' + (i + 1) + ')').addClass('active');
    // Custom Settings
    $('.aBm-PGbg').css('background-image', 'url(' + tracklist[i].artwork + ')');
    $('.coverart').attr('src', tracklist[i].artwork);
    $('.aBm-tLe').html(tracklist[i].song);
    $('.aBm-aTst').html(tracklist[i].artist);
    $(".aBm-aTst-lnk").attr("href", tracklist[i].artistlink);
    $('.aBm-cPsr').html(tracklist[i].composer);
    $('.aBm-pRod').html(tracklist[i].producer);
    $('.aBm-lYst').html(tracklist[i].lyricist);
    $('.aBm-lAng').html(tracklist[i].language);
    $('.aBm-RDte').html(tracklist[i].releasedate);
    $('.aBm-duTin').html(tracklist[i].length);
    $('.buttonlink').attr('href', tracklist[i].buttonlink);
    $('.Tdownloadlink').attr('href', tracklist[i].Tdownloadlink);
    $('.aBm-id').html(tracklist[i].musicID);
	$('.shrturl, #getlink1').attr('value', tracklist[i].shorturl);
  }

  songInfo();
  // Play When Clicked
  $('.up-next').on('click', function () {
    i = $(this).data('playtrkid');
    songInfo();
	wavesurferInit(wavesurfer);
  });
} // End Audio Player Function

waveSurferControll();