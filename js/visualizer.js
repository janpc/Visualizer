var canvas= document.getElementById("canvas"),
  ctx,
  analyser,
  bars,
  myAudio,
  hasStarted = false,
  iteration=0;

  
window.onload = function () {
    makeCanvasFullArea();
};

window.onresize=function(){
    makeCanvasFullArea();
}

function makeCanvasFullArea(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
}
function start() {
    let context = new (window.AudioContext || window.webkitAudioContext)(); // AudioContext object instance
    //colors.push(colors[0]);
    //increment=0;
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

  let frequencyArray=createFrequencyArray();

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  var bars = 5;
  for(var i=0; i<100;i++){
      ctx.fillStyle = calculateColor(i,frequencyArray[i]/255,1);
      ctx.fillRect(0, (canvas.height*i)/100, canvas.width,  canvas.height/(100));
}
  //show(fbc_array, divs, bars);
}

function createFrequencyArray(){
    let fArray= new Uint8Array(analyser.frequencyBinCount);  // creates a Uint8Array with the same length as the frequencyBinCount
    analyser.getByteFrequencyData(fbc_array); // fill the Uint8Array with data returned from getByteFrequencyData()
    return fArray;
}

function incrementDiference(n) {
  n = n / 255;
  return 3 * n ** 2 - 2 * n ** 3;
}

function calculateColor(n, sat, bars) {
  n = n / (100 * bars);
  var r = 0,
    g = 0,
    b = 0;
  if (n <= 0.5) {
    r = -4 * (n - 0.5) * (n + 0.5);
  } else if (n >= 0.5) {
    b = -4 * (n - 0.5) * (n - 1.5);
  }
  g = -4 * n * (n - 1);

  return (
    "rgb(" + r * 255 * sat + "," + g * 255 * sat + "," + b * 255 * sat + ")"
  );
}


function randomArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function getRandomNumbers(n){
  let numbers=[];
  for(let i=0; i<n; i++){
    numbers.push(i);
  }
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = numbers[i];
    numbers[i] = numbers[j];
    numbers[j] = temp;
  }
  return numbers;

}
