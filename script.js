console.log("Welcome to Spotify");

//initializing variables 
let songIndex = 1;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

//songs
let songs = [
    { songName: "Warriyo - Mortals", filepath: "songs/1.mp3", coverpath: "covers/1.jpg" },
    { songName: "Ciela - Huma-Huma", filepath: "songs/2.mp3", coverpath: "covers/2.jpg" },
    { songName: "DEAF KEV - Invincible", filepath: "songs/3.mp3", coverpath: "covers/3.jpg" },
    { songName: "Different Heaven & EHIDE", filepath: "songs/4.mp3", coverpath: "covers/4.jpg" },
    { songName: "Janji-Heroes-Tonight", filepath: "songs/5.mp3", coverpath: "covers/5.jpg" },
]

//displaying 5 songs 
songItems.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//play/pause of 5 songs
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        // console.log(parseInt(element.id));
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

//play/pause of single song
const makeplay = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        if (songIndex == parseInt(element.id)) {
            element.classList.remove('fa-play-circle');
            element.classList.add('fa-pause-circle');
        }
    })
}

let playSong = () => {
    //playing the selected song
    audioElement.src = "songs/" + songIndex + ".mp3";
    masterSongName.innerText = songs[songIndex - 1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    //progress bar update
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}

let playNext = () => {
    if (songIndex >= 5) {
        songIndex = 1;
    }
    else {
        songIndex += 1;
    }
    makeAllPlays();
    playSong();
    makeplay();
}

let playPrevious = () => {
    if (songIndex <= 1) {
        songIndex = 5;
    }
    else {
        songIndex -= 1;
    }
    makeAllPlays();
    playSong();
    makeplay();
}

let playPauseSong = () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        //gif opacity for 0.4s
        gif.style.opacity = 1;
        makeplay();
    }
    else {
        audioElement.pause();
        makeAllPlays();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
}

//Handle play/pause click of main-progress bar
masterPlay.addEventListener('click', () => {
    playPauseSong();
})

document.addEventListener('keydown', (e) => {
    if (e.keyCode === 32) {
        playPauseSong();
    }
    else if (e.keyCode === 39) {
        playNext();
    }
    else if (e.keyCode === 37) {
        playPrevious();
    }
});

//Listen to Events

//timeupdate and updating progressbar
audioElement.addEventListener('timeupdate', () => {
    // console.log('timeupdate');
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    // console.log(progress);
    myProgressBar.value = progress;
    if (progress == 100) {
        playNext();
    }
})

//changing the progressbar
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

//changing from above songs
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (selected) => {
        // console.log(selected.target.classList[2]);
        if (selected.target.classList[2] == 'fa-play-circle') {
            if (audioElement.paused && songIndex == parseInt(selected.target.id)) {
                audioElement.play();
                gif.style.opacity = 1;
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
            }
            else {
                makeAllPlays();
                songIndex = parseInt(selected.target.id);
                playSong();
            }
            selected.target.classList.remove('fa-play-circle');
            selected.target.classList.add('fa-pause-circle');
        }
        else {
            audioElement.pause();
            makeAllPlays();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        }
    })
})

document.getElementById('next').addEventListener('click', () => {
    playNext();
})

document.getElementById('previous').addEventListener('click', () => {
    playPrevious();
})







