import Player from "./player.js";

export const formFight = document.querySelector(".control");
const arenas = document.querySelector(".arenas");
const chat = document.querySelector(".chat");
const audioFight = document.querySelector(".fight");
const audioHit = document.querySelector(".hit");

const logs = {
  start: "⏱️ Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.",
  end: [
    "Результат удара 🏆 [playerWins]: ☠️ [playerLose] - труп",
    "☠️ [playerLose] погиб от удара бойца 🏆[playerWins]",
    "Результат боя: ☠️ [playerLose] - жертва, 🏆 [playerWins] - убийца",
  ],
  hit: [
    "👊 [playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.",
    "👊 [playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.",
    "👊 [playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.",
    "👊 [playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.",
    "👊 [playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.",
    "👊 [playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.",
    "👊 [playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.",
    "👊 [playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.",
    "👊 [playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.",
    "👊 [playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.",
    "👊 [playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.",
    "👊 [playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.",
    "👊 [playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.",
    "👊 [playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.",
    "👊 [playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.",
    "👊 [playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.",
    "👊 [playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.",
    "👊 [playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.",
  ],
  defence: [
    "🛡️ [playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.",
    "🛡️ [playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.",
    "🛡️ [playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.",
    "🛡️ [playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.",
    "🛡️ [playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.",
    "🛡️ [playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.",
    "🛡️ [playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.",
    "🛡️ [playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.",
  ],
  draw: "⚔️ Ничья - это тоже победа!",
};

const hitsSoundPath = "./assets/sound/hits/hit";
const defenceSoundPath = "./assets/sound/defence/def";

let player1 = JSON.parse(localStorage.getItem("player1"));
let player2;
export class Game {
  getPlayer = async () => {
    const body = fetch("https://reactmarathon-api.herokuapp.com/api/mk/player/choose").then((res) => res.json());

    return body;
  };

  start = async () => {
    const p1 = JSON.parse(localStorage.getItem("player1"));
    const p2 = JSON.parse(localStorage.getItem("enemy"));

    player1 = new Player({
      ...p1,
      player: 1,
    });

    player2 = new Player({
      ...p2,
      player: 2,
    });

    arenas.appendChild(this.createPlayer(player1));
    arenas.appendChild(this.createPlayer(player2));
    this.generateLogs("start", player1, player2);
  };

  hit = async () => {
    const res = await this.postPlayersAttack(this.createPlayerAttack());

    const { value: playerValue, hit: playerHit, defence: playerDefence } = res.player1;
    const { value: enemyValue, hit: enemyHit, defence: enemyDefence } = res.player2;

    if (enemyDefence === playerDefence) {
      audioHit.src = `${defenceSoundPath}${this.getRandom(5)}.mp3`;
    }
    if (playerHit !== enemyDefence) {
      audioHit.src = `${hitsSoundPath}${this.getRandom(5)}.mp3`;
      player2.changeHP(playerValue);
      player2.renderHP();
      this.generateLogs("hit", player1, player2, playerValue);
    } else {
      this.generateLogs("defence", player1, player2);
    }
    if (enemyHit !== playerDefence) {
      audioHit.src = `${hitsSoundPath}${this.getRandom(5)}.mp3`;
      player1.changeHP(enemyValue);
      player1.renderHP();
      this.generateLogs("hit", player2, player1, enemyValue);
    } else {
      this.generateLogs("defence", player2, player1);
    }

    this.checkBattleResult(player1, player2);
  };

  generateWinTitle(name) {
    const winTitle = this.createNewElement("winTitle");
    if (name !== false) {
      winTitle.innerText = name + " wins";
    } else {
      winTitle.innerText = "draw";
    }
    audioFight.src = " ";
    audioHit.src = "./assets/sound/EndFight.mp3";
    return winTitle;
  }

