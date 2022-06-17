// Album Music Player v.1.8 - © 2022 | Designed & licenced for Mix Vibe Records | Developed : (Codix.dev) Mix Vibe Rec. Developers
// Add Tracklist Top
$('.aBm-Ptop').append("<ul class='pL-Gp'><li class='my-1' style='display: block;'><div class='d-flex align-items-center'><div class='col-md-1 lite-title-color'>#</div><div class='col-md-6 lite-title-color' style='max-width: 75%;'>TITLE</div><div class='ml-auto' style='margin-right: 20px;'><div class='d-lg-block'><svg class='line' width='20' height='20' viewBox='0 0 25 25' xmlns='http://www.w3.org/2000/svg'><circle fill='none' stroke-width='1.1' cx='10' cy='10' r='9'></circle><rect x='9' y='4' width='1' height='7'></rect><path fill='none' stroke-width='1.1' d='M13.018,14.197 L9.445,10.625'></path></svg></div></div></div></li></ul>");
// Fetch Data From JSON
for (var i = 0; i < tracklist.length; ++i) {
 $('.aBm-Plist').append("<li class='pL-Gp-itm my-1 up-next' data-playtrknum='" + i + "'><div class='d-flex align-items-center'><div class='col-btn'><svg class='line' width='30' height='30' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><polygon fill='none' points='6.5,5 14.5,10 6.5,15'></polygon></svg></div><div class='col-md-6 pL-mTa'><span class='songtitle'>" + tracklist[i].song + "</span> - <span class='songtitle'>" + tracklist[i].artist + "</span></div><div class='ml-auto' style='margin-right: 20px;'>" + tracklist[i].length + "</div></div></li>");
}
// Detect IE/Edge
function detectIE(){var ua=window.navigator.userAgent,msie=ua.indexOf('MSIE '),trident=ua.indexOf('Trident/'),edge=ua.indexOf('Edge/');if((msie>0)||(trident>0)||(edge>0)){$('body').addClass('ie')}}
detectIE()
// Error handler - Need sweetalert2.js for Error Popup
audio.addEventListener('error',function failed(e){switch(e.target.error.code){case e.target.error.MEDIA_ERR_ABORTED:Swal.fire('Oops...','You aborted the audio playback.','info')
break;case e.target.error.MEDIA_ERR_NETWORK:Swal.fire('Oops...','A network error caused the audio download to fail.','error')
break;case e.target.error.MEDIA_ERR_DECODE:Swal.fire('Oops...','The audio playback was aborted due to a corruption problem or features your browser did not support.','error')
break;case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:Swal.fire('Oops...','The audio not be loaded, either because the server or network failed.','error')
break;default:Swal.fire('Oops...','An unknown error occurred.','error')
break}},!0)

