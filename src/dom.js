import Ship from "./ship.js";

export default class Dom {
  renderBoard(boardElement, boardObj, showShips) {
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.dataset.row = row;
        div.dataset.col = col;

        if (boardObj[row][col] instanceof Ship && showShips)
          div.style.backgroundColor = "gray";

        boardElement.appendChild(div);
      }
    }
  }

  bindAttackHandler(callback) {
    const computerBoard = document.querySelector("#computer");
    computerBoard.addEventListener("click", (event) => {
      const cell = event.target.closest(".cell");

      if (!cell || !computerBoard.contains(cell)) return;

      const row = Number(cell.dataset.row);
      const col = Number(cell.dataset.col);

      callback(row, col);
    });
  }

  updateBoard(board, turn) {
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const div =
          turn === "player"
            ? document.querySelector(
                `#player .cell[data-row="${row}"][data-col="${col}"]`,
              )
            : document.querySelector(
                `#computer .cell[data-row="${row}"][data-col="${col}"]`,
              );
        if (board.gameboard.attacks[row][col] === "miss")
          div.style.backgroundColor = "lightblue";
        if (board.gameboard.attacks[row][col] === "hit")
          div.style.backgroundColor = "red";
      }
    }
  }
}
