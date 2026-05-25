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

const TOTAL_STICKERS = 15;

let albumData =
JSON.parse(
localStorage.getItem(
"albumFiguritas"
)
) || [];

if(albumData.length === 0){

for(let i = 1; i <= TOTAL_STICKERS; i++){

albumData.push({
id:i,
completed:false
});

}

}

openBtn.onclick = () => {

cover.style.display =
"none";

albumPage.style.display =
"block";

createAlbum();

};

function createAlbum(){

grid.innerHTML = "";

albumData.forEach((sticker)=>{

const div =
document.createElement(
"div"
);

div.classList.add(
"slot"
);

if(sticker.completed){

div.classList.add(
"completed"
);

div.innerHTML =
`
<img
src="assets/img/01.png"
class="sticker-image">

<div class="sticker-number">

FIG ${sticker.id}

</div>
`;

}else{

div.innerHTML =
sticker.id;

}

div.onclick = () => {

sticker.completed =
!sticker.completed;

saveAlbum();

createAlbum();

};

grid.appendChild(
div
);

});

updateProgress();

}

function saveAlbum(){

localStorage.setItem(
"albumFiguritas",
JSON.stringify(albumData)
);

}

function updateProgress(){

const completed =
albumData.filter(
sticker => sticker.completed
).length;

const progressText =
document.getElementById(
"progressText"
);

const progressFill =
document.getElementById(
"progressFill"
);

if(!progressText || !progressFill){
return;
}

progressText.innerHTML =
completed +
" / " +
TOTAL_STICKERS +
" figuritas pegadas";

progressFill.style.width =
(completed / TOTAL_STICKERS) * 100 + "%";

}