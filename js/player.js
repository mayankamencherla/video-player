// window load event listener
window.addEventListener('load', () => {
    video = document.getElementById('video');
    
    // Get the elements of the form as global variables
    playButton = document.getElementById('play-button');
    fullscreenButton = document.getElementById('fullscreen-button');
    pbar = document.getElementById('pbar');
    pbarContainer = document.getElementById('pbar-container');
    soundButton = document.getElementById('sound-button');
    timeField = document.getElementById('time-field');

    video.load();
    // canplay event listener for video
    video.addEventListener('canplay', function() {
        // event listener for when the play button is clicked. 
        playButton.addEventListener('click', playOrPause, false);
        // progress bar click
        pbarContainer.addEventListener('click', skip, false);
        // button to make the video fullscreen
        fullscreenButton.addEventListener('click', fullscreenOrNot, false);
        // Toggle mute
        // soundButton.addEventListener('click', muteOrNot, false);
    }, false);

}, false);

// play or pause on button click
var playOrPause = () => {
    if (video.paused){
        video.play();
        playButton.src = 'media/pause.png';
        // run every 30 ms
        update = setInterval(updatePlayer, 30); 
    } else {
        video.pause();
        playButton.src = 'media/play.png';
        // interval back to zero
        window.clearInterval(update);
    }
};

// modify screen size on button click
var fullscreenOrNot = () => {
    // Enter full screen if screen is not full screen
    // Enter normal screen if screen is full screen
};

var updatePlayer = () => {
    var percentage = (video.currentTime / video.duration) * 100;

    pbar.style.width = percentage + '%';

    if (video.ended){
        window.clearInterval(update);
        playButton.src = 'media/replay.png';
    }
};

var skip = (event) => {
    // x-coord of mouse
    var mousex = event.pageX - pbarContainer.offsetLeft; 
    // width of pbar = 640px
    var barwidth = window.getComputedStyle(pbarContainer).getPropertyValue('width'); 
    var width = barwidth.substr(0, barwidth.length - 2);

    video.currentTime = (mousex / width) * video.duration;
};