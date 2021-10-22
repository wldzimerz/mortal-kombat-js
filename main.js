const arenas = document.querySelector(".arenas");
const button = document.querySelector(".button");
const formFight = document.querySelector(".control");

const HIT = {
  head: 30,
  body: 25,
  foot: 15,
};

const ATTACK = ["head", "body", "foot"];

const player1 = {
  player: 1,
  name: "Kitana",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
  weapon: ["steel fans", "flying blade"],
  changeHP,
  elHp,
  renderHP,
  // attack,
};

const player2 = {
  player: 2,
  name: "Scorpion",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["kunai", "hatchet"],
  changeHP,
  elHp,
  renderHP,
  // attack,
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

function showBattleResult(name) {
  const winTitle = createNewElement("winTitle");
  if (name) {
    winTitle.innerText = name + " wins";
  } else {
    winTitle.innerText = "draw";
  }

  arenas.appendChild(winTitle);
}

function createReloadButton() {
  const reloadDiv = createNewElement("reloadWrap");
  const restartButton = createNewElement("button", "button");

  restartButton.innerText = "restart";
  reloadDiv.appendChild(restartButton);
  restartButton.addEventListener("click", function () {
    window.location.reload();
  });

  arenas.appendChild(reloadDiv);
}

function getRandom(num = 20) {
  return Math.ceil(Math.random() * num);
}

function changeHP(num) {
  this.hp -= num;
  if (this.hp <= 0) {
    this.hp = 0;
  }
}

function elHp() {
  return document.querySelector(`.player${this.player} .life`);
}

function renderHP() {
  return (this.elHp().style.width = `${this.hp}%`);
}

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));

function createEnemyAttack() {
  const hit = ATTACK[getRandom(ATTACK.length) - 1];
  const defence = ATTACK[getRandom(ATTACK.length) - 1];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  };
}

formFight.addEventListener("submit", function (e) {
  e.preventDefault();
  const enemyAttack = createEnemyAttack();

  const playerAttack = {};

  for (let item of formFight) {
    if (item.checked && item.name === "hit") {
      playerAttack.value = getRandom(HIT[item.value]);
      playerAttack.hit = item.value;
    }

    if (item.checked && item.name === "defence") {
      playerAttack.defence = item.value;
    }

    item.checked = false;
  }

  console.log("attack: ", playerAttack);
  console.log("enemy: ", enemyAttack);

  if (playerAttack.hit != enemyAttack.defence) {
    player2.changeHP(playerAttack.value);
    player2.renderHP();
  }
  if (enemyAttack.hit != playerAttack.defence) {
    player1.changeHP(enemyAttack.value);
    player1.renderHP();
  }

  if (player1.hp === 0 || player2.hp === 0) {
    button.disabled = true;
    createReloadButton();
  }

  if (player1.hp === 0 && player2.hp > player1.hp) {
    showBattleResult(player2.name);
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    showBattleResult(player1.name);
  } else if (player1.hp === 0 && player2.hp === 0) {
    showBattleResult();
  }
});