// Audio Player
function audioPlayer() {
  var $audio = $('#audio'),
    audio = document.getElementById("audio"),
    $time = $('#time'),
    $volume = $('#volume'),
    volume = $volume.val(),
    $play = $('.play'),
    $playText = $('.playText'),
    playlistLength = tracklist.length,
    i = 0,
    volumeBefore;
  $time.on('mousedown', function () {
    audio.pause();
  });
  $time.on('mouseup', function () {
    audio.play();
  });
  // Check If Audio Is Plaing
  function isPlaying() {
    return !audio.paused;
  }
  // Change Play Button On Play/Pause
  function playPauseButton() {
    if (isPlaying()) {
      $play.addClass('paused');
      $playText.html('<svg enable-background="new 0 0 64 64" height="64px" id="PAUSE" version="1.1" viewBox="0 0 64 64" width="64px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M39,17.563c-2.75,0-5,2.25-5,5v18.875c0,2.75,2.25,5,5,5s5-2.25,5-5V22.563C44,19.813,41.75,17.563,39,17.563z M41,41.438   c0,1.1-0.9,2-2,2s-2-0.9-2-2V22.563c0-1.1,0.9-2,2-2s2,0.9,2,2V41.438z"></path><path d="M25,17.563c-2.75,0-5,2.25-5,5v18.875c0,2.75,2.25,5,5,5s5-2.25,5-5V22.563C30,19.813,27.75,17.563,25,17.563z M27,41.438   c0,1.1-0.9,2-2,2s-2-0.9-2-2V22.563c0-1.1,0.9-2,2-2s2,0.9,2,2V41.438z"></path></g></svg> PAUSE');
$('section.player').addClass('player--active')
    } else {
      $play.removeClass('paused');
      $playText.html('<svg width="30" height="30" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <polygon fill="none" stroke="#FFF" points="6.5,5 14.5,10 6.5,15"></polygon></svg> PREVIEW');
      $(".add-recent-btn").trigger('click');
$('section.player').removeClass('player--active')
    }
  }
  // Play/Pause Audio
var Turl = $('#getlink').val();
  function playPause() {
    if (isPlaying()) {
      audio.pause();
    } else {
      audio.play();
      launch_toastFetch();
    }
  }
  // Change Play Button When Paused Or Played
  $audio.on('play playing pause', function () {
    playPauseButton();
  });
  // Find Duration
  $audio.on("canplay", function () {
    var d = this.duration;
    // Set The Input Slider Max Value
    $time.attr('max', d);
  });
  // Find Current Position
  $audio.on("timeupdate", function () {
    var n = this.currentTime,
      d = this.duration,
      gradient = n / d * 100;

    // Change Input Slider When Playing
    $time.val(n);
    $time.attr('value', n);
    // Change Input Slider Background When Playing
    $time.css(
      'background',
      'linear-gradient(to right, #1eb1b3 0%, #11dc9a ' + gradient + '%, rgba(120, 130, 140, 0.2) ' + gradient + '%, rgba(120, 130, 140, 0.2) 100%)'
    );
    // Preload next song
    if ((n >= (d - 30)) && (i != (playlistLength - 1))) {
      $('.n:empty').html("<audio id='audio-next' preload='metadata' src='" + tracklist[i + 1].source + "'></audio>");
    } else if (n < (d - 30) && (!$('.n').is(':empty'))) {
      $('.audio-next').html('');
    } else {
      return;
    }
  });

  function songInfo() {
    audio.pause();
    audio.currentTime = 0;
    $time.css('background', 'rgba(120, 130, 140, 0.2)');
    $time.val(0);
    $time.attr('value', 0);
    $audio.attr('src', tracklist[i].source);
    $audio.attr("onclick","openDownloadlink('" + tracklist[i].Tdownloadlink + "','" + tracklist[i].song + ' - ' + tracklist[i].artist +' [Mix Vibe Rec].'+ tracklist[i].Tdownloadformat +"')");
    $('section.flex.player .artwork').attr('src', tracklist[i].artwork);
    $('section.flex.player .song').html(tracklist[i].song);
    $('section.flex.player .artist').html(tracklist[i].artist);
    $('section.flex.player > .right .buttontext').html(tracklist[i].buttontext);
    $('.up-next').removeClass('active');
    $('.up-next:nth-child(' + (i + 1) + ')').addClass('active');
    // Custom Settings
    $('.aBm-PGbg').css('background-image', 'url(' + tracklist[i].artwork + ')');
    $('.coverart').attr('src', tracklist[i].artwork);
    $('.aBm-tLe').html(tracklist[i].song);
    $('.aBm-aTst').html(tracklist[i].artist);
    $(".aBm-aTst-lnk").attr("href", tracklist[i].artistlink);
    $('.aBm-RDte').html(tracklist[i].releasedate);
    $('.aBm-duTin').html(tracklist[i].length);
    $('.buttonlink').attr('href', tracklist[i].buttonlink);
    $('.Tdownloadlink').attr('href', tracklist[i].Tdownloadlink);
    $('.aBm-id').html(tracklist[i].musicID);
    $("#copy_url").attr({ "data-clipboard-text": tracklist[i].shorturl });
	  $('.shrturl').attr('value', tracklist[i].shorturl);
    $("#TrackType").html("<i class='far fa-file-audio' style='color:teal;'></i> Type: " + tracklist[i].tracktype + "");
    playPauseButton();
  }

  songInfo();
  // Play next song when current track has ended
  $audio.on("ended", function () {
    // If Repeat One Is On
    if ($('.repeat').hasClass('repeat-one')) {
      audio.currentTime = 0;
      $time.css('background', 'rgba(120, 130, 140, 0.2)');
      $time.val(0);
      $time.attr('value', 0);
      audio.play();
      // If Its The Last Track And Repeat All Is On
    } else if (($('.repeat').hasClass('repeat-all')) && (i == (playlistLength - 1))) {
      i = 0;
      songInfo();
      audio.play();
      launch_toastFetch();
      // If Its The Last Track
    } else if (i == (tracklist.length - 1)) {
      i = 0;
      songInfo();
      // Otherwise
    } else {
      i++;
      songInfo();
      audio.play();
      launch_toastFetch();
    }
  });

  // Time slider
  $time.on('input', function () {
    var v = $(this).val(),
      d = audio.duration,
      durationGradient = parseInt(v) / d * 100;

    $(this).trigger('change');

    // Set current time to the value of the slider
    audio.currentTime = (v);

    // Set the background of the slider
    $time.css(
      'background',
      'linear-gradient(to right, #1eb1b3 0%, #11dc9a ' + durationGradient + '%, rgba(120, 130, 140, 0.2) ' + durationGradient + '%, rgba(120, 130, 140, 0.2) 100%)'
    );
  });

  function setVolume() {
    var gradient = volume * 100;

    // Set audio volume
    audio.volume = $volume.val();
    volume = $volume.val();

    // Set slider background
    $volume.css(
      'background',
      'linear-gradient(to right, #1eb1b3 0%, #11dc9a ' + gradient + '%, rgba(120, 130, 140, 0.2) ' + gradient + '%, rgba(120, 130, 140, 0.2) 100%)'
    );
  }

  // Volume Input Slider
  $volume.on('input', function () {
    $(this).trigger('change');
    setVolume();

    // Trigger muted icon
    if (volume == 0) {
      $('.volume').addClass('muted');
    } else {
      $('.volume').removeClass('muted');
    }
  });

  // Volume Mute Button
  $('.volume').on('click', function () {
    $(this).toggleClass('muted');

    // Return to volume before muting
    if (volume == 0) {
      $volume.val(volumeBefore);
      audio.volume = volumeBefore;
      volume = volumeBefore;
      // Mute
    } else {
      volumeBefore = volume;
      $volume.val(0);
      audio.volume = (0);
      volume = 0;
    }
    setVolume();
  });

  // Play/Pause Button
  $play.on('click', function () {
    playPause();
  });

  // Play When Spacebar Is Pressed
  $(window).keypress(function (e) {
    // Only if an input field is not in focus
    if (e.keyCode === 0 || e.keyCode === 32 && (!$('input').is(':focus'))) {
      e.preventDefault();
      playPause();
      $(".add-recent-btn").trigger('click');
    }
  });

  // Repeat Button
  $('.repeat').on('click', function () {
    if ($(this).hasClass('repeat-one')) {
      $(this).removeClass('repeat-one');
      $(this).addClass('repeat-all');
      launch_toastRepeatAll()
    } else if ($(this).hasClass('repeat-all')) {
      $(this).removeClass('repeat-all');
    } else {
      $(this).addClass('repeat-one');
      launch_toastRepeat()
    }
  })

  // Previous Button
  $('.previous').unbind().click(function () {
    if ((audio.currentTime < 5) && (i == 0)) {
      audio.currentTime = (0);
    } else if (audio.currentTime < 5) {
      i = i - 1;
      songInfo();
      audio.play();
      launch_toastFetch();
    } else {
      audio.currentTime = 0;
    }
  });

  // Next Button
  $('.next1').on('click', function () {
    // If it is the last song and repeat one is on
    if (i == (tracklist.length - 1) && $('.repeat').hasClass('repeat-one')) {
      i = 0;
      songInfo();
      $('.repeat').removeClass('repeat-one');
      // If it is the last song and repeat all is on
    } else if ((i == (tracklist.length - 1)) && ($('.repeat').hasClass('repeat-all'))) {
      i = 0;
      songInfo();
      audio.play();
      // If repeat one is on
    } else if ($('.repeat').hasClass('repeat-one')) {
      i++;
      songInfo();
      audio.play();
      // If it is the last song
    } else if (i == (tracklist.length - 1)) {
      i = 0;
      songInfo();
    } else {
      $audio.trigger('ended');
    }
  });

  // Play When Clicked
  $('.up-next').on('click', function () {
    i = $(this).data('playtrknum');
    songInfo();
    audio.play();
    launch_toastFetch();
    $(".add-recent-btn").trigger('click');
  });
} // End Audio Player Function

