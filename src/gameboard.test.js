import Gameboard from "./gameboard.js";
import Ship from "./ship.js";

test("placing ship out of bound returns undefined", () => {
  const gameboard = new Gameboard();
  expect(gameboard.placeShip(8, 8, "vertical")).toBe(undefined);
});

test("placing ship horizontally in bounds updates board", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);
  gameboard.placeShip(ship, 1, 1, "horizontal");
  expect(gameboard.board[1][1]).toBe(ship);
  expect(gameboard.board[1][2]).toBe(ship);
  expect(gameboard.board[1][3]).toBe(ship);
});

test("placing ship vertically in bounds updates board", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);
  gameboard.placeShip(ship, 1, 1, "vertical");
  expect(gameboard.board[1][1]).toBe(ship);
  expect(gameboard.board[2][1]).toBe(ship);
  expect(gameboard.board[3][1]).toBe(ship);
});

test("gameboard detects valid hit", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);
  gameboard.placeShip(ship, 1, 1, "vertical");
  gameboard.receiveAttack(2, 1);
  expect(gameboard.attacks[2][1]).toBe("hit");
});

test("gameboard detects miss", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);
  gameboard.placeShip(ship, 1, 1, "vertical");
  gameboard.receiveAttack(5, 5);
  expect(gameboard.attacks[5][5]).toBe("miss");
});

test("gameboard detects hit", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);
  gameboard.placeShip(ship, 1, 1, "vertical");
  gameboard.receiveAttack(1, 1);
  expect(ship.hits).toBe(1);
});

test("detects all ships have been sunk", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);
  gameboard.placeShip(ship, 1, 1, "vertical");
  gameboard.receiveAttack(1, 1);
  gameboard.receiveAttack(2, 1);
  gameboard.receiveAttack(3, 1);
  expect(gameboard.allSunk()).toBe(true);
});

test("detects all ships havent been sunk", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);
  gameboard.placeShip(ship, 1, 1, "vertical");
  gameboard.receiveAttack(5, 5);
  gameboard.attacks[5][5];
  expect(gameboard.allSunk()).toBe(false);
});
