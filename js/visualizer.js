var canvas = document.getElementById("canvas"),
  ctx,
  context,
  analyser,
  bars,
  myAudio,
  hasStarted = false,
  iteration = 0;

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
function start() {
  hasStarted=true;
  if(context){
    context.close();
  }
  context = new (window.AudioContext || window.webkitAudioContext)(); // AudioContext object instance
  if(colors[0]!=colors[colors.length-1]){
    colors.push(colors[0]);
  }
  increment=0;
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
  window.requestAnimationFrame(frameLooper);

  changeSligerValue((myAudio.currentTime / myAudio.duration) * 1000); // change slider value to follow the song time

  let frequencyArray = createFrequencyArray();

  
  animate(ctx,frequencyArray, 26);
}

function createFrequencyArray() {
  let fArray = new Uint8Array(analyser.frequencyBinCount); // creates a Uint8Array with the same length as the frequencyBinCount
  analyser.getByteFrequencyData(fArray); // fill the Uint8Array with data returned from getByteFrequencyData()
  return fArray;
}
