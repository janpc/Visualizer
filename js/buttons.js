let page = "mainPage";

//initilize all document variables
const animationsMain = document.getElementById("animationsMain");
const animationsVisualizer = document.getElementById("animationsVisualizer");
const colorsMain = document.getElementById("colorsMain");
const colorsVisualizer = document.querySelector("#buttonsTop>#colors");
const sliderBarsVisualizer = document.getElementById("sliderBarsVisualizer");
const sliderBarsMain = document.getElementById("sliderBars");
const sliderVelocityVisualizer = document.getElementById(
  "sliderVelocityVisualizer"
);
const sliderVelocityMain = document.getElementById("sliderVelocity");
let selectSongButton = document.querySelector(
  ".selectSong>.sectionTitle>.sectionButton"
);
let selectAnimationButton = document.querySelector(
  ".selectAnimation>.sectionTitle>.sectionButton"
);

// do on load
printAnimations(animationsMain);
printColors(colorsMain);

selectSongButton.addEventListener("click", openSection);
selectAnimationButton.addEventListener("click", openSection);

colorsMain.addEventListener("change", changeColor);
colorsVisualizer.addEventListener("change", changeColor);

colorsMain.addEventListener("click", addRemoveColor);
colorsVisualizer.addEventListener("click", addRemoveColor);

sliderBarsVisualizer.addEventListener("change", getSliderBarsValue);
sliderBarsMain.addEventListener("change", getSliderBarsValue);

sliderVelocityVisualizer.addEventListener("change", getSliderVelocityValue);
sliderVelocityMain.addEventListener("change", getSliderVelocityValue);

function openSection(event) {
  var parent = event.target.parentNode;
  while (parent.nodeName != "DIV") {
    parent = parent.parentNode;
  }
  var content = parent.nextElementSibling;
  if (content.classList.contains("active")) {
    content.classList.remove("active");
  } else {
    content.classList.add("active");
  }
}

let startVisualizerButton = document.getElementById("startVisualizerButton");
let goBack = document.getElementById("goBack");
startVisualizerButton.addEventListener("click", changePage);
goBack.addEventListener("click", changePage);

function changePage() {
  if (page == "mainPage") {
    document.getElementById("mainPage").classList.remove("active");
    document.getElementById("visualizerPage").classList.add("active");
    document.querySelector(":root").style.setProperty("--dark", "black");
    setInputVariablesVisualizer();
    page = "visualizerPage";
  } else if (page == "visualizerPage") {
    document.getElementById("visualizerPage").classList.remove("active");
    document.getElementById("mainPage").classList.add("active");
    document.querySelector(":root").style.setProperty("--dark", "#1d283e");
    setInputVariablesMain();
    page = "mainPage";
    printInMain(myMusic);
    if (isPlaying) {
      playMusic();
    }
  }
}

// ------------------------------------------Print animations in main and visualizer-------------------------//

function printAnimations(here) {
  here.innerHTML = "";
  let animationNames = Object.keys(animations);
  animationNames.forEach((name) => {
    let option = document.createElement("option");
    option.setAttribute("value", name);
    if (name == myAnimation) {
      option.setAttribute("selected", true);
    }
    option.innerHTML = name;
    here.appendChild(option);
  });
}

//-----------------------------------------change animation-----------------------
animationsMain.addEventListener("click", changeAnimation);
animationsVisualizer.addEventListener("click", changeAnimation);

function changeAnimation(event) {
  myAnimation = event.target.value;
}

// ------------------------------------------Print colors-----------------------------------------------------//

function printColors(here) {
  let keys = Object.keys(colors);
  let string = `<button
  type="button"
  id="removeColor"
  class="material-icons addColor clickable"
>
  remove
</button>`;

  keys.forEach((key) => {
    if (key != "last-color") {
      let color = rgbToHex(colors[key].r, colors[key].g, colors[key].b);
      string +=
        `<input
      type="color"
      id="${key}"
      name="favcolor"
      value=` +
        color +
        `
      class="clickable"
    />`;
    }
  });

  string += `<button
  type="button"
  id="addColor"
  class="material-icons addColor clickable"
>
  add
</button>`;

  here.innerHTML = string;
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function changeColor(event) {
  let colorValues = Object.values(colors);
  if (colors[event.target.id] == colorValues[0]) {
    colors["last-color"] = hex_to_RGB(event.target.value);
  }
  colors[event.target.id] = hex_to_RGB(event.target.value);
}

//------------------------------------------Add remove colors----------------------------

function addRemoveColor(event) {
  if (event.target.id === "removeColor") {
    removeColor(event);
  } else if (event.target.id === "addColor") {
    addColor(event);
  }
}
function addColor(event) {
  let keys = Object.keys(colors);
  if (keys.length < 10) {
    let last = colors["last-color"];
    delete colors["last-color"];
    colors["color-" + numberOfColors] = { r: 0, g: 0, b: 0 };
    colors["last-color"] = last;
    numberOfColors++;
  } else {
    alert("Too many colors");
  }
  printColors(event.target.parentNode);
}
function removeColor(event) {
  let keys = Object.keys(colors);
  if (keys.length > 2) {
    delete colors[keys[0]];
    colors["last-color"] = colors[keys[1]];
    printColors(event.target.parentNode);
  } else {
    alert("Can't be less than 2 colors");
  }
}

//--------------------------------buttons parameters----------------------------

function getSliderBarsValue(event) {
  bars = event.target.value;
  event.target.previousElementSibling.innerHTML = "Bars: " + bars;
}

function getSliderVelocityValue(event) {
  colorVelocity = event.target.value / 10;
  event.target.previousElementSibling.innerHTML = "Velocity: " + colorVelocity;
}

//---------------------------------setInputVariables------------------

function setInputVariablesMain() {
  printAnimations(animationsMain);
  printColors(colorsMain);
  sliderBarsMain.value = bars;
  sliderBarsMain.previousElementSibling.innerHTML = "Bars: " + bars;
  sliderVelocityMain.value = colorVelocity*10;
  sliderVelocityMain.previousElementSibling.innerHTML = "Velocity: " + colorVelocity;
}

function setInputVariablesVisualizer(){
  printAnimations(animationsVisualizer);
  printColors(colorsVisualizer);
  sliderBarsVisualizer.value=bars;
  sliderBarsVisualizer.previousElementSibling.innerHTML = "Bars: " + bars;
  sliderVelocityVisualizer.value=colorVelocity*10;
  sliderVelocityVisualizer.previousElementSibling.innerHTML = "Velocity: " + colorVelocity;
}
