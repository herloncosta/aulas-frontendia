document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const statusMessage = document.getElementById("status-message");
  const restartButton = document.getElementById("restart-button");

  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let gameActive = true;
  const player = "X";
  const computer = "O";

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Linhas
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Colunas
    [0, 4, 8],
    [2, 4, 6], // Diagonais
  ];

  function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = Number.parseInt(
      clickedCell.getAttribute("data-index")
    );

    if (
      board[clickedCellIndex] !== "" ||
      !gameActive ||
      currentPlayer !== player
    ) {
      return;
    }

    makeMove(clickedCell, clickedCellIndex, player);

    if (gameActive && currentPlayer === computer) {
      setTimeout(computerMove, 500);
    }
  }

  function makeMove(cellElement, index, symbol) {
    board[index] = symbol;
    cellElement.textContent = symbol;
    cellElement.classList.add(symbol.toLowerCase());

    if (checkWin(symbol)) {
      endGame(false, symbol);
    } else if (board.every((cell) => cell !== "")) {
      endGame(true);
    } else {
      switchPlayer();
    }
  }

  function switchPlayer() {
    currentPlayer = currentPlayer === player ? computer : player;
    statusMessage.textContent = `Vez do Jogador ${currentPlayer}`;
  }

  function checkWin(symbol) {
    for (const condition of winningConditions) {
      const [a, b, c] = condition;

      if (board[a] === symbol && board[b] === symbol && board[c] === symbol) {
        for (const index of condition) {
          cells[index].classList.add("winning-cell");
        }
        return true;
      }
    }

    return false;
  }

  function endGame(isDraw, winner = null) {
    gameActive = false;
    if (isDraw) {
      statusMessage.textContent = "Empate!";
    } else {
      statusMessage.textContent = `Jogador ${winner} venceu!`;
    }
  }

  function computerMove() {
    if (!gameActive) return;

    let availableCellsIndexes = [];
    board.forEach((cell, index) => {
      if (cell === "") {
        availableCellsIndexes.push(index);
      }
    });

    if (availableCellsIndexes.length > 0) {
      for (const condition of winningConditions) {
        const [a, b, c] = condition;
        const cellsToCheck = [board[a], board[b], board[c]];
        const emptyIndex = cellsToCheck.indexOf("");

        if (
          emptyIndex !== -1 &&
          cellsToCheck.filter((cell) => cell === computer).length === 2
        ) {
          const computerMoveIndex = condition[emptyIndex];
          const cellElement = cells[computerMoveIndex];
          makeMove(cellElement, computerMoveIndex, computer);
          return;
        }
      }

      for (const condition of winningConditions) {
        const [a, b, c] = condition;
        const cellsToCheck = [board[a], board[b], board[c]];
        const emptyIndex = cellsToCheck.indexOf("");

        if (
          emptyIndex !== -1 &&
          cellsToCheck.filter((cell) => cell === player).length === 2
        ) {
          const playerMoveIndex = condition[emptyIndex];
          const cellElement = cells[playerMoveIndex];
          makeMove(cellElement, playerMoveIndex, computer);
          return;
        }
      }

      if (availableCellsIndexes.includes(4)) {
        const centerIndex = 4;
        const cellElement = cells[centerIndex];
        makeMove(cellElement, centerIndex, computer);
        return;
      }

      const randomIndex = Math.floor(
        Math.random() * availableCellsIndexes.length
      );
      const computerMoveIndex = availableCellsIndexes[randomIndex];
      const cellElement = cells[computerMoveIndex];

      makeMove(cellElement, computerMoveIndex, computer);
    }
  }

  function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = player;
    statusMessage.textContent = `Jogador ${currentPlayer} começa`;

    for (const cell of cells) {
      cell.textContent = "";
      cell.classList.remove("x", "o", "winning-cell");
    }
  }

  for (const cell of cells) {
    cell.addEventListener("click", handleCellClick);
  }

  restartButton.addEventListener("click", restartGame);
  statusMessage.textContent = `Jogador ${currentPlayer} começa`;
});
