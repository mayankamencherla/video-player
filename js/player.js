// window load event listener
window.addEventListener('load', () => {
    video = document.getElementById('video');
    
    // Get the elements of the form as global variables
    pbar = document.getElementById('pbar');
    pbarContainer = document.getElementById('pbar-container');
    sbar = document.getElementById('sbar');
    sbarContainer = document.getElementById('sbar-container');
    timeField = document.getElementById('time-field');
    videoScreen = document.getElementById('screen');

    playButton = document.getElementById('play-button');
    fullscreenButton = document.getElementById('fullscreen-button');
    soundButton = document.getElementById('sound-button');
    screenButton = document.getElementById('screen-button');

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
        // play and pause from screen button
        screenButton.addEventListener('click', playOrPause, false);
    }, false);

}, false);

// spacebar pause or play
document.addEventListener('keydown', function(event) {
    // spacebar to pause or play
    if(event.keyCode == 32) {
        playOrPause();
    }
});

// play or pause on button click
var playOrPause = () => {
    if (video.paused){
        video.play();
        playButton.src = 'media/pause.png';
        // run every 30 ms
        update = setInterval(updatePlayer, 30); 
        videoScreen.style.display = 'none';
        screenButton.src = 'media/play.png';
    } else {
        video.pause();
        playButton.src = 'media/play.png';
        // interval back to zero
        window.clearInterval(update);
        videoScreen.style.display = 'block';
        screenButton.src = 'media/play.png';
    }
};

// modify screen size on button click
var fullscreenOrNot = () => {
    if (video.requestFullscreen){
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen){
        video.webkitRequestFullscreen();
    } else if (video.mozRequestFullscreen){
        video.mozRequestFullscreen();
    } else if (video.msRequestFullscreen){
        video.msRequestFullscreen();
    }
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

        videoScreen.style.display = 'block';
        screenButton.src = 'media/replay.png';
    } else if (video.paused){
        screenButton.src = 'media/play.png';
        playButton.src = 'media/play.png';
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