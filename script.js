// Neon Spill - Flood Fill Puzzle Game
// MVC Architecture: Model (State), View (DOM), Controller (Logic)

// ============================================
// MODEL - Game State
// ============================================

const gameState = {
  grid: [],           // 14x14 array storing color for each tile
  colors: [
    '#FF006E',        // Hot Pink
    '#00F5FF',        // Cyan
    '#39FF14',        // Lime Green
    '#BF00FF',        // Electric Purple
    '#FFFF00',        // Bright Yellow
    '#FF6600'         // Orange
  ],
  selectedColor: null, // Currently selected color for painting
  moves: 78,          // Remaining moves
  maxMoves: 78,       // Total allowed moves
  gameState: 'playing', // 'playing', 'won', 'lost'
  gridSize: 14        // Board dimensions (14x14)
};

// ============================================
// GRID GENERATION
// ============================================

/**
 * Generate a random grid with neon colors
 * Creates a 14x14 grid where each tile has a random color
 */
function generateGrid() {
  const grid = [];
  for (let row = 0; row < gameState.gridSize; row++) {
    const rowArray = [];
    for (let col = 0; col < gameState.gridSize; col++) {
      const randomColor = gameState.colors[Math.floor(Math.random() * gameState.colors.length)];
      rowArray.push(randomColor);
    }
    grid.push(rowArray);
  }
  return grid;
}

// ============================================
// GAME INITIALIZATION
// ============================================

/**
 * Initialize or restart the game
 * Resets all state and generates a new grid
 */
function initGame() {
  console.log('Initializing Neon Spill...');

  // Generate new random grid
  gameState.grid = generateGrid();
  console.log('Grid generated:', gameState.grid.length, 'x', gameState.grid[0].length);

  // Reset moves
  gameState.moves = gameState.maxMoves;

  // Reset game state
  gameState.gameState = 'playing';

  // Set default selected color (first color)
  gameState.selectedColor = gameState.colors[0];

  // Hide overlay if visible
  document.getElementById('overlay').classList.add('hidden');

  // Render the game
  renderBoard();
  renderColorPicker();
  updateSelectedColorDisplay();
  updateMoveCounter();

  console.log('Game initialized! Tiles:', gameState.gridSize * gameState.gridSize);
}

// ============================================
// VIEW - Rendering Functions
// ============================================

/**
 * Render the game board with tiles
 * Clears existing board and creates tile elements from grid data
 */
function renderBoard() {
  const board = document.getElementById('game-board');
  board.innerHTML = ''; // Clear existing tiles

  // Loop through grid and create tile elements
  for (let row = 0; row < gameState.gridSize; row++) {
    for (let col = 0; col < gameState.gridSize; col++) {
      const tile = document.createElement('div');
      tile.className = 'tile';
      tile.style.backgroundColor = gameState.grid[row][col];
      tile.dataset.row = row;
      tile.dataset.col = col;

      // Add click handler to each tile
      tile.addEventListener('click', () => handleTileClick(row, col));

      board.appendChild(tile);
    }
  }
}

/**
 * Render the color picker buttons
 * Creates a button for each available color
 */
function renderColorPicker() {
  const colorPicker = document.getElementById('color-picker');
  colorPicker.innerHTML = ''; // Clear existing buttons

  gameState.colors.forEach(color => {
    const button = document.createElement('button');
    button.className = 'color-btn';
    button.style.backgroundColor = color;

    // Highlight selected color
    if (color === gameState.selectedColor) {
      button.classList.add('selected');
    }

    // Select color when button is clicked
    button.addEventListener('click', () => selectColor(color));
    colorPicker.appendChild(button);
  });
}

/**
 * Update the selected color display
 */
function updateSelectedColorDisplay() {
  const display = document.getElementById('selected-color');
  display.style.backgroundColor = gameState.selectedColor || '#333';
}

/**
 * Update the move counter display
 */
function updateMoveCounter() {
  document.getElementById('move-counter').textContent = gameState.moves;
}

// ============================================
// CONTROLLER - Game Logic
// ============================================

/**
 * Select a color from the color picker
 * @param {string} color - The color to select
 */
function selectColor(color) {
  gameState.selectedColor = color;
  updateSelectedColorDisplay();
  renderColorPicker(); // Re-render to update selected highlight
}

/**
 * Handle click on a tile - flood fill from that location
 * @param {number} row - Row of clicked tile
 * @param {number} col - Column of clicked tile
 */
