import { Game, formFight } from "./Game.js";

const game = new Game();

game.start();

formFight.addEventListener("submit", (e) => {
  e.preventDefault();
  game.hit();
});
