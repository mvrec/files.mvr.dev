for (var i = 0; i < tracklist.length; ++i) {
  $(".aBm-Plist").append(
    "<li class='pL-Gp-itm my-1 up-next' data-playtrkid='" +
      i +
      "' data-spotify-id=" +
      tracklist[i].sptfyid +
      "><div class='d-flex align-items-center'><div class='col-btn'><svg class='line' width='30' height='30' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><polygon fill='none' points='6.5,5 14.5,10 6.5,15'></polygon></svg></div><div class='col-md-6 pL-mTa'><span class='songtitle'>" +
      tracklist[i].song +
      "</span> - <span class='songtitle'>" +
      tracklist[i].artist +
      "</span></div><div class='ml-auto' style='margin-right: 20px;'>" +
      tracklist[i].length +
      "</div></div></li>"
  );
  $("#embed-iframe").attr(
    "src",
    "https://embed.spotify.com/?uri=spotify:" + tracklist[0].sptfyid
  );
}

function songInfo() {
    i = 0
    var $audio = $('#audio-down');
    $audio.attr('src', tracklist[i].source);
    $audio.attr("onclick","openDownloadlink('" + tracklist[i].Tdownloadlink + "','" + tracklist[i].song + ' - ' + tracklist[i].artist +' [Mix Vibe Rec].'+ tracklist[i].Tdownloadformat +"')");
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
    $('.Tdownloadlink').attr('href', tracklist[i].Tdownloadlink);
    $('.aBm-id').html(tracklist[i].musicID);
    $("#copy_url").attr({ "data-clipboard-text": tracklist[i].shorturl });
	$('.shrturl').attr('value', tracklist[i].shorturl);
  }

  songInfo();

document.querySelectorAll("ul#loadPlist > li").forEach((getSpotifyTkId) => {
  getSpotifyTkId.addEventListener("click", () => {
    $("#embed-iframe").attr(
      "src",
      "https://embed.spotify.com/?uri=spotify:" +
        getSpotifyTkId.dataset.spotifyId
    );
    $("#playSpty").click();
    
  });
});

jQuery.fn.clickToggle = function (a, b) {
  return this.on("click", function (ev) {
    [b, a][(this.$_io ^= 1)].call(this, ev);
  });
};

$("#playSpty").clickToggle(
  function (ev) {
    $("#playSpty").html("Hide Player");
    $(".player").addClass("player--active");
  },
  function (ev) {
    $("#playSpty").html("Web Player");
    $(".player").removeClass("player--active");
  }
);

$(window).on("load resize", function () {
  $('iframe[src*="embed.spotify.com"]').each(function () {
    $(this).css("width", $(this).parent().css("width"));
    $(this).attr("src", $(this).attr("src"));
    $(this).removeClass("loaded");

    $(this).on("load", function () {
      $(this).addClass("loaded");
    });
  });
});
