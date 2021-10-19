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
  changeHP(num) {
    this.hp -= num;
    if (this.hp <= 0) {
      this.hp = 0;
    }
  },
  elHp() {
    return document.querySelector(`.player${this.player} .life`);
  },
  renderHP() {
    return (this.elHp().style.width = `${this.hp}%`);
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
  changeHP(num) {
    this.hp -= num;
    if (this.hp <= 0) {
      this.hp = 0;
    }
  },
  elHp() {
    return document.querySelector(`.player${this.player} .life`);
  },
  renderHP() {
    return (this.elHp().style.width = `${this.hp}%`);
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

  const img = createNewElement(null, "img");
  img.src = obj.img;

  character.appendChild(img);

  return player;
}

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));

function showBattleResult(name) {
  const winTitle = createNewElement("winTitle");
  if (name) {
    winTitle.innerText = name + " wins";
  } else {
    winTitle.innerText = "draw";
  }

  return winTitle;
}

function createReloadButton() {
  const reloadDiv = createNewElement("reloadWrap");
  const restartButton = createNewElement("button", "button");

  restartButton.innerText = "restart";
  reloadDiv.appendChild(restartButton);
  restartButton.addEventListener("click", function () {
    window.location.reload();
  });

  arenas.append(reloadDiv);
}

function getRandom(num = 20) {
  return Math.ceil(Math.random() * num);
}

button.addEventListener("click", function () {
  player1.changeHP(getRandom());
  player2.changeHP(getRandom());
  player1.renderHP();
  player2.renderHP();

  if (player1.hp === 0 || player2.hp === 0) {
    button.disabled = true;
    createReloadButton();
  }

  if (player1.hp === 0 && player2.hp > player1.hp) {
    arenas.appendChild(showBattleResult(player2.name));
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    arenas.appendChild(showBattleResult(player1.name));
  } else if (player1.hp === 0 && player2.hp === 0) {
    arenas.appendChild(showBattleResult());
  }
});
