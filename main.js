import { Game, formFight } from "./game.js";

const game = new Game();

game.start();

formFight.addEventListener("submit", async (e) => {
  e.preventDefault();
  game.hit();
});
