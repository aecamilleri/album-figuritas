const openBtn =
document.getElementById(
"openAlbum"
);

const cover =
document.getElementById(
"cover"
);

const albumPage =
document.getElementById(
"albumPage"
);

const grid =
document.getElementById(
"albumGrid"
);

openBtn.onclick=()=>{

cover.style.display=
"none";

albumPage.style.display=
"block";

createAlbum();

};

function createAlbum(){

grid.innerHTML="";

for(
let i=1;
i<=15;
i++
){

const div=
document.createElement(
"div"
);

div.classList.add(
"slot"
);

div.innerHTML=i;

grid.appendChild(
div
);

}

}