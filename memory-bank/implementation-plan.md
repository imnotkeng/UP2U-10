# Implementation Plan — Neon Spill

## Finalized Decisions
- **Grid size**: 14×14 (196 tiles)
- **Move limit**: 78 moves (grid size × 0.4)
- **Animation timing**: 0.3s CSS transitions
- **File structure**: index.html, styles.css, script.js

## Development Phases

### Phase 1: Foundation (HTML + CSS Layout)
**Goal**: Visible game board with neon tiles

1. **Create index.html**
   - HTML5 boilerplate with viewport meta tag
   - Main container div centered on page
   - Header with "Neon Spill" title
   - Game board container (empty div, id="game-board")
   - UI controls section:
     - Move counter display (id="move-counter")
     - Color picker container (id="color-picker")
     - Restart button (id="restart-btn")
   - Overlay div (id="overlay", hidden by default)

2. **Create styles.css**
   - CSS variables for neon colors:
     - --color-hot-pink: #FF006E
     - --color-cyan: #00F5FF
     - --color-lime: #39FF14
     - --color-purple: #BF00FF
     - --color-yellow: #FFFF00
     - --color-orange: #FF6600
   - Dark background: #0a0a0a
   - Game board: CSS Grid, 14 columns, responsive max-width
   - Tiles: Aspect-ratio squares, rounded corners
   - Color picker: Flexbox layout
   - Color buttons: Circular, matching neon colors
   - Overlay: Fixed position, backdrop blur, centered
   - Typography: System fonts, clean and modern
   - Responsive: Board scales to mobile widths

### Phase 2: State & Grid Generation (JavaScript Setup)
**Goal**: Random grid displays on screen

1. **Create script.js - State Definition**
   - gameState object with:
     - grid: [] (14×14 array)
     - colors: [6 neon hex values]
     - moves: 78
     - gameState: 'playing'
     - gridSize: 14

2. **Implement generateGrid()**
   - Create 14×14 empty array
   - Loop rows and columns
   - Assign random color from palette to each cell
   - Return grid

3. **Implement initGame()**
   - Call generateGrid()
   - Reset moves to 78
   - Set gameState to 'playing'
   - Hide overlay
   - Call renderBoard()
   - Call renderColorPicker()
   - Update move counter display

4. **Implement renderBoard()**
   - Clear game-board div
   - Loop through grid array
   - Create tile div for each cell
   - Set background-color from grid data
   - Append to game-board
   - Apply CSS Grid classes

### Phase 3: Core Mechanics (Flood Fill)
**Goal**: Clicking colors expands territory

1. **Implement floodFill(row, col, newColor)**
   - Get starting color from grid[row][col]
   - If newColor === starting color, return false
   - Create queue with [row, col]
   - Create visited Set
   - While queue not empty:
     - Dequeue [r, c]
     - If visited, continue
     - Mark visited
     - Change grid[r][c] to newColor
     - Check 4 neighbors (up, down, left, right)
     - If valid AND not visited AND color matches starting:
       - Enqueue neighbor
   - Return true

2. **Implement changeColor(newColor)**
   - Check if gameState !== 'playing'
   - Get current top-left color
   - If newColor === current color, return
   - Call floodFill(0, 0, newColor)
   - If floodFill returned true:
     - Decrement moves
     - Update move counter display
     - Call renderBoard()
   - Call checkGameEnd()

3. **Implement checkGameEnd()**
   - Check win condition
   - If won: gameState = 'won', showOverlay("You Win!", true)
   - Else if moves === 0: gameState = 'lost', showOverlay("Game Over", false)

4. **Implement renderColorPicker()**
   - Clear color-picker div
   - Loop through gameState.colors
   - Create button for each color
   - Style button with color
   - Add click listener: changeColor(color)

### Phase 4: Game Flow & Win/Loss
**Goal**: Complete game loop with restart

1. **Implement checkWinCondition()**
   - Get color of grid[0][0]
   - Loop through all rows and columns
   - If any tile differs, return false
   - Return true

2. **Implement showOverlay(message, isWin)**
   - Set overlay message text
   - Add "Play Again" button
   - Make overlay visible
   - Style: green tint for win, red for loss

3. **Implement restartGame()**
   - Remove event listeners to prevent duplicates
   - Call initGame()

4. **Add restart button listener**
   - Click calls restartGame()

### Phase 5: Visual Polish
**Goal**: Make it feel good to play

1. **CSS Transitions**
   - Add `transition: background-color 0.3s ease` to .tile
   - Add hover effects to .color-btn

2. **Button Styling**
   - Transform scale on hover
   - Active state feedback

3. **Overlay Styling**
   - Backdrop-filter: blur(5px)
   - Semi-transparent background
   - Large, readable message text

4. **Responsive Design**
   - Max-width on game board
   - Tiles resize proportionally
   - Stack controls on mobile

### Phase 6: Code Quality & Comments
**Goal**: Clean, understandable code

1. **Add Comments**
   - Explain BFS flood fill algorithm
   - Document gameState structure
   - Clarify win/loss logic

2. **Code Organization**
   - Group: State, Grid Rendering, Game Logic, UI Updates, Event Handlers
   - Use descriptive function names

### Phase 7: Edge Case Testing
**Goal**: Handle all scenarios

1. **Test Cases**
   - Click current color (no change, no move lost)
   - Win on last move
   - Lose with tiles remaining
   - Restart mid-game
   - Rapid clicking

2. **Fix Issues**
   - Add debounce if needed
   - Prevent default behaviors

## No Code Policy
This document outlines actions and structure only. Code will be written during implementation, not pre-planned here.
