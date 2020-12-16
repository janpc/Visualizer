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