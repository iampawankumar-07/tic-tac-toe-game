document.addEventListener('DOMContentLoaded', () => {
  TicTacToeGame.init();
});

const TicTacToeGame = (function () {
  // Constants
  const BOARD_LENGTH = 9;
  const PLAYER_1 = 'X';
  const PLAYER_2 = 'O';
  const WINNING_COMBOS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  // State
  let board = Array(BOARD_LENGTH).fill(null);
  let currentPlayer = PLAYER_1;
  let winner = null;

  // Cached DOM Elements
  const nextPlayerText = document.querySelector('.next-player');
  const winnerStatus = document.querySelector('.winner-status');
  const gameContainer = document.querySelector('#game');
  const resetBtn = document.querySelector('.reset-game');

  // Initialize game
  const init = () => {
    renderBoard();
    bindEvents();
    renderNextPlayer();
  };

  // Render 3x3 board
  const renderBoard = () => {
    gameContainer.innerHTML = ''; // Clear previous DOM
    board.forEach((value, index) => {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = index;
      cell.textContent = value || '';
      gameContainer.appendChild(cell);
    });
  };

  // Attach event listeners
  const bindEvents = () => {
    gameContainer.addEventListener('click', onCellClick);
    resetBtn.addEventListener('click', resetGame);
  };

  // Handle cell click
  const onCellClick = (e) => {
    const cell = e.target;
    const index = cell.dataset.index;

    if (!cell.classList.contains('cell') || board[index] || winner) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner(currentPlayer)) {
      winner = currentPlayer;
      renderWinner();
    } else {
      switchPlayer();
      renderNextPlayer();
    }
  };

  // Switch active player
  const switchPlayer = () => {
    currentPlayer = currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1;
  };

  // Update UI for next player
  const renderNextPlayer = () => {
    nextPlayerText.textContent = `Next Player: ${currentPlayer}`;
  };

  // Update UI for winner
  const renderWinner = () => {
    nextPlayerText.textContent = '';
    winnerStatus.textContent = `Winner Player is: ${winner}`;
  };

  // Reset board and UI
  const resetGame = () => {
    board = Array(BOARD_LENGTH).fill(null);
    winner = null;
    currentPlayer = PLAYER_1;
    winnerStatus.textContent = '';
    renderBoard();
    renderNextPlayer();
  };

  // Check if current player has won
  const checkWinner = (player) => {
    return WINNING_COMBOS.some(combo =>
      combo.every(index => board[index] === player)
    );
  };

  // Expose only init method
  return {
    init
  };
})();
