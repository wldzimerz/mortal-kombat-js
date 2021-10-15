const arenas = document.querySelector(".arenas");
const button = document.querySelector(".button");

const player1 = {
  player: 1,
  name: "Kitana",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
  weapon: ["steel fans", "flying blade"],
  attack: function () {
    console.log(this.name + " - Fight...");
  },
};

const player2 = {
  player: 2,
  name: "Scorpion",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["kunai", "hatchet"],
  attack: function () {
    console.log(this.name + " - Fight...");
  },
};

function createNewElement(className, tag = "div") {
  const elem = document.createElement(tag);
  if (className) {
    elem.classList.add(className);
  }

  return elem;
}

function createPlayer(obj) {
  const player = createNewElement("player" + obj.player);

  const progressbar = createNewElement("progressbar");
  player.appendChild(progressbar);

  const life = createNewElement("life");
  life.style.width = obj.hp + "%";

  const name = createNewElement("name");
  name.innerText = obj.name;

  progressbar.appendChild(life);
  progressbar.appendChild(name);

  const character = createNewElement("character");

  player.appendChild(character);

  const img = document.createElement("img");
  img.src = obj.img;

  character.appendChild(img);

  return player;
}

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));

function hitPlayer(player) {
  const randomHp = Math.ceil(Math.random() * 20);

  const playerLife = document.querySelector(`.player${player.player} .life`);
  player.hp -= randomHp;

  if (player.hp <= 0) {
    playerLife.style.width = 0 + "%";
    arenas.appendChild(playerWin(player.name));
    button.disabled = true;
  } else {
    playerLife.style.width = `${player.hp}%`;
  }
}

function playerWin(name) {
  const winTitle = createNewElement("winTitle");
  if (name === player2.name) {
    winTitle.innerText = player1.name + " wins";
  } else {
    winTitle.innerText = player2.name + " wins";
  }

  return winTitle;
}

button.addEventListener("click", () => {
  hitPlayer(player1);
  hitPlayer(player2);
});
