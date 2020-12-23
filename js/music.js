var mySong = "Disclosure feat. Eliza Dolittle - You and Me (Flume Remix)";
var myAudio = new Audio(
  "music/Disclosure feat. Eliza Dolittle - You and Me (Flume Remix).mp3"
);
var selected = "";
var musicArray = myMusic;
var isPlaying = false;
var areShuled = false;
var hasStarted = false;

const musicResults = document.querySelector(".musicResults");
const musicResultsMenu = document.querySelector(".musicResultsMenu");
const musicSearchMain = document.getElementById("musicSearchMain");
const musicSearchMenu = document.getElementById("musicSearchMenu");
const playButton = document.getElementById("playButton");
const slider = document.getElementById("timeRange");
const nextButton = document.getElementById("nextButton");
const previousButton = document.getElementById("previousButton");
const shuffleButton = document.getElementById("shuffleButton");
const fullscreenButton = document.getElementById("fullscreenButton");

//-----------------------------------------------------------on load functions----------------------------------------------//
printInMain(myMusic);
printInVisualizer(myMusic);

//-------------------------------------------------------------Play/Pause-----------------------------------------------------------//

function playMusic() {
  if (isPlaying) {
    myAudio.pause();
    playButton.innerHTML = "play_arrow";
    isPlaying = false;
  } else {
    myAudio.play();
    playButton.innerHTML = "pause";
    isPlaying = true;
    if (!hasStarted) {
      hasStarted = true;
      startAnimation();
    } else {
      frameLooper();
    }
  }
}

//-------------------------------------------------------------Slider-----------------------------------------------------------//



function changeTime() {
  myAudio.currentTime = (this.value * myAudio.duration) / 10000;
  goToActualKeyframe();
}

function changeSliderValue(value) {
  let slider = document.getElementById("timeRange");
  slider.value = value;
  changeSliderTime(value);
}
function changeSliderTime(value) {
  
  timeContainer.innerHTML = getTimeFromNumber(value);
}

function getTimeFromNumber(value){
  s = Math.floor(value);
  m = 0;
  if (s > 60) {
    m = Math.floor(s / 60);
    s = s % 60;
  }
  let timeContainer = document.getElementById("timeContainer");
  let str = "";
  str += m < 10 ? "0" + m : m;
  str += ":";
  str += s < 10 ? "0" + s : s;
  return str;
}

//-------------------------------------------------------------Next/Previous-----------------------------------------------------------//


function nextPreviousSong(event) {
  let index = musicArray.indexOf(mySong);
  if (event.target == nextButton || event.target == myAudio ||event.keyCode==176 ||event.keyCode==39) {
    if (index == myMusic.length - 1) {
      index = 0;
    } else {
      index++;
    }
  } else if (event.target == previousButton ||event.keyCode==177 ||event.keyCode==37) {
    if (index == 0) {
      index = myMusic.length - 1;
    } else {
      index--;
    }
  }
  myAudio.removeEventListener("ended", nextPreviousSong);
  changeSong(musicArray[index]);
  changeSliderValue(0);
  myAudio.addEventListener("ended", nextPreviousSong);
  //startAnimation();
}

//-------------------------------------------------------------Change Song-----------------------------------------------------------//
function changeSong(song) {
  myAudio.pause();
  mySong = song;
  selected = song;
  myAudio = new Audio("music/" + song + ".mp3");
  changeSongTitle(song);
  if (isPlaying) {
    myAudio.play();
  }
  changeSliderValue(0);
  startAnimation();
  changeSongKeyfrmes();
}

//------------------------------------------------------------Change Song In Visualizer------------------------------------------//
function changeSongTitle(song) {
  let songTitle = document.getElementById("songTitle");
  songTitle.innerHTML = song;
}

//-----------------------------------------------------random array-----------------------------------//
function randomizeArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

//-------------------------------------------------------------Shuffle-----------------------------------------------------------//

function suffleSongs() {
  if (areShuled) {
    musicArray = [...myMusic];
    shuffleButton.style.color = "var(--light)";
    areShuled = false;
  } else {
    musicArray = randomizeArray([...myMusic]);
    shuffleButton.style.color = "var(--accent)";
    areShuled = true;
  }
}

//-----------------------------------------------print songs in main--------------------------------------------

function printInMain(songs) {
  var buttons = "";
  songs.forEach((song) => {
    buttons += `  <button
      type="button"
      title="${song}"
      id="${song}main"
      value="${song}"
      class="songItem shadow clickable`;
    if (songs.indexOf(selected) > 0 && song == selected) {
      buttons += " actualSong";
    }
    buttons += `">${song}</button>`;
  });
  musicResults.innerHTML = buttons;
}

//----------------------------------------print songs in visulizer---------------------------------------
function printInVisualizer(songs) {
  var buttons = "";
  songs.forEach((song) => {
    buttons += `  <button
      type="button"
      title="${song}"
      id="${song}menu"
      value="${song}"
      class="songItemMenu shadow clickable`;
    if (songs.indexOf(selected) > 0 && song == selected) {
      buttons += " actualSong";
    }
    buttons += `">${song}</button>`;
  });
  musicResultsMenu.innerHTML = buttons;
}

//-------------------------------------------change song in main---------------------------------------------//

function getSong(event) {
  if (event.target != musicResults) {
    if (document.getElementById(mySong + "main")) {
      document.getElementById(mySong + "main").classList.remove('actualSong');
    }
    if (document.getElementById(mySong + "menu")) {
      document.getElementById(mySong + "menu").classList.remove('actualSong');
    }
    changeSong(event.target.title);
    selected = event.target.value;
    event.target.classList.add('actualSong');
  }
  console.log(event)
}

//to do change song in visualizer

//----------------------------------------------search song------------------------------------------------

function searchSong(parameter, songs) {
  filtered = [];
  filtered = songs.filter((song) =>
    song.toLowerCase().includes(parameter.toLowerCase())
  );

  filtered.sort((a, b) => {
    positionA = a.toLowerCase().indexOf(parameter.toLowerCase());
    positionB = b.toLowerCase().indexOf(parameter.toLowerCase());
    return positionA - positionB;
  });
  return filtered;
}

function searchMain(event) {
  let match = searchSong(event.target.value, myMusic);
  printInMain(match);
}
function searchVisualizer(event){
  let match = searchSong(event.target.value, myMusic);
  printInVisualizer(match);
}

//-------------------------------------------------------fullscreen------------------------------------

function fullscreen() {
  if (canvas.webkitRequestFullScreen) {
    canvas.webkitRequestFullScreen();
  } else {
    canvas.mozRequestFullScreen();
  }
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
}
