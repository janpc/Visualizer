let to=null;
let showButtons=false;

function keysFunctionalities(event) {
  switch (event.keyCode) {
    case 179: //play
      playMusic();
      event.preventDefault();
      break;
    case 176: //next
    case 177: //previous
      event.preventDefault();
      nextPreviousSong(event);
      break;
    case 82: //r
    case 83: //s
      suffleSongs();
      event.preventDefault();
      break;
    case 32: //space
      playMusic();
      event.preventDefault();
      break;
    default:
      break;
  }

  if(showButtons || event.keyCode===9){
    showAllButtons();
  }
}

function showAllButtons() {
  if (to) {
    clearTimeout(to);
  }
  showButtons=true;
  const buttonsBottom = document.getElementById("buttonsBottom");
  const buttonsTop = document.getElementById("buttonsTop");

  buttonsBottom.classList.add("showButtons");
  buttonsTop.classList.add("showButtons");
  to = setTimeout(function () {
    buttonsBottom.classList.remove("showButtons");
    buttonsTop.classList.remove("showButtons");
    clearTimeout(to);
    to=null;
    showButtons=false;
  }, 1000);
}
