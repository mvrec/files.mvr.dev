// WaveSurfer Initialization
var colorMode;

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    colorMode = "#40434a";
} else{
     colorMode = "#d0d7db";
}

var wavesurfer = WaveSurfer.create({
    container: '#audiowave',
    waveColor: colorMode,
    progressColor: '#00c5cd',
    barWidth: 2,
    barGap: 1,
    cursor:false,
    cursorWidth: 0,
    height: 80,
    barHeight: 0.7,
});

wavesurferInit(wavesurfer);

function wavesurferInit(wavesurfer) {
    var trackID = document.getElementById('audiowave');
    var songURL = trackID.dataset.waveurl;
    wavesurfer.load(songURL);

    function formatSecondsAsTime(secs) {
        var hr  = Math.floor(secs / 3600);
        var min = Math.floor((secs - (hr * 3600))/60);
        var sec = Math.floor(secs - (hr * 3600) -  (min * 60));

        if (min < 10){ 
            min = "0" + min; 
        }
        if (sec < 10){ 
            sec  = "0" + sec;
        }
        return min + ':' + sec;
    }


    $(document).ready(function($){
        $('#currentTime').appendTo('wave wave');
    });

    wavesurfer.on('audioprocess', function () {
        var clipCurrentTime = wavesurfer.getCurrentTime();
        document.getElementById('currentTime').innerHTML = formatSecondsAsTime(clipCurrentTime);
    });

    wavesurfer.on('ready', function () {
        var clipTime = wavesurfer.getDuration();
        document.getElementById('clipTime').innerHTML = formatSecondsAsTime(clipTime);
    });

    wavesurfer.on('interaction', function () {
        var clipCurrentTime = wavesurfer.getCurrentTime();
        document.getElementById('currentTime').innerHTML = formatSecondsAsTime(clipCurrentTime);
    });

    wavesurfer.on('play', function () {
        $(document).ready(function () {
            $('#wavePlayer').addClass('playing');
           // $('.jplayer').jPlayer("pauseOthers");
        });
    });

    wavesurfer.on('pause', function () {
        $(document).ready(function () {
            $('#wavePlayer').removeClass('playing');
        });
    });
}