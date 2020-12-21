visualizerData = {};

function getDataFromLocalStorage() {
  if (localStorage.getItem("visualizerData")) {
    let dataJson = localStorage.getItem("visualizerData");
    visualizerData = JSON.parse(dataJson);
  }
}

function saveDataToLocalStorage() {
  let dataJson = JSON.stringify(visualizerData);
  localStorage.setItem("visualizerData", dataJson);
}

function addKeyframe() {
  let keyframe = createKeyframe();
  let time = myAudio.currentTime;
  keyframes[time] = keyframe;
  saveKeyframes();
}

function saveKeyframes() {
  visualizerData[mySong].keyframes = keyframes;
}

function getInitialData() {
  if (!visualizerData[mySong]) {
    visualizerData[mySong] = {
      animation: myAnimation,
      colors: colors,
      bars: bars,
      velocity: colorVelocity,
      numberOfColors: numberOfColors,
      keyframes: keyframes,
    };
  }
}

function setInitialData() {
  if (visualizerData[mySong]) {
    let songData = visualizerData[mySong];
    myAnimation = songData.animation;
    colors = songData.colors;
    bars = songData.bars;
    colorVelocity = songData.colorVelocity;
    numberOfColors = songData.numberOfColors;
    keyframes = songData.keyframes;
  }
}

function createKeyframe() {
  let data = {
    animation: myAnimation,
    colors: colors,
    bars: bars,
    velocity: colorVelocity,
    numberOfColors: numberOfColors,
  };
  return data;
}
