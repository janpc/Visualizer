var canvas = document.getElementById("canvas"),
  ctx,
  context,
  analyser,
  animationFrame,
  myAudio,
  hasStarted = false,
  iteration = 0,
  nextKeyFrame;

var requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

var cancelAnimationFrame =
  window.cancelAnimationFrame || window.mozCancelAnimationFrame;

window.onload = function () {
  makeCanvasFullArea();
  calculateMaxDistance();
};

window.onresize = function () {
  makeCanvasFullArea();
  calculateMaxDistance();
};

function makeCanvasFullArea() {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
}
function startAnimation() {
  hasStarted = true;
  if (context) {
    context.close();
  }
  context = new (window.AudioContext || window.webkitAudioContext)(); // AudioContext object instance
  let colorValues=Object.values(colors);
  if (colorValues[0] != colorValues[colorValues.length - 1]) {
    colors['last-color']=colorValues[0] ;
  }
  if(animationFrame){
    cancelAnimationFrame(animationFrame);
  }
  initializeAnimation(context);
}

function initializeAnimation(context) {
  analyser = context.createAnalyser(); // AnalyserNode method
  ctx = canvas.getContext("2d");
  let source = context.createMediaElementSource(myAudio);
  source.connect(analyser);
  analyser.connect(context.destination);
  frameLooper();
}

function frameLooper() {
  if(isPlaying){
    animationFrame = requestAnimationFrame(frameLooper);
    changeSliderValue((myAudio.currentTime / myAudio.duration) * 10000); // change slider value to follow the song time
    changeSliderTime(myAudio.currentTime);
    let frequencyArray = createFrequencyArray();
    animate(ctx, frequencyArray);
    if(nextKeyFrame && myAudio.currentTime>=nextKeyFrame){
      changeKeyframe(nextKeyFrame);
    }
  }
  
}

function createFrequencyArray() {
  let fArray = new Uint8Array(analyser.frequencyBinCount); // creates a Uint8Array with the same length as the frequencyBinCount
  analyser.getByteFrequencyData(fArray); // fill the Uint8Array with data returned from getByteFrequencyData()
  return fArray;
}
