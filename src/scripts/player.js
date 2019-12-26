let player = document.getElementById("video");

const formatTime = timeSec => {
    const roundTime = Math.round(timeSec);

    const minutes = Math.floor(roundTime / 60);
    const seconds = roundTime - minutes * 60;

    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${formattedSeconds}`;
};

const onPlayerReady = () => {
    let interval;
    let durationSec = player.getDuration();
    
    $(".player__duration-estimate").text(formatTime(durationSec));

    if (typeof interval !== "undefined") {
        clearInterval(interval);
    }

    interval = setInterval(() => {
        const completedSec = player.getCurrentTime();
        const completedPercent = (completedSec / durationSec) * 100;

        $(".player__playback-button").css({
            left: `${completedPercent}%`
        });

        $(".player__duration-completed").text(formatTime(completedSec));
    }, 1000);
};

const eventsInit = () => {
    $(".player__start").on("click", e => {
        e.preventDefault();
    
        const btn = $(e.currentTarget);    

        if (player.paused) {
            player.play();
            btn.addClass('paused');
            $('.splash').hide();
        } else {
            player.pause();
            btn.removeClass('paused');
        }    
    });

    player.ontimeupdate = function() {
        var barWidth = $('.player__playback').width();
        var length = player.duration;
        //console.log(player.currentTime);
        //console.log(barWidth);
        console.log((player.currentTime / length) * barWidth);
    $(".player__playback-button").css({
        left: `${(player.currentTime / length) * 100}%`
    });
};

$(".player__playback").on("click", e => {
    const bar = $(e.currentTarget);
    const newButtonPosition = e.pageX - bar.offset().left;
    const buttonPosPercent = (newButtonPosition / bar.width()) * 100;
    const newPlayerTimeSec = (player.duration / 100) * buttonPosPercent;

    
    $(".player__playback-button").css({
      left: `${buttonPosPercent}%`
    });

    player.currentTime = newPlayerTimeSec;
  });

$('.player__splash').on('click', e => {
        player.play();
        $('.player__splash').addClass('active');
        $('.player__start').addClass('paused');
        
});
  
};

const onPlayerStateChange = event => {
  const playerButton = $(".player__start");
  /*
  -1 (воспроизведение видео не начато)
  0 (воспроизведение видео завершено)
  1 (воспроизведение)
  2 (пауза)
  3 (буферизация)
  5 (видео подают реплики).
   */
  switch (event.data) {
    case 1: 
      $('.player__wrapper').addClass('active');
      playerButton.addClass("paused");
      break;
    case 2: 
      playerButton.removeClass("paused");
      break;
  }
};

function onVideoAPIReady() {
  player = new YT.Player("player", {
    height: "405",
    width: "660",
    videoId: "zmg_jOwa9Fc",
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    }
  });
}

eventsInit();