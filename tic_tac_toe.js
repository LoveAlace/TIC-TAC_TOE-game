// Define constants for the players and the game state
const X = 'X';
const O = 'O';
let currentPlayer = X;
let gameBoard = ['', '', '', '', '', '', '', '', ''];  // 9 spaces for the grid

// Select DOM elements
const cells = document.querySelectorAll('.cell');
const turnElement = document.querySelector('.turn');
const resetButton = document.querySelector('.reset');
const messageElement = document.getElementById('message');

// Function to check if a player has won
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a]; // Return the winner ('X' or 'O')
        }
    }
    return null;
}

// Function to handle a cell click
function handleCellClick(event) {
    const index = event.target.dataset.index;

    // Ignore if the cell is already taken
    if (gameBoard[index]) return;

    // Mark the cell with the current player's symbol
    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    // Check for a winner
    const winner = checkWinner();
    if (winner) {
        messageElement.textContent = `${winner} wins 🎉!`;
        cells.forEach(cell => cell.removeEventListener('click', handleCellClick));  // Disable further clicks
        return;
    }

    // Check for a draw (if all cells are filled)
    if (!gameBoard.includes('')) {
        messageElement.textContent = "It's a draw!";
        return;
    }

    // Switch player turn
    currentPlayer = (currentPlayer === X) ? O : X;
    turnElement.textContent = `${currentPlayer}'s turn`;
}

// Function to reset the game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = ''); // Clear the board
    currentPlayer = X;  // Set starting player to X
    turnElement.textContent = `${currentPlayer}'s turn`;
    messageElement.textContent = 'win:'; // Reset message

    // Re-enable event listeners
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
}

// Set up event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

// Initialize the game
turnElement.textContent = `${currentPlayer}'s turn`;