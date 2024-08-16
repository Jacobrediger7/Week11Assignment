// script.js

// Initialize variables
let currentPlayer = 'X'; // Start the game with player 'X'
let gameActive = true; // A flag to check if the game is still active (i.e., no one has won yet)
const $cells = $('[data-cell]'); // Select all cells in the Tic-Tac-Toe grid using jQuery
const $turnIndicator = $('#turnIndicator'); // Get the heading element to display whose turn it is using jQuery
const $restartBtn = $('#restartBtn'); // Get the restart button element using jQuery

// Possible winning combinations
const winningCombinations = [ // Array of all possible winning combinations
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Function to handle cell clicks
function handleCellClick() { // This function is triggered when a cell is clicked
    const $cell = $(this); // The specific cell that was clicked, wrapped in jQuery
    const cellIndex = $cells.index($cell); // Find the index of the clicked cell within the grid

    // If cell is not empty or game is not active, do nothing
    if ($cell.text() !== '' || !gameActive) return; // Prevents clicking on a cell that's already filled or if the game is over

    // Mark the cell with the current player's symbol
    $cell.text(currentPlayer); // Assign 'X' or 'O' to the clicked cell based on the current player's turn

    // Check for a win or draw
    if (checkWin()) { // Call the checkWin function to see if the current move resulted in a win
        $turnIndicator.text(`${currentPlayer} Wins!`); // Update the heading to indicate the winner
        gameActive = false; // Stop the game since we have a winner
        showAlert(`${currentPlayer} Wins!`); // Show a Bootstrap alert with the winner
    } else if (checkDraw()) { // If there's no win, check if the game is a draw
        $turnIndicator.text(`It's a Draw!`); // Update the heading to indicate a draw
        gameActive = false; // Stop the game since it's a draw
        showAlert(`It's a Draw!`); // Show a Bootstrap alert indicating the draw
    } else {
        // Switch turns
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch the current player from 'X' to 'O' or 'O' to 'X'
        $turnIndicator.text(`${currentPlayer}'s Turn`); // Update the heading to indicate the next player's turn
    }
}

// Function to check for a win
function checkWin() { // This function checks if the current move created a winning combination
    return winningCombinations.some(combination => { // Loop through all possible winning combinations
        return combination.every(index => { // For each combination, check if every cell in that combination contains the current player's symbol
            return $cells.eq(index).text() === currentPlayer; // Return true if all cells in the combination have the current player's symbol
        });
    });
}

// Function to check for a draw
function checkDraw() { // This function checks if the game is a draw (i.e., all cells are filled with no winner)
    return $cells.toArray().every(cell => { // Loop through all cells using jQuery's toArray method
        return $(cell).text() !== ''; // Return true if every cell is filled
    });
}

// Function to show an alert
function showAlert(message) { // This function creates and displays a Bootstrap alert with a custom message
    const $alertDiv = $('<div>') // Create a new div element to hold the alert, using jQuery
        .addClass('alert alert-info mt-3') // Apply Bootstrap alert classes to the div
        .text(message); // Set the text content of the alert to the provided message
    $('.container').append($alertDiv); // Append the alert div to the container div in the HTML using jQuery
}

// Function to restart the game
function restartGame() { // This function resets the game to its initial state
    currentPlayer = 'X'; // Reset the current player to 'X'
    gameActive = true; // Reactivate the game (allowing new moves)
    $cells.text(''); // Clear the content of all cells using jQuery
    $turnIndicator.text(`${currentPlayer}'s Turn`); // Reset the heading to indicate that it's 'X's turn
    $('.alert').remove(); // Remove any existing alert divs from the DOM using jQuery
}

// Add event listeners to the cells and restart button
$cells.on('click', handleCellClick); // Attach the handleCellClick function to the click event for each cell using jQuery
$restartBtn.on('click', restartGame); // Attach the restartGame function to the click event for the restart button using jQuery
