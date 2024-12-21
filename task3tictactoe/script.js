let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X"; // X starts the game
let gameActive = true;
let gameMode = "playerVsPlayer"; // Default to player vs player

const cells = document.querySelectorAll(".cell");
const statusMessage = document.getElementById("statusMessage");
const resetBtn = document.getElementById("resetBtn");
const modeSelect = document.getElementById("mode");

// Initialize the game board with click event listeners
cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

// Reset game when the reset button is clicked
resetBtn.addEventListener("click", resetGame);

// Change game mode (Player vs Player or Player vs Computer)
modeSelect.addEventListener("change", (e) => {
  gameMode = e.target.value;
  resetGame();
});

// Handle click events on the game board cells
function handleCellClick(event) {
  const index = event.target.getAttribute("data-index");

  if (board[index] !== "" || !gameActive) return; // If cell is already filled or game is over

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  // Check if current player has won
  if (checkWinner()) {
    statusMessage.textContent = `${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  // Check if the board is full (Draw)
  if (board.every(cell => cell !== "")) {
    statusMessage.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === "X" ? "O" : "X";

  // If playing against the computer, make the computer move
  if (gameMode === "playerVsComputer" && currentPlayer === "O" && gameActive) {
    setTimeout(computerMove, 500); // Delay the computer move
  }

  // Update the status message
  statusMessage.textContent = `Current Turn: ${currentPlayer}`;
}

// Computer's move (random choice)
function computerMove() {
  if (!gameActive) return;

  let emptyCells = board.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);
  let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

  board[randomIndex] = "O";
  cells[randomIndex].textContent = "O";

  if (checkWinner()) {
    statusMessage.textContent = "Computer Wins!";
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusMessage.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = "X";
  statusMessage.textContent = `Current Turn: ${currentPlayer}`;
}

// Check for a winner
function checkWinner() {
  const winPatterns = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6], // Diagonal top-right to bottom-left
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] !== "" && board[a] === board[b] && board[b] === board[c];
  });
}

// Reset the game
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  cells.forEach(cell => cell.textContent = "");
  statusMessage.textContent = `Current Turn: ${currentPlayer}`;
}
