$(".aBm-Ptop").append(
  "<ul class='pL-Gp'><li class='my-1' style='display: block;'><div class='d-flex align-items-center'><div class='col-md-1 lite-title-color'>#</div><div class='col-md-6 lite-title-color' style='max-width: 75%;'>TITLE</div><div class='ml-auto' style='margin-right: 20px;'><div class='d-lg-block'><svg class='line' width='20' height='20' viewBox='0 0 25 25' xmlns='http://www.w3.org/2000/svg'><circle fill='none' stroke-width='1.1' cx='10' cy='10' r='9'></circle><rect x='9' y='4' width='1' height='7'></rect><path fill='none' stroke-width='1.1' d='M13.018,14.197 L9.445,10.625'></path></svg></div></div></div></li></ul>"
);
for (var i = 0; i < tracklist.length; ++i) {
  $(".aBm-Plist").append(
    "<li class='pL-Gp-itm my-1 active' data-playtrkid='" +
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
  i = 0;
  var $audio = $("#audio-down");
  $audio.attr("src", tracklist[i].source);
  $audio.attr(
    "onclick",
    "openDownloadlink('" +
      tracklist[i].Tdownloadlink +
      "','" +
      tracklist[i].song +
      " - " +
      tracklist[i].artist +
      " [Mix Vibe Rec]." +
      tracklist[i].Tdownloadformat +
      "')"
  );
  $(".aBm-PGbg").css("background-image", "url(" + tracklist[i].artwork + ")");
  $(".coverart").attr("src", tracklist[i].artwork);
  $(".aBm-tLe").html(tracklist[i].song);
  $(".aBm-aTst").html(tracklist[i].artist);
  $(".aBm-aTst-lnk").attr("href", tracklist[i].artistlink);
  $(".aBm-cPsr").html(tracklist[i].composer);
  $(".aBm-pRod").html(tracklist[i].producer);
  $(".aBm-lYst").html(tracklist[i].lyricist);
  $(".aBm-lAng").html(tracklist[i].language);
  $(".aBm-RDte").html(tracklist[i].releasedate);
  $(".aBm-duTin").html(tracklist[i].length);
  $(".Tdownloadlink").attr("href", tracklist[i].Tdownloadlink);
  $(".aBm-id").html(tracklist[i].musicID);
  $("#copy_url").attr({ "data-clipboard-text": tracklist[i].shorturl });
  $(".shrturl").attr("value", tracklist[i].shorturl);
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
    $("#playSpty").html(
      '<span class="playText"><svg fill="#28d0c9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g><path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z"></path><path d="M20.24,20.15a11,11,0,0,0-4.63-1.59,10.48,10.48,0,0,0-4.81.6A1,1,0,0,0,11.49,21a8.53,8.53,0,0,1,3.91-.49,9,9,0,0,1,3.79,1.3,1,1,0,0,0,1.38-.33A1,1,0,0,0,20.24,20.15Z"></path><path d="M21.88,16.39a13.89,13.89,0,0,0-6-2.06,13.47,13.47,0,0,0-6.2.78,1,1,0,0,0,.7,1.88,11.62,11.62,0,0,1,5.29-.68,12.07,12.07,0,0,1,5.12,1.78,1,1,0,0,0,.53.15,1,1,0,0,0,.52-1.85Z"></path><path d="M23.53,12.61a17.31,17.31,0,0,0-7.31-2.52,16.59,16.59,0,0,0-7.57,1,1,1,0,1,0,.7,1.88A14.73,14.73,0,0,1,16,12.08a15.26,15.26,0,0,1,6.45,2.23,1,1,0,0,0,.53.15,1,1,0,0,0,.85-.47A1,1,0,0,0,23.53,12.61Z"></path></g></svg> Hide Preview</span>'
    );
    $(".SpPlayer").addClass("SpPlayer--active");
  },
  function (ev) {
    $("#playSpty").html(
      '<span class="playText"><svg fill="#28d0c9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g><path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z"></path><path d="M20.24,20.15a11,11,0,0,0-4.63-1.59,10.48,10.48,0,0,0-4.81.6A1,1,0,0,0,11.49,21a8.53,8.53,0,0,1,3.91-.49,9,9,0,0,1,3.79,1.3,1,1,0,0,0,1.38-.33A1,1,0,0,0,20.24,20.15Z"></path><path d="M21.88,16.39a13.89,13.89,0,0,0-6-2.06,13.47,13.47,0,0,0-6.2.78,1,1,0,0,0,.7,1.88,11.62,11.62,0,0,1,5.29-.68,12.07,12.07,0,0,1,5.12,1.78,1,1,0,0,0,.53.15,1,1,0,0,0,.52-1.85Z"></path><path d="M23.53,12.61a17.31,17.31,0,0,0-7.31-2.52,16.59,16.59,0,0,0-7.57,1,1,1,0,1,0,.7,1.88A14.73,14.73,0,0,1,16,12.08a15.26,15.26,0,0,1,6.45,2.23,1,1,0,0,0,.53.15,1,1,0,0,0,.85-.47A1,1,0,0,0,23.53,12.61Z"></path></g></svg> Preview</span>'
    );
    $(".SpPlayer").removeClass("SpPlayer--active");
  }
);

$(window).on("load resize", function () {
  $('iframe[src*="embed.spotify.com"]').each(function () {
    $(this).css("width", $(this).parent().css("width"));
    $(this).attr("src", $(this).attr("src"));
    $(this).removeClass("loaded");

    $(this).on("load", function () {
      $(this).addClass("loaded");
      $('.ej').css("background", "red");
    });
  });
});