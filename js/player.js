// window load event listener
window.addEventListener('load', () => {
    var video = document.getElementById('video');
    // play or pause event for video player on play button click
    var playButton = document.getElementById('play-button');

    video.load();
    // canplay event listener for video
    video.addEventListener('canplay', function() {
        // event listener for when the play button is clicked. 
        playButton.addEventListener('click', playOrPause, false);
    }, false);

}, false);

var playOrPause = () => {
    var playButton = document.getElementById('play-button');

    if (video.paused){
        video.play();
        playButton.src = 'media/pause.png';
    } else {
        video.pause();
        playButton.src = 'media/play.png';
    }
};