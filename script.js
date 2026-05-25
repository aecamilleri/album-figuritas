const openBtn = document.getElementById("openAlbum");
const cover = document.getElementById("cover");
const albumPage = document.getElementById("albumPage");
const grid = document.getElementById("albumGrid");
const pageTitle = document.getElementById("countryTitle");
const countrySubtitle = document.getElementById("countrySubtitle");
const countryFlag = document.getElementById("countryFlag");
const countryNav = document.getElementById("countryNav");

const countries = [
  {
    name:"Argentina",
    subtitle:"Argentine Football Association",
    flag:"ARG",
    stickers:[
      { id:1, img:"assets/img/01.png" },
      { id:2, img:"assets/img/01.png" },
      { id:3, img:"assets/img/01.png" },
      { id:4, img:"assets/img/01.png" },
      { id:5, img:"assets/img/01.png" }
    ]
  },
  {
    name:"Brasil",
    subtitle:"Brazilian Football Confederation",
    flag:"BRA",
    stickers:[
      { id:6, img:"assets/img/01.png" },
      { id:7, img:"assets/img/01.png" },
      { id:8, img:"assets/img/01.png" },
      { id:9, img:"assets/img/01.png" },
      { id:10, img:"assets/img/01.png" }
    ]
  },
  {
    name:"Francia",
    subtitle:"French Football Federation",
    flag:"FRA",
    stickers:[
      { id:11, img:"assets/img/01.png" },
      { id:12, img:"assets/img/01.png" },
      { id:13, img:"assets/img/01.png" },
      { id:14, img:"assets/img/01.png" },
      { id:15, img:"assets/img/01.png" }
    ]
  }
];

const TOTAL_STICKERS = countries.reduce(
  (total,country) => total + country.stickers.length,
  0
);

let currentCountryIndex = 0;

let albumData =
JSON.parse(localStorage.getItem("albumFiguritas")) || {};

countries.forEach((country)=>{
  country.stickers.forEach((sticker)=>{
    if(albumData[sticker.id] === undefined){
      albumData[sticker.id] = false;
    }
  });
});

saveAlbum();

openBtn.onclick = () => {
  cover.style.display = "none";
  albumPage.style.display = "block";
  createAlbum();
};

function createAlbum(){

  const currentCountry = countries[currentCountryIndex];

  pageTitle.innerHTML = currentCountry.name;
  countrySubtitle.innerHTML = currentCountry.subtitle;
  countryFlag.innerHTML = currentCountry.flag;

  grid.innerHTML = "";

  currentCountry.stickers.forEach((sticker)=>{

    const div = document.createElement("div");

    div.classList.add("slot");

    if(albumData[sticker.id]){

      div.classList.add("completed");

      div.innerHTML =
      `
      <img src="${sticker.img}" class="sticker-image">

      <div class="sticker-number">
      FIG ${sticker.id}
      </div>
      `;

    }else{

      div.innerHTML =
      `
      <span class="empty-number">
      ${sticker.id}
      </span>
      `;

    }

    div.onclick = () => {
      albumData[sticker.id] = !albumData[sticker.id];
      saveAlbum();
      createAlbum();
    };

    grid.appendChild(div);

  });

  createCountryNavigation();
  updateProgress();

}

function createCountryNavigation(){

  countryNav.innerHTML = "";

  countries.forEach((country,index)=>{

    const button = document.createElement("button");

    button.innerHTML = country.name;

    if(index === currentCountryIndex){
      button.classList.add("active-country");
    }

    button.onclick = () => {
      currentCountryIndex = index;
      createAlbum();
    };

    countryNav.appendChild(button);

  });

}

function saveAlbum(){
  localStorage.setItem(
    "albumFiguritas",
    JSON.stringify(albumData)
  );
}

function updateProgress(){

  const completed =
  Object.values(albumData).filter(Boolean).length;

  const progressText = document.getElementById("progressText");
  const progressFill = document.getElementById("progressFill");

  if(!progressText || !progressFill){
    return;
  }

  progressText.innerHTML =
  completed + " / " + TOTAL_STICKERS + " figuritas pegadas";

  progressFill.style.width =
  (completed / TOTAL_STICKERS) * 100 + "%";

}