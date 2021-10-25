import { generateLogs } from "./logs.js";
import { changeHP, elHp, renderHP, createReloadButton, showBattleResult, createPlayer, createEnemyAttack, createPlayerAttack } from "./utils.js";

export const formFight = document.querySelector(".control");
const arenas = document.querySelector(".arenas");

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

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));

generateLogs("start", player1, player2);

formFight.addEventListener("submit", (e) => {
  e.preventDefault();

  // Пример деструктуризации
  const { enemyValue, enemyHit, enemyDefence } = createEnemyAttack();
  const { playerValue, playerHit, playerDefence } = createPlayerAttack();

  if (playerHit !== enemyDefence) {
    player2.changeHP(playerValue);
    player2.renderHP();
    generateLogs("hit", player1, player2, playerValue);
  } else {
    generateLogs("defence", player1, player2);
  }
  if (enemyHit !== playerDefence) {
    player1.changeHP(enemyValue);
    player1.renderHP();
    generateLogs("hit", player2, player1, enemyValue);
  } else {
    generateLogs("defence", player2, player1);
  }

  if (player1.hp === 0 || player2.hp === 0) {
    formFight.style.display = "none";
    arenas.appendChild(createReloadButton());
  }

  if (player1.hp === 0 && player2.hp > player1.hp) {
    arenas.appendChild(showBattleResult(player2.name));
    generateLogs("end", player2, player1);
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    arenas.appendChild(showBattleResult(player1.name));
    generateLogs("end", player1, player2);
  } else if (player1.hp === 0 && player2.hp === 0) {
    showBattleResult();
  }
});
