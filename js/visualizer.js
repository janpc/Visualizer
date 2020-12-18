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
    let fbc_array;
    window.requestAnimationFrame(frameLooper);

  slider.value = (myAudio.currentTime / myAudio.duration) * 1000; // change slider value to follow the song time
  fbc_array = new Uint8Array(analyser.frequencyBinCount);  // creates a Uint8Array with the same length as the frequencyBinCount
  analyser.getByteFrequencyData(fbc_array); // fill the Uint8Array with data returned from getByteFrequencyData()

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  ctx.fillStyle = "#FF0000"; // Color of the bars
  const divs = 100;
  var bars = 5;
  for(var i=0; i<divs;i++){
      ctx.fillStyle = calculateColor(i,fbc_array[i]/255,1);
      ctx.fillRect(0, (canvas.height*i)/100, canvas.width,  canvas.height/(100));
    }
  //show(fbc_array, divs, bars);
  //iteration++;
  /*for(var j=0; j<bars;j++){
      color = calculateColor(((i*bars)+j), incrementDiference(incrementDiference(fbc_array[i])*255), bars);
      ctx.fillStyle = color;
      ctx.fillRect(0, (canvas.height*i)/(100)+j*(canvas.height/(100*bars)), canvas.width,  canvas.height/(100*bars));
    }*/
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
