import { Utils } from "./Utils.js";
import { player1, player2 } from "./Player.js";

export const arenas = document.querySelector(".arenas");
export const formFight = document.querySelector(".control");

const utils = new Utils();

export class Game {
  start() {
    arenas.appendChild(utils.createPlayer(player1));
    arenas.appendChild(utils.createPlayer(player2));
    utils.generateLogs("start", player1, player2);
  }

  hit() {
    const { enemyValue, enemyHit, enemyDefence } = utils.createEnemyAttack();
    const { playerValue, playerHit, playerDefence } = utils.createPlayerAttack();

    if (playerHit !== enemyDefence) {
      player2.changeHP(playerValue);
      player2.renderHP();
      utils.generateLogs("hit", player1, player2, playerValue);
    } else {
      utils.generateLogs("defence", player1, player2);
    }
    if (enemyHit !== playerDefence) {
      player1.changeHP(enemyValue);
      player1.renderHP();
      utils.generateLogs("hit", player2, player1, enemyValue);
    } else {
      utils.generateLogs("defence", player2, player1);
    }

    utils.checkBattleResult(player1, player2);
  }
}
