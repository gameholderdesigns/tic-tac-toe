const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restartButton');
const winningGif = document.getElementById('winningGif');  // Reference to the winning GIF element
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', '']; // Keeps track of the board state

// Function to handle cell clicks
function handleCellClick(event) {
    const index = event.target.getAttribute('data-cell');

    if (board[index] !== '') return; // If cell is already filled, do nothing

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
        setTimeout(() => {
            winningGif.style.display = 'block'; // Show the winning GIF
        }, 500); // Add a small delay before showing the GIF
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
}

// Function to check if there's a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal 1
        [2, 4, 6], // Diagonal 2
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            // Highlight the winning cells (optional)
            pattern.forEach(index => cells[index].classList.add('winning-cell'));
            return true;
        }
        return false;
    });
}

// Function to restart the game
function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = ''); // Clear all cells
    winningGif.style.display = 'none'; // Hide the winning GIF when restarting
    cells.forEach(cell => cell.classList.remove('winning-cell')); // Remove highlight from previous winning cells
}

// Add event listeners to cells
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Add event listener to restart button
restartButton.addEventListener('click', restartGame);
