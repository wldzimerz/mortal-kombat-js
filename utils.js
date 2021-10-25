import { generateLogs } from "./logs.js";
import { formFight } from "./main.js";

const HIT = {
  head: 30,
  body: 25,
  foot: 15,
};

const ATTACK = ["head", "body", "foot"];

export function getRandom(num = 20) {
  return Math.ceil(Math.random() * num);
}

export function changeHP(num) {
  this.hp -= num;
  if (this.hp <= 0) {
    this.hp = 0;
  }
}

export function elHp() {
  return document.querySelector(`.player${this.player} .life`);
}

export function renderHP() {
  return (this.elHp().style.width = `${this.hp}%`);
}

export function createNewElement(className, tag = "div") {
  const elem = document.createElement(tag);
  if (className) {
    elem.classList.add(className);
  }

  return elem;
}

export function createReloadButton() {
  const reloadDiv = createNewElement("reloadWrap");
  const restartButton = createNewElement("button", "button");

  restartButton.innerText = "restart";
  reloadDiv.appendChild(restartButton);
  restartButton.addEventListener("click", function () {
    window.location.reload();
  });

  return reloadDiv;
}

export function showBattleResult(name) {
  const winTitle = createNewElement("winTitle");
  if (name) {
    winTitle.innerText = name + " wins";
  } else {
    winTitle.innerText = "draw";
    generateLogs("draw");
  }

  return winTitle;
}

export function createPlayer(obj) {
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

export function createEnemyAttack() {
<<<<<<< HEAD
  const enemyHit = ATTACK[getRandom(ATTACK.length) - 1];
  const enemyDefence = ATTACK[getRandom(ATTACK.length) - 1];

  return {
    enemyValue: getRandom(HIT[enemyHit]),
    enemyHit,
    enemyDefence,
=======
  const hit = ATTACK[getRandom(ATTACK.length) - 1];
  const defence = ATTACK[getRandom(ATTACK.length) - 1];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
>>>>>>> b2d28a8 (refactor: main.js rework to js module, prepare for destructurization)
  };
}

export function createPlayerAttack() {
  const attack = {};

  for (let item of formFight) {
    if (item.checked && item.name === "hit") {
<<<<<<< HEAD
      attack.playerValue = getRandom(HIT[item.value]);
      attack.playerHit = item.value;
    }

    if (item.checked && item.name === "defence") {
      attack.playerDefence = item.value;
=======
      attack.value = getRandom(HIT[item.value]);
      attack.hit = item.value;
    }

    if (item.checked && item.name === "defence") {
      attack.defence = item.value;
>>>>>>> b2d28a8 (refactor: main.js rework to js module, prepare for destructurization)
    }

    item.checked = false;
  }

  return attack;
}
