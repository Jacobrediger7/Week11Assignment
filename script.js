// script.js

// Initialize variables
let currentPlayer = 'X';
let gameActive = true;
const cells = document.querySelectorAll('[data-cell]');
const turnIndicator = document.getElementById('turnIndicator');
const restartBtn = document.getElementById('restartBtn');

// Possible winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Function to handle cell clicks
function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    // If cell is not empty or game is not active, do nothing
    if (cell.textContent !== '' || !gameActive) return;

    // Mark the cell with the current player's symbol
    cell.textContent = currentPlayer;

    // Check for a win or draw
    if (checkWin()) {
        turnIndicator.textContent = `${currentPlayer} Wins!`;
        gameActive = false;
        showAlert(`${currentPlayer} Wins!`);
    } else if (checkDraw()) {
        turnIndicator.textContent = `It's a Draw!`;
        gameActive = false;
        showAlert(`It's a Draw!`);
    } else {
        // Switch turns
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        turnIndicator.textContent = `${currentPlayer}'s Turn`;
    }
}

// Function to check for a win
function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

// Function to check for a draw
function checkDraw() {
    return Array.from(cells).every(cell => {
        return cell.textContent !== '';
    });
}

// Function to show an alert
function showAlert(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-info mt-3';
    alertDiv.textContent = message;
    document.querySelector('.container').appendChild(alertDiv);
}

// Function to restart the game
function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach(cell => cell.textContent = '');
    turnIndicator.textContent = `${currentPlayer}'s Turn`;
    const alertDiv = document.querySelector('.alert');
    if (alertDiv) alertDiv.remove();
}

// Add event listeners to the cells and restart button
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