function handleTileClick(row, col) {
  // Only allow moves when game is active
  if (gameState.gameState !== 'playing') {
    return;
  }

  // Get the current color of the clicked tile
  const currentColor = gameState.grid[row][col];

  // Don't waste moves clicking with the same color
  if (gameState.selectedColor === currentColor) {
    return;
  }

  // Perform flood fill from clicked location
  const changed = floodFill(row, col, gameState.selectedColor);

  // If the flood fill changed anything
  if (changed) {
    // Decrement moves
    gameState.moves--;
    updateMoveCounter();

    // Re-render the board
    renderBoard();

    // Check for win or loss
    checkGameEnd();
  }
}

/**
 * Flood Fill Algorithm using Breadth-First Search (BFS)
 * Changes all connected tiles of the starting color to the new color
 * @param {number} startRow - Starting row position
 * @param {number} startCol - Starting column position
 * @param {string} newColor - The color to change to
 * @returns {boolean} - True if any tiles were changed
 */
function floodFill(startRow, startCol, newColor) {
  // Get the starting color (before we change it)
  const startColor = gameState.grid[startRow][startCol];

  // If the new color is the same, nothing to do
  if (startColor === newColor) {
    return false;
  }

  // BFS queue
  const queue = [[startRow, startCol]];

  // Track visited positions to avoid duplicates
  const visited = new Set();

  // Directions: up, down, left, right
  const directions = [
    [-1, 0],  // up
    [1, 0],   // down
    [0, -1],  // left
    [0, 1]    // right
  ];

  // Process the queue
  while (queue.length > 0) {
    const [row, col] = queue.shift();

    // Skip if already visited
    const key = `${row},${col}`;
    if (visited.has(key)) {
      continue;
    }

    // Mark as visited
    visited.add(key);

    // Change the tile color
    gameState.grid[row][col] = newColor;

    // Check all 4 neighbors
    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      // Check if neighbor is valid
      const isValid = (
        newRow >= 0 &&
        newRow < gameState.gridSize &&
        newCol >= 0 &&
        newCol < gameState.gridSize
      );

      // If valid, not visited, and has the start color, add to queue
      if (isValid) {
        const neighborKey = `${newRow},${newCol}`;
        if (!visited.has(neighborKey) && gameState.grid[newRow][newCol] === startColor) {
          queue.push([newRow, newCol]);
        }
      }
    }
  }

  return true;
}

/**
 * Check if the player has won (all tiles same color)
 * @returns {boolean} - True if all tiles are the same color
 */
function checkWinCondition() {
  const firstColor = gameState.grid[0][0];

  // Check if all tiles match the first tile's color
  for (let row = 0; row < gameState.gridSize; row++) {
    for (let col = 0; col < gameState.gridSize; col++) {
      if (gameState.grid[row][col] !== firstColor) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Check for game end (win or loss)
 */
function checkGameEnd() {
  // Check win condition first
  if (checkWinCondition()) {
    gameState.gameState = 'won';
    showOverlay('You Win!', true);
    return;
  }

  // Check loss condition (no moves left)
  if (gameState.moves === 0) {
    gameState.gameState = 'lost';
    showOverlay('Game Over', false);
  }
}

// ============================================
// UI OVERLAY
// ============================================

/**
 * Show the game over overlay
 * @param {string} message - The message to display
 * @param {boolean} isWin - True if player won, false if lost
 */
function showOverlay(message, isWin) {
  const overlay = document.getElementById('overlay');
  const messageEl = document.getElementById('overlay-message');
  const content = overlay.querySelector('.overlay-content');

  messageEl.textContent = message;

  // Remove existing win/lose classes
  content.classList.remove('win', 'lose');

  // Add appropriate class
  if (isWin) {
    content.classList.add('win');
  } else {
    content.classList.add('lose');
  }

  // Show the overlay
  overlay.classList.remove('hidden');
}

/**
 * Restart the game
 */
function restartGame() {
  initGame();
}

// ============================================
// START THE GAME
// ============================================

// Wait for DOM to be fully loaded before initializing
function startGame() {
  // Set up event listeners
  document.getElementById('restart-btn').addEventListener('click', restartGame);
  document.getElementById('play-again-btn').addEventListener('click', restartGame);

  // Initialize the game
  initGame();
}

// Check if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startGame);
} else {
  // DOM is already ready
  startGame();
}
