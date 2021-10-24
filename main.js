const arenas = document.querySelector(".arenas");
const button = document.querySelector(".button");
const formFight = document.querySelector(".control");
const chat = document.querySelector(".chat");

const logs = {
  start: "Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.",
  end: [
    "Результат удара [playerWins]: [playerLose] - труп",
    "[playerLose] погиб от удара бойца [playerWins]",
    "Результат боя: [playerLose] - жертва, [playerWins] - убийца",
  ],
  hit: [
    "[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.",
    "[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.",
    "[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.",
    "[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.",
    "[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.",
    "[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.",
    "[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.",
    "[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.",
    "[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.",
    "[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.",
    "[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.",
    "[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.",
    "[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.",
    "[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.",
    "[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.",
    "[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.",
    "[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.",
    "[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.",
  ],
  defence: [
    "[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.",
    "[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.",
    "[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.",
    "[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.",
    "[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.",
    "[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.",
    "[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.",
    "[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.",
  ],
  draw: "Ничья - это тоже победа!",
};

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
    generateLogs("draw");
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

function createPlayerAttack() {
  const attack = {};

  for (let item of formFight) {
    if (item.checked && item.name === "hit") {
      attack.value = getRandom(HIT[item.value]);
      attack.hit = item.value;
    }

    if (item.checked && item.name === "defence") {
      attack.defence = item.value;
    }

    item.checked = false;
  }

  return attack;
}

function normalizeDate() {
  const date = new Date();

  const normalize = (num) => (num.toString().length > 1 ? num : `0${num}`);

  return (time = `${normalize(date.getHours())}:${normalize(date.getMinutes())}`);
}

function generateLogs(type, player1, player2, attackValue) {
  const time = normalizeDate();
  let logText = " ";

  switch (type) {
    case "start":
      logText = logs[type].replace("[time]", time).replace("[player1]", player1.name).replace("[player2]", player2.name);
      break;
    case "hit":
      logText = `${time} - ${logs[type][getRandom(type.length)]
        .replace("[playerKick]", player1.name)
        .replace("[playerDefence]", player2.name)} -${attackValue} [${player2.hp}/100]`;
      break;
    case "defence":
      logText = `${time} - ${logs[type][getRandom(type.length)].replace("[playerKick]", player1.name).replace("[playerDefence]", player2.name)}`;
      break;
    case "end":
      logText = logs[type][getRandom(type.length)].replace("[playerWins]", player1.name).replace("[playerLose]", player2.name);
      break;
    case "draw":
      logText = logs[type];
      break;
  }

  chat.insertAdjacentHTML("afterbegin", `<p>${logText}</p>`);
}

console.log();

generateLogs("start", player1, player2);

formFight.addEventListener("submit", function (e) {
  e.preventDefault();

  const enemyAttack = createEnemyAttack();
  const playerAttack = createPlayerAttack();

  if (playerAttack.hit !== enemyAttack.defence) {
    player2.changeHP(playerAttack.value);
    player2.renderHP();
    generateLogs("hit", player1, player2, playerAttack.value);
  } else {
    generateLogs("defence", player1, player2);
  }
  if (enemyAttack.hit !== playerAttack.defence) {
    player1.changeHP(enemyAttack.value);
    player1.renderHP();
    generateLogs("hit", player2, player1, enemyAttack.value);
  } else {
    generateLogs("defence", player2, player1);
  }

  if (player1.hp === 0 || player2.hp === 0) {
    formFight.style.display = "none";
    createReloadButton();
  }

  if (player1.hp === 0 && player2.hp > player1.hp) {
    showBattleResult(player2.name);
    generateLogs("end", player2, player1);
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    showBattleResult(player1.name);
    generateLogs("end", player1, player2);
  } else if (player1.hp === 0 && player2.hp === 0) {
    showBattleResult();
  }
});
