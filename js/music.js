var mySong = "Disclosure feat. Eliza Dolittle - You and Me (Flume Remix)";
var myAudio = new Audio(
  "music/Disclosure feat. Eliza Dolittle - You and Me (Flume Remix).mp3"
);
var selected="";
var musicArray = myMusic;
var isPlaying = false;
var areShuled = false;
var hasStarted=false;

const musicResults = document.querySelector(".musicResults");
const musicSearchMain = document.getElementById("musicSearchMain");


//-----------------------------------------------------------on load functions----------------------------------------------//
printInMain(myMusic);

//-------------------------------------------------------------Play/Pause-----------------------------------------------------------//
var playButton = document.getElementById("playButton");
playButton.addEventListener("click", playMusic);
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
    }else{
      frameLooper();
    }
  }
  
}

//-------------------------------------------------------------Slider-----------------------------------------------------------//
var slider = document.getElementById("timeRange");
slider.addEventListener("input", changeTime);

function changeTime() {
  myAudio.currentTime = (this.value * myAudio.duration) / 1000;
}
function changeSliderValue(value){
  let slider = document.getElementById("timeRange");
  slider.value=value;
}
function changeSliderTime(value){
  s=Math.floor(value);
  m=0;
  if(s>60){
    m=Math.floor(s/60);
    s=s%60;
  }
  let timeContainer = document.getElementById("timeContainer");
  let str='';
  str+=m<10?'0'+m:m;
  str+=':';
  str+=s<10?'0'+s:s;
  timeContainer.innerHTML=str;
}

//-------------------------------------------------------------Next/Previous-----------------------------------------------------------//
var nextButton = document.getElementById("nextButton");
var previousButton = document.getElementById("previousButton");

nextButton.addEventListener("click", nextPreviousSong);
previousButton.addEventListener("click", nextPreviousSong);
myAudio.addEventListener("ended", nextPreviousSong);

function nextPreviousSong(event) {
  let index = musicArray.indexOf(mySong);
  if (event.target == nextButton || event.target == myAudio) {
    if (index == myMusic.length - 1) {
      index = 0;
    } else {
      index++;
    }
  } else if (event.target == previousButton) {
    if (index == 0) {
      index = myMusic.length - 1;
    } else {
      index--;
    }
  }
  changeSong(musicArray[index]);
  changeSliderValue(0);
  myAudio.addEventListener("ended", nextPreviousSong);
  //startAnimation();
}

//-------------------------------------------------------------Change Song-----------------------------------------------------------//
function changeSong(song) {
  myAudio.pause();
  mySong = song;
  selected=song;
  myAudio = new Audio("music/" + song + ".mp3");
  changeSongTitle(song);
  if (isPlaying) {
    myAudio.play();
  }
  changeSliderValue(0);
  startAnimation();
}

//------------------------------------------------------------Change Song In Visualizer------------------------------------------//
function changeSongTitle(song){
  let songTitle=document.getElementById('songTitle');
  songTitle.innerHTML=song;
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

var shuffleButton = document.getElementById("shuffleButton");
shuffleButton.addEventListener("click", suffleSongs);
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

//-----------------------------------------------print songs--------------------------------------------

function printInMain(songs) {
  var buttons = "";
  songs.forEach((song) => {
    buttons += `  <button
      type="button"
      title="${song}"
      id="${song}"
      class="songItem shadow clickable"
    >${song}</button>`;
  });
  musicResults.innerHTML = buttons;
  if(songs.indexOf(selected)>0){
    document.getElementById(selected).style.backgroundColor='var(--accent)';
  }
}


//to do print songs in visulizer


//-------------------------------------------change song in main---------------------------------------------//

musicResults.addEventListener("click", getSong);

function getSong(event) {
  if(event.target!=musicResults){
    if(document.getElementById(mySong)){
      document.getElementById(mySong).style.backgroundColor='var(--dark)';
    }
    changeSong(event.target.title);
    selected=event.target.title;
    event.target.style.backgroundColor='var(--accent)';
  }
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

musicSearchMain.addEventListener("input", searchMain);

function searchMain(event) {
  let match = searchSong(event.target.value, myMusic);
  printInMain(match);
}

//-------------------------------------------------------fullscreen-------------------------------------
let   fullscreenButton=document.getElementById('fullscreenButton');
fullscreenButton.addEventListener('click', fullscreen);

function fullscreen() {
  if (canvas.webkitRequestFullScreen) {
    canvas.webkitRequestFullScreen();
  } else {
    canvas.mozRequestFullScreen();
  }
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
}