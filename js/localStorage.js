let visualizerData = {};
getDataFromLocalStorage();
getDataFromActualAnimation();
showKeyframes();

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
  let time = myAudio.currentTime;
  if (time == 0) {
    setInitialData();
  } else {
    if (!actualAnimationData) {
      setInitialData();
    }
    let keyframe = createKeyframe();
    actualAnimationData.keyframes[time] = keyframe;
  }
  showKeyframes();
}
function getDataFromActualAnimation() {
  if (visualizerData[mySong]) {
    actualAnimationData = copyObjectWithKF(visualizerData[mySong]);
    setActualData();
  } else {
    keyframes = [];
    setInitialData();
  }
}

function setActualData() {
  myAnimation = actualAnimationData.animation;
  animationsVisualizer.value = myAnimation;
  animationsMain.value = myAnimation;
  colors = getColors(actualAnimationData.colors);
  bars = actualAnimationData.bars;
  velocity = actualAnimationData.colorVelocity;
  numberOfColors = actualAnimationData.numberOfColors;
  keyframes = copyKeyframes(actualAnimationData.keyframes);
  let keys = Object.keys(keyframes);
  if (keys.length > 0) {
    nextKeyFrame = keys[0];
  }
}
function saveActualData() {
  visualizerData[mySong] = copyObjectWithKF(actualAnimationData);
  saveDataToLocalStorage();
}

function setInitialData() {
  actualAnimationData = {
    animation: myAnimation,
    colors: getColors(colors),
    bars: bars,
    velocity: colorVelocity,
    numberOfColors: numberOfColors,
    keyframes: copyKeyframes(keyframes),
  };
  showKeyframes();
}

function createKeyframe() {
  let data = {
    animation: myAnimation,
    colors: getColors(colors),
    bars: bars,
    velocity: colorVelocity,
    numberOfColors: numberOfColors,
  };
  return data;
}

function changeSongKeyfrmes() {
  getDataFromActualAnimation();
  showKeyframes();
}

function changeKeyframe(time) {
  myAnimation = keyframes[time].animation;
  animationsVisualizer.value = myAnimation;
  animationsMain.value = myAnimation;
  colors = getColors(keyframes[time].colors);
  bars = keyframes[time].bars;
  velocity = keyframes[time].colorVelocity;
  numberOfColors = keyframes[time].numberOfColors;
  let keys = Object.keys(keyframes);
  let index = keys.indexOf(time);
  if (keys.length > index) {
    if (keys[index + 1]) {
      nextKeyFrame = keys[index + 1];
    }
  } else {
    nextKeyFrame = null;
  }
}

function showKeyframes() {
  let keyframesToShow = createKeyframeToShow(
    actualAnimationData.animation,
    actualAnimationData.colors,
    actualAnimationData.bars,
    actualAnimationData.velocity,
    "initial",
    0
  );
  Object.keys(actualAnimationData.keyframes).forEach((key) => {
    let time = getTimeFromNumber(key);
    let keyframe = actualAnimationData.keyframes[key];
    keyframesToShow += createKeyframeToShow(
      keyframe.animation,
      keyframe.colors,
      keyframe.bars,
      keyframe.velocity,
      time,
      key
    );
  });
  document.getElementById("keyframesDiv").innerHTML = keyframesToShow;
}

function createKeyframeToShow(animation, colors, bars, velocity, time, key) {
  let string = `<div class='keyframe' id='keyframe'>
  <div class='keyframe__header'>
    <h3>${animation}</h3>
    <span>${time}</span>
  </div>
  <div class='keyframe__color__div'>`;
  let colorsArray = Object.values(colors);
  colorsArray.pop();
  colorsArray.forEach((color) => {
    let c = `rgb(${color.r}, ${color.g}, ${color.b});`;
    string += `<div class='keyframe__color' style='background-color: ${c};'></div>`;
  });
  string += `</div>
  <div class='keyframe__info__div'>
    <p class='keyframe__info'>Bars: ${bars}</p>
    <p class='keyframe__info'>Velocity: ${velocity}</p>
  </div>
  <div class='keyframe__button__div'>
    <button class='keyframe__button material-icons clickable' id='goToKeyframe${time}' value='${key}'> vertical_align_bottom</button>
    <button class='keyframe__button material-icons clickable' id='deleteKeyframe${time}' value='${key}'> delete</button>
  </div>
</div>`;
  return string;
}

function deleteKeyframe(value) {
  delete keyframes[value];
  showKeyframes();
}
function goToKeyframeTime(value) {
  console.log(value);
  myAudio.currentTime = value;
  changeKeyframe(value);
  showKeyframes();
}

function getColors(colors) {
  let newColors = {};
  Object.keys(colors).forEach((key) => {
    newColors[key] = {
      r: colors[key].r,
      g: colors[key].g,
      b: colors[key].b,
    };
  });
  return newColors;
}

function copyObjectWithKF(object) {
  let newObject = {};
  newObject.animation = object.animation;
  newObject.colors = getColors(object.colors);
  newObject.bars = object.bars;
  newObject.velocity = object.velocity;
  newObject.numberOfColors = object.numberOfColors;
  newObject.keyframes = copyKeyframes(object.keyframes);
  return newObject;
}

function copyObject(object) {
  let newObject = {};
  newObject.animation = object.animation;
  newObject.colors = getColors(object.colors);
  newObject.bars = object.bars;
  newObject.velocity = object.velocity;
  newObject.numberOfColors = object.numberOfColors;
  return newObject;
}

function copyKeyframes(k) {
  let keyframes = {};
  Object.keys(k).forEach((key) => {
    keyframes[key] = copyObject(k[key]);
  });
  return keyframes;
}

function goToActualKeyframe() {
  let time = myAudio.currentTime;
  let keys = Object.keys(keyframes);
  let i = 0;
  let canContinue = true;
  while (i < keys.length && canContinue) {
    if (keys[i] <= time) {
      i++;
    } else {
      canContinue = false;
    }
  }
  if (i <= 1) {
    setActualData();
  } else {
    changeKeyframe(keys[i - 1]);
  }
}