  checkBattleResult(player1, player2) {
    if (player1.hp === 0 || player2.hp === 0) {
      formFight.style.display = "none";
      arenas.appendChild(this.createReloadButton());
    }

    if (player1.hp === 0 && player2.hp > player1.hp) {
      arenas.appendChild(this.generateWinTitle(player2.name));
      this.generateLogs("end", player2, player1);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
      arenas.appendChild(this.generateWinTitle(player1.name));
      this.generateLogs("end", player1, player2);
    } else if (player1.hp === 0 && player2.hp === 0) {
      this.generateWinTitle();
      this.generateLogs("draw");
    }
  }

  postPlayersAttack = async ({ hit, defence }) => {
    const body = await fetch("https://reactmarathon-api.herokuapp.com/api/mk/player/fight", {
      method: "POST",
      body: JSON.stringify({
        hit,
        defence,
      }),
    }).then((res) => res.json());

    return body;
  };

  createPlayerAttack() {
    const attack = {};

    for (let item of formFight) {
      if (item.checked && item.name === "hit") {
        if (item.value === "head") {
          attack.value = this.getRandom(30);
        } else if (item.value === "body") {
          attack.value = this.getRandom(25);
        } else if (item.value === "head") {
          attack.value = this.getRandom(15);
        }
        attack.hit = item.value;
      }

      if (item.checked && item.name === "defence") {
        attack.defence = item.value;
      }

      item.checked = false;
    }

    return attack;
  }

  normalizeDate() {
    let time = " ";
    const date = new Date();

    const normalize = (num) => (num.toString().length > 1 ? num : `0${num}`);

    return (time = `${normalize(date.getHours())}:${normalize(date.getMinutes())}:${normalize(date.getSeconds())}`);
  }

  generateLogs(type, player1, player2, attackValue) {
    const time = this.normalizeDate();
    const log = logs[type];
    let logText = " ";

    switch (type) {
      case "start":
        logText = log.replace("[time]", time).replace("[player1]", player1.name).replace("[player2]", player2.name);
        break;
      case "hit":
        logText = `${time} - ${log[this.getRandom(log.length - 1)]
          .replace("[playerKick]", player1.name)
          .replace("[playerDefence]", player2.name)} -${attackValue} [${player2.hp}/100]`;
        break;
      case "defence":
        logText = `${time} - ${log[this.getRandom(log.length - 1)].replace("[playerKick]", player1.name).replace("[playerDefence]", player2.name)}`;
        break;
      case "end":
        logText = log[this.getRandom(log.length - 1)].replace("[playerWins]", player1.name).replace("[playerLose]", player2.name);
        break;
      case "draw":
        logText = log;
        break;
    }

    chat.insertAdjacentHTML("afterbegin", `<p>${logText}</p>`);
  }

  createReloadButton() {
    const reloadDiv = this.createNewElement("reloadWrap");
    const restartButton = this.createNewElement("button", "button");

    restartButton.innerText = "restart";
    reloadDiv.appendChild(restartButton);
    restartButton.addEventListener("click", function () {
      window.location.pathname = "index.html";
    });

    return reloadDiv;
  }

  createPlayer({ player, hp, name, img }) {
    const playerElement = this.createNewElement(`player${player}`);

    const progressbar = this.createNewElement("progressbar");
    playerElement.appendChild(progressbar);

    const life = this.createNewElement("life");
    life.style.width = `${hp}%`;

    const nameElement = this.createNewElement("name");
    nameElement.innerText = name;

    progressbar.appendChild(life);
    progressbar.appendChild(nameElement);

    const character = this.createNewElement("character");

    playerElement.appendChild(character);

    const imgElement = this.createNewElement(null, "img");
    imgElement.src = img;

    character.appendChild(imgElement);

    return playerElement;
  }

  getRandom(num = 20) {
    return Math.ceil(Math.random() * num);
  }

  createNewElement(className, tag = "div") {
    const elem = document.createElement(tag);
    if (className) {
      elem.classList.add(className);
    }

    return elem;
  }
}
