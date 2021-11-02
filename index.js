const parent = document.querySelector(".parent");
const player = document.querySelector(".player");
const enemy = document.querySelector(".enemy");
const audioFx = document.querySelector(".fxSound");
const audioBg = document.querySelector(".bgSound");

const createElement = (tag, className) => {
  const elem = document.createElement(tag);
  if (className) {
    if (Array.isArray(className)) {
      className.forEach((item) => {
        elem.classList.add(item);
      });
    } else {
      elem.classList.add(className);
    }
  }

  return elem;
};

function createEmptyPlayerBlock() {
  const el = createElement("div", ["character", "div11", "disabled"]);
  const img = createElement("img");
  img.src = "http://reactmarathon-api.herokuapp.com/assets/mk/avatar/11.png";
  el.appendChild(img);
  parent.appendChild(el);
}

async function init() {
  localStorage.removeItem("player1");

  const players = await fetch("https://reactmarathon-api.herokuapp.com/api/mk/players").then((res) => res.json());

  let flag = true;
  let imgSrc = null;
  createEmptyPlayerBlock();

  players.forEach((item) => {
    const el = createElement("div", ["character", `div${item.id}`]);
    const img = createElement("img");

    function handleMouseMove() {
      if (flag && imgSrc === null) {
        imgSrc = item.img;
        const img = createElement("img");
        img.src = imgSrc;
        player.appendChild(img);
        audioFx.src = "./assets/sound/MouseOver.mp3";
      }
    }

    function handleMouseOut() {
      if (flag && imgSrc) {
        imgSrc = null;
        player.innerHTML = "";
      }
    }

    if (flag) {
      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseout", handleMouseOut);
    }

    el.addEventListener("click", () => {
      if (flag) {
        flag = false;
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseout", handleMouseOut);
        localStorage.setItem("player1", JSON.stringify(item));
        el.disabled = true;
        el.classList.toggle("active");
        audioFx.src = "./assets/sound/ChooseFighter.mp3";

        let enemyImgSrc = null;
        let currentCharacterDiv = null;
        let currentEnemyFighter = null;

        let timerId = setInterval(() => {
          let randomFigher = players[Math.ceil(Math.random() * (players.length - 1))];

          currentCharacterDiv = document.querySelector(`.div${randomFigher.id}`);
          currentEnemyFighter = randomFigher;

          if (enemyImgSrc === null && currentCharacterDiv === null) {
            currentCharacterDiv = document.querySelector(`.div${randomFigher.id}`);
          }

          currentCharacterDiv.classList.add("enemySelect");

          enemyImgSrc = randomFigher.img;
          const img = createElement("img");
          img.src = enemyImgSrc;
          enemy.appendChild(img);
          audioFx.src = "./assets/sound/MouseOver.mp3";
        }, 1000);

        let timerId2 = setInterval(() => {
          if (enemyImgSrc && currentCharacterDiv) {
            currentCharacterDiv.classList.remove("enemySelect");
            enemyImgSrc = null;
            enemy.innerHTML = "";
          }
        }, 1300);

        setTimeout(() => {
          clearInterval(timerId);
          clearInterval(timerId2);
          localStorage.setItem("enemy", JSON.stringify(currentEnemyFighter));
          audioFx.src = "./assets/sound/FighterSelected.mp3";
          audioBg.src = " ";
        }, 4800);

        setTimeout(() => {
          window.location.pathname = "arenas.html";
        }, 7800);
      }
    });

    img.src = item.avatar;
    img.alt = item.name;

    el.appendChild(img);
    parent.appendChild(el);
  });
}

init();
