let page='mainPage';

let selectSongButton=document.querySelector(".selectSong>.sectionTitle>.sectionButton");
let selectAnimationButton=document.querySelector(".selectAnimation>.sectionTitle>.sectionButton");

selectSongButton.addEventListener('click', openSection);
selectAnimationButton.addEventListener('click', openSection);


function openSection(event){
    var parent=event.target.parentNode;
    while(parent.nodeName!="DIV"){
        parent=parent.parentNode;
    }
    var content=parent.nextElementSibling;
    if(content.classList.contains('active')){
        content.classList.remove('active');
    }else{
        content.classList.add('active');
    }
}

let startVisualizerButton=document.getElementById("startVisualizerButton");
let goBack=document.getElementById('goBack');
startVisualizerButton.addEventListener('click', changePage);
goBack.addEventListener('click', changePage);

function changePage(){
    if(page=='mainPage'){
        document.getElementById('mainPage').classList.remove('active');
        document.getElementById('visualizerPage').classList.add('active');
        document.querySelector(':root').style.setProperty('--dark', 'black');
        page='visualizerPage';
    }else if(page=='visualizerPage'){
        document.getElementById('visualizerPage').classList.remove('active');
        document.getElementById('mainPage').classList.add('active');
        document.querySelector(':root').style.setProperty('--dark', '#1d283e');
        page='mainPage';
        if(isPlaying){
            playMusic();
        }
    }
}

