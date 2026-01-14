# Architecture — Neon Spill

## High-Level System Structure

```
┌─────────────────────────────────────────────────────────┐
│                     Browser Layer                        │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │    View     │  │   Model     │  │  Controller │     │
│  │             │  │             │  │             │     │
│  │  - DOM      │◄─┤  - State    │◄─┤  - Events   │     │
│  │  - Grid     │  │  - Grid     │  │  - Logic    │     │
│  │  - UI       │  │  - Colors   │  │  - Updates  │     │
│  │  - Styles   │  │  - Moves    │  │             │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
```

## Major Components

### Model (Game State)
**Responsibility**: Store all game data

- `grid: 2D array` - Stores color value for each tile (14×14)
- `colors: array` - Available neon color palette (6 colors)
- `moves: number` - Remaining moves (starts at 78)
- `maxMoves: number` - Total allowed moves (78)
- `gameState: string` - 'playing', 'won', 'lost'
- `gridSize: number` - Rows and columns (14)

### View (DOM & CSS)
**Responsibility**: Display game state and visual feedback

- **Game Board**: CSS Grid of tile divs
- **Tiles**: Individual cells with background colors
- **Move Counter**: Display showing remaining moves
- **Color Picker**: Buttons for each available color
- **Overlay**: Win/loss message with restart button
- **Animations**: CSS transitions for color changes

### Controller (Game Logic)
**Responsibility**: Handle input and update state

- **Init**: Set up new game with random grid
- **Input Handler**: Process color button clicks
- **Flood Fill Algorithm**: Expand territory from top-left
- **Move Manager**: Decrement moves, check end conditions
- **Win/Loss Detector**: Evaluate game state
- **Restart Handler**: Reset state and re-render

## Data Flow

```
User Click Color Button
        ↓
Controller Receives Color
        ↓
Validate Color (not current, game active)
        ↓
Call Flood Fill Algorithm
        ↓
Update Model (new grid state, moves--)
        ↓
Check Win/Loss Conditions
        ↓
Trigger View Update
        ↓
Render New Board Colors
        ↓
Update Move Counter
        ↓
Show Overlay if Game Over
```

## Key Algorithm: Flood Fill

**Purpose**: Expand territory by changing connected tiles

**Approach**: Breadth-First Search (BFS) or Depth-First Search (DFS)

1. Start at position (0, 0) — top-left corner
2. Record the starting color
3. Use queue/stack to track tiles to process
4. For each tile:
   - Change to new color
   - Check all 4 neighbors (up, down, left, right)
   - If neighbor matches original color, add to queue
5. Continue until queue/stack is empty

**Complexity**: O(n) where n = number of tiles on board

## Component Interaction Rules

- **View never modifies Model directly** — only reads for display
- **Controller validates all inputs** before updating Model
- **Model changes trigger View updates** — no automatic binding
- **Game state controls interaction** — disable clicks when game over

## File Structure (Planned)

```
neon-spill/
├── index.html          # Main game container
├── styles.css          # All styling and animations
└── script.js           # Game logic and DOM manipulation
```

All code remains self-contained in a single directory for simplicity.
