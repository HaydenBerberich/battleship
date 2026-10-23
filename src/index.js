import "./styles.css";
import Dom from "./dom.js";
import Player from "./player.js";
import Ship from "./ship.js";

const dom = new Dom();
const player = new Player();
const computer = new Player();
let gameOver = false;

function addShips(gameboard) {
  const ships = [
    new Ship(5),
    new Ship(4),
    new Ship(3),
    new Ship(3),
    new Ship(2),
  ];
  ships.forEach((ship) => {
    let success = false;
    while (!success) {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);
      const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
      success = gameboard.placeShip(ship, row, col, orientation);
    }
  });
}

const rearrange = document.querySelector("#rearrange");
rearrange.addEventListener("click", () => {
  player.gameboard.gameboard = Array.from({ length: 10 }, () =>
    Array(10).fill(null),
  );
  addShips(player.gameboard);

  playerBoard.innerHTML = "";
  dom.renderBoard(playerBoard, player.gameboard.gameboard, true);
});

addShips(player.gameboard);
const playerBoard = document.querySelector("#player");
dom.renderBoard(playerBoard, player.gameboard.gameboard, true);

addShips(computer.gameboard);
const computerBoard = document.querySelector("#computer");
dom.renderBoard(computerBoard, computer.gameboard.gameboard, false);

const text = document.querySelector("#text");

dom.bindAttackHandler((row, col) => {
  if (gameOver) return;

  if (computer.gameboard.attacks[row][col]) return;
  computer.gameboard.receiveAttack(row, col);

  rearrange.style.display = "none";

  const ship = computer.gameboard.gameboard[row][col];

  text.textContent = "";
  if (ship && ship.isSunk()) text.textContent = "You sank a ship!";

  dom.updateBoard(computer, "computer");

  if (computer.gameboard.allSunk()) {
    gameOver = true;
    text.textContent = "Game over";
    return;
  }

  let randRow = Math.floor(Math.random() * 10);
  let randCol = Math.floor(Math.random() * 10);

  while (player.gameboard.attacks[randRow][randCol]) {
    randRow = Math.floor(Math.random() * 10);
    randCol = Math.floor(Math.random() * 10);
  }

  player.gameboard.receiveAttack(randRow, randCol);

  dom.updateBoard(player, "player");

  if (player.gameboard.allSunk()) {
    gameOver = true;
    text.textContent = "Game over";
    return;
  }
});
