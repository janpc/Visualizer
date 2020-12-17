var mySong = "Disclosure feat. Eliza Dolittle - You and Me (Flume Remix)";
var myAudio = new Audio(
  "music/Disclosure feat. Eliza Dolittle - You and Me (Flume Remix).mp3"
);
var musicArray = myMusic;
var isPlaying = false;
var areShuled = false;

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
  }
}

//-------------------------------------------------------------Slider-----------------------------------------------------------//
var slider = document.getElementById("timeRange");
slider.addEventListener("input", changeTime);

function changeTime() {
  myAudio.currentTime = (this.value * myAudio.duration) / 1000;
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
}

//-------------------------------------------------------------Change Song-----------------------------------------------------------//
function changeSong(song) {
  myAudio.pause();
  mySong = song;
  myAudio = new Audio("music/" + song + ".mp3");
  if (isPlaying) {
    myAudio.play();
  }
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
    musicArray = randomArray([...myMusic]);
    shuffleButton.style.color = "var(--accent)";
    areShuled = true;
  }
}
//-----------------------------------------------------random array-----------------------------------
function randomArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
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
}

//to do print songs in visulizer

//-------------------------------------------change song in main---------------------------------------------//

musicResults.addEventListener("click", getSong);

function getSong(event) {
  if(event.target!=musicResults){
    document.getElementById(mySong).style.backgroundColor='var(--dark)';
  changeSong(event.target.title);
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
    positionA = a.indexOf(parameter);
    positionB = b.indexOf(parameter);
    return a - b;
  });
  return filtered;
}

musicSearchMain.addEventListener("input", searchMain);

function searchMain(event) {
  let match = searchSong(event.target.value, myMusic);
  printInMain(match);
}
