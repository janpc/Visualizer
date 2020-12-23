let page = "mainPage";

//initilize all document variables
const animationsMain = document.getElementById("animationsMain");
const animationsVisualizer = document.getElementById("animationsVisualizer");
const colorsMain = document.getElementById("colorsMain");
const colorsVisualizer = document.querySelector("#buttonsTop>#colors");
const sliderBarsVisualizer = document.getElementById("sliderBarsVisualizer");
const sliderBarsMain = document.getElementById("sliderBars");
const menuButton=document.getElementById('menuButton');
const closeMenu=document.getElementById('closeMenu');
const setMain=document.getElementById('setMain');
const createKF=document.getElementById('createKeyframe');
const saveKeyframes=document.getElementById('saveKeyframes');
const keyframesDiv=document.getElementById('keyframesDiv');
const sliderVelocityVisualizer = document.getElementById(
  "sliderVelocityVisualizer"
);
const sliderVelocityMain = document.getElementById("sliderVelocity");
const menuItemsDiv=document.getElementById('menuItemsDiv');
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

menuButton.addEventListener('click', showMenu);
menuItemsDiv.addEventListener('click', changePageMenu);
closeMenu.addEventListener('click', hideMenu)

setMain.addEventListener('click', setInitialData);
createKF.addEventListener('click', addKeyframe);
saveKeyframes.addEventListener('click', saveActualData);
keyframesDiv.addEventListener('click', keyframeAction)

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
    document.querySelector("body").style.backgroundColor= "black";
    setInputVariablesVisualizer();
    page = "visualizerPage";
  } else if (page == "visualizerPage") {
    document.getElementById("visualizerPage").classList.remove("active");
    document.getElementById("mainPage").classList.add("active");
    document.querySelector("body").style.backgroundColor= "var(--dark)";
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
  console.log(colors);
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
    colors["color-" + numberOfColors] = { r: 255, g: 255, b: 255 };
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
  event.target.previousElementSibling.innerHTML = "Subdivisions: " + bars;
}

function getSliderVelocityValue(event) {
  colorVelocity = event.target.value / 10;
  event.target.previousElementSibling.innerHTML = "Color velocity: " + colorVelocity;
}

//---------------------------------setInputVariables------------------

function setInputVariablesMain() {
  printAnimations(animationsMain);
  printColors(colorsMain);
  sliderBarsMain.value = bars;
  sliderBarsMain.previousElementSibling.innerHTML = "Subdivisions: " + bars;
  sliderVelocityMain.value = colorVelocity*10;
  sliderVelocityMain.previousElementSibling.innerHTML = "Color velocity: " + colorVelocity;
}

function setInputVariablesVisualizer(){
  printAnimations(animationsVisualizer);
  printColors(colorsVisualizer);
  sliderBarsVisualizer.value=bars;
  sliderBarsVisualizer.previousElementSibling.innerHTML = "Subdivisions: " + bars;
  sliderVelocityVisualizer.value=colorVelocity*10;
  sliderVelocityVisualizer.previousElementSibling.innerHTML = "Color velocity: " + colorVelocity;
}



//----------------------------------------menu Buttons-------------------------------------//

function showMenu(){
  menu=document.getElementById('menu');
  if(!menu.classList.contains('menuActive')){
    menu.classList.add('menuActive')
  }
}
function hideMenu(){
  menu=document.getElementById('menu');
  if(menu.classList.contains('menuActive')){
    menu.classList.remove('menuActive')
  }
}
function changePageMenu(event){
  if(event.target.value=='music'){
    document.getElementById('menuSearch').classList.add('active');
    document.getElementById('menuKeyframes').classList.remove('active');
    document.getElementById('KeyframesButtonMenu').classList.remove('menuItemActive');
    document.getElementById('musicButtonMenu').classList.add('menuItemActive');
  }else if(event.target.value=='keyframes'){
    document.getElementById('menuSearch').classList.remove('active');
    document.getElementById('menuKeyframes').classList.add('active');
    document.getElementById('KeyframesButtonMenu').classList.add('menuItemActive');
    document.getElementById('musicButtonMenu').classList.remove('menuItemActive');
  }
}

function keyframeAction(event){
  if(event.target.id.includes('deleteKeyframe')){
    deleteKeyframe(event.target.value);
  }else if(event.target.id.includes('goToKeyframe')){
    goToKeyframeTime(event.target.value);
  }
}