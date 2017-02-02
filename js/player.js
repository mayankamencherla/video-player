// window load event listener
window.addEventListener('load', () => {
    video = document.getElementById('video');
    
    // Get the elements of the form as global variables
    pbar = document.getElementById('pbar');
    pbarContainer = document.getElementById('pbar-container');
    playButton = document.getElementById('play-button');
    fullscreenButton = document.getElementById('fullscreen-button');
    soundButton = document.getElementById('sound-button');
    sbar = document.getElementById('sbar');
    sbarContainer = document.getElementById('sbar-container');
    timeField = document.getElementById('time-field');

    video.load();
    // canplay event listener for video
    video.addEventListener('canplay', function() {
        updatePlayer();
        // event listener for when the play button is clicked. 
        playButton.addEventListener('click', playOrPause, false);
        // progress bar click
        pbarContainer.addEventListener('click', skip, false);
        // button to make the video fullscreen
        fullscreenButton.addEventListener('click', fullscreenOrNot, false);
        // Toggle mute
        soundButton.addEventListener('click', muteOrUnmute, false);
        // changing volume
        sbarContainer.addEventListener('click', volume, false);
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
    video.fullscreen();
};

var updatePlayer = () => {
    var percentage = (video.currentTime / video.duration) * 100;
    pbar.style.width = percentage + '%';

    var currentTime = getFormattedTime(video.currentTime);
    var duration = getFormattedTime(video.duration)
    timeField.innerHTML = currentTime + ' / ' + duration;

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
    // width of pbar = 640
    var width = parseFloat(barwidth.substr(0, barwidth.length - 2));

    video.currentTime = (mousex / width) * video.duration;
    updatePlayer();
};

// MM:SS / MM:SS
var getFormattedTime = (time) => {
    var seconds = Math.round(time);

    var minutes = Math.floor(seconds / 60);

    // To avoid second number 61, 62, 63 etc
    seconds = seconds - minutes * 60;

    if (seconds.toString().length === 1){
        seconds = '0' + seconds;
    }

    if (minutes.toString().length === 1){
        minutes = '0' + minutes;
    }

    return minutes + ':' + seconds;
};

var muteOrUnmute = () => {
    if (!video.muted){
        video.muted = true;
        soundButton.src = 'media/mute.png';
        sbar.style.display = 'none';
    } else {
        video.muted = false;
        soundButton.src = 'media/sound.png';
        sbar.style.display = 'block';
    }
};

var volume = (event) => {
    var mousex = event.pageX - sbarContainer.offsetLeft; 
    var barwidth = window.getComputedStyle(sbarContainer).getPropertyValue('width'); 

    var width = parseFloat(barwidth.substr(0, barwidth.length - 2));

    video.volume = (mousex / width);
    sbar.style.width = video.volume * 100 + '%';
    
    // unmute volume on click
    video.muted = false;
    soundButton.src = 'media/sound.png';
    sbar.style.display = 'block';
}