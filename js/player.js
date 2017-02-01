// window load event listener
window.addEventListener('load', () => {
    var video = document.getElementById('video');

    // play or pause event for video player on play button click
    var playButton = document.getElementById('play-button');
    playButton.addEventListener('click', playOrPause, false);

}, false);

var playOrPause = () => {
    if (video.paused){
        video.play();
    } else {
        video.pause();
    }
};