audioPlayer();

// Mobile view
function mobileFooter() {
  if ($(window).width() < 600) {
    $('section.flex.player').addClass('mobile');
  } else {
    $('section.flex.player').removeClass('mobile');
  }
}
mobileFooter()

$(window).resize(function () {
  mobileFooter()
});

// Toast Launcher
function launch_toastFetch() {
  $("#FetchToast").html('<div id="toastFetch" class="toast">One moment, as we fetch your music..</div>'); var toast = document.getElementById("toastFetch")
  toast.className = "toast show"; setTimeout(function () { toast.className = toast.className.replace("show", "toast"); $("#FetchToast").empty(); }, 5000);
}
function launch_toastRepeat() {
  $("#FetchToast").html('<div id="toastRepeat" class="toast">Current Track Repeat Enabled.</div>'); var toast = document.getElementById("toastRepeat")
  toast.className = "toast show"; setTimeout(function () { toast.className = toast.className.replace("show", "toast"); $("#FetchToast").empty(); }, 5000);
}
function launch_toastRepeatAll() {
  $("#FetchToast").html('<div id="toastRepeatAll" class="toast">All Track Repeat Enabled.</div>'); var toast = document.getElementById("toastRepeatAll")
  toast.className = "toast show"; setTimeout(function () { toast.className = toast.className.replace("show", "toast"); $("#FetchToast").empty(); }, 5000);
}
