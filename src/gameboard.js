import Ship from "./ship.js";

export default class Gameboard {
  constructor() {
    this.gameboard = Array.from({ length: 10 }, () => Array(10).fill(null));

    this.attacks = Array.from({ length: 10 }, () => Array(10).fill(null));
  }

  placeShip(ship, row, col, orientation) {
    if (orientation === "horizontal") {
      if (col + ship.length > 10) return false;

      for (let newCol = col; newCol < col + ship.length; newCol++)
        if (this.gameboard[row][newCol] instanceof Ship) return false;

      for (let newCol = col; newCol < col + ship.length; newCol++)
        this.gameboard[row][newCol] = ship;
    }

    if (orientation === "vertical") {
      if (row + ship.length > 10) return false;

      for (let newRow = row; newRow < row + ship.length; newRow++)
        if (this.gameboard[newRow][col] instanceof Ship) return false;

      for (let newRow = row; newRow < row + ship.length; newRow++)
        this.gameboard[newRow][col] = ship;
    }

    return true;
  }

  receiveAttack(row, col) {
    const ship = this.gameboard[row][col];
    if (ship instanceof Ship) {
      ship.hit();
      this.attacks[row][col] = "hit";
    } else {
      this.attacks[row][col] = "miss";
    }
  }

  allSunk() {
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const ship = this.gameboard[row][col];
        if (ship instanceof Ship && !ship.isSunk()) return false;
      }
    }

    return true;
  }
}
