//CUSTOM VIDEO PLAYER

//See if the browser can actually play the video player and only setup the custom controls if it does
const supportsVideo = !!document.createElement('video').canPlayType;
if (supportsVideo) {

    // VARIABLES
    const videoContainer = document.getElementById('videoContainer');
    const video = document.getElementById('video');
    const videoControls = document.getElementById('video-controls');
    //Variables for each of the video controls
    const playpause = document.getElementById('playpause');
    const speed = document.getElementById('speed');
    const stop = document.getElementById('stop');
    const mute = document.getElementById('mute');
    const volinc = document.getElementById('volinc');
    const voldec = document.getElementById('voldec');
    const progressBar = document.getElementById('progress-bar');
    const fullscreen = document.getElementById('fs');
    const skipForward = document.getElementById('skipBut');
    const rewind = document.getElementById('rewindBut');
    const volume = document.getElementById('volume');

    // Hide the default controls
    video.controls = false;

    // Display the custom video controls
    videoControls.style.display = 'block';

    //FUNCTIONS

    //PLAY PAUSE BUTTON - on click, the video is either played or paused depending on if the video is paused or not
    const videoPlayPause = (e) => {
        video.paused || video.ended ? video.play() : video.pause();
    }

    //STOP BUTTON - on click, the video is stopped and the video is returned to the start
    const stopVideo = () => {
        video.currentTime = 0;
        progressBar.value = 0;
        video.pause();
    }

    //MUTE BUTTON - on click, audio is muted...of course :)
    const muteVideo = () => {
        video.muted = !video.muted;
    }

    //VOLUME BUTTONS - Increase or decrease volume on click

    //Volume change function - change volume according to the slider position

    function changeVolume() {
        video.volume = this.value;
    }

    //PROGRESS BAR - Listen out for the video duration time updates, then move the progress bar along in correlation to the percentage of the duration of the video is complete

    const updateProgressBar = () => {
        var percentage = Math.floor((100 / video.duration) *
            video.currentTime);
        progressBar.value = percentage;
    }

    //PROGRESS BAR & SCRUB - When clicking anywhere on the progress bar, it skips the video ahead to that point (roughtly)

    const scrub = (e) => {
        const scrubTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
        video.currentTime = scrubTime;
    }

    let mousedown = false;

    //SKIP AHEAD (Button) - Skip forward 10s on click

    const skipAhead = () => {
        video.currentTime += 10;
    }

    //REWIND (button) - Rewind 10s on click

    const rewindVideo = () => {
        video.currentTime -= 10;
    }


    //FULL SCREEN
    //Check if full screen is available on the browser, if so, request full screen. If not, set fullscreen button to none so it cant be seen
    const fullScreenMode = () => {
        document.fullscreenEnabled ? video.requestFullscreen() : fullscreen.style.display = 'none';
    }

    //TRANSITION FOR CONTROLS - Controls fade in when the mouse is over the video

    const controlsIn = () => {
        videoControls.classList.remove('fadeout')
        videoControls.classList.add('fadein');
    }


    const controlsOut = () => {
        videoControls.classList.remove('fadein')
        videoControls.classList.add('fadeout');
    }

    //SPEED SLIDER - When user changes the slider the speed of the video is adjusted

    function changeSpeed() {
        video.playbackRate = this.value;
    }

    //ALL EVENT LISTENERS 
    //Video Speed
    speed.addEventListener('change', changeSpeed);
    speed.addEventListener('mousemove', changeSpeed);

    //Play/pause button
    playpause.addEventListener('click', videoPlayPause);
    window.addEventListener('keyup', function (e) {
        if (e.keyCode === 32) {
            videoPlayPause();
        }
    })

    //Stop video
    stop.addEventListener('click', stopVideo)

    //mMte video
    mute.addEventListener('click', muteVideo);

    //PROGRESS BAR

    video.addEventListener('timeupdate', updateProgressBar, false);
    progressBar.addEventListener('click', scrub);
    progressBar.addEventListener('mousemove', (e) => mousedown && scrub(e));
    progressBar.addEventListener('mousedown', () => mousedown = true);
    progressBar.addEventListener('mouseup', () => mousedown = false);

    //CHANGE VOLUME
    volume.addEventListener('change', changeVolume);
    volume.addEventListener('mousemove', changeVolume);

    //SKIP AHEAD 
    skipForward.addEventListener('click', skipAhead);
    window.addEventListener('keyup', (e) => {
        if (e.keyCode === 39) {
            skipAhead();
        }
    });

    //REWIND
    rewind.addEventListener('click', rewindVideo);
    window.addEventListener('keyup', (e) => {
        if (e.keyCode === 37) {
            rewindVideo();
        }
    });

    //FULLSCREEN
    fullscreen.addEventListener('click', fullScreenMode);

    //CONTROLS TRANSITION
    videoContainer.addEventListener('mouseover', controlsIn);
    videoContainer.addEventListener('mouseout', controlsOut);
}