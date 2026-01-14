# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Neon Spill** is a Flood Fill puzzle game where players expand territory by changing colors from the top-left tile. The game follows a "vibe coding" approach: simple, visually satisfying, and iterative. The goal is a complete, playable prototype—not an over-engineered solution.

See `project-identity.md` for full project definition and AI role guidelines.

## Memory Bank System

**Always read the memory-bank before planning or coding.** The memory-bank folder contains the project's long-term memory:

- `memory-bank/game-design-document.md` — Core feeling, fantasy, player experience
- `memory-bank/tech-stack.md` — Vanilla HTML/CSS/JavaScript decisions
- `memory-bank/architecture.md` — MVC pattern, data flow, flood fill algorithm
- `memory-bank/implementation-plan.md` — 4-phase development roadmap
- `memory-bank/progress.md` — Development log, feature checklist, decision history

Update memory-bank/progress.md after major decisions or completed features.

## Core Game Mechanics

- **Grid**: Random neon-colored tiles (typically 10x10 or 14x14)
- **Control**: Player changes the color of the top-left tile
- **Flood Fill**: When color changes, all connected tiles of the new color are absorbed
- **Moves**: Limited number of moves to fill the entire board
- **Win Condition**: Entire board is one color
- **Lose Condition**: Run out of moves before filling the board

## Development Approach

When starting work on this project:

1. **Read memory-bank first** — Understand current state before planning
2. **Enter Plan Mode first** — Outline structure, define color palette, plan implementation steps before coding
3. **Prioritize game feel** — Visual feedback, animations, and satisfaction over technical complexity
4. **Build iteratively** — Small functional prototype, then polish
5. **Comment key logic** — Explain flood fill algorithm and game state management

## Architecture: MVC Pattern

The game follows a Model-View-Controller pattern:

**Model (Game State)**:
- `grid: 2D array` — Stores color value for each tile
- `colors: array` — Available neon color palette
- `moves: number` — Remaining moves
- `maxMoves: number` — Total allowed moves
- `gameState: string` — 'playing', 'won', 'lost'

**View (DOM & CSS)**:
- CSS Grid game board with tile divs
- Move counter, color picker buttons, overlays
- CSS transitions for color animations

**Controller (Game Logic)**:
- Flood fill algorithm (BFS/DFS from top-left)
- Input validation and state updates
- Win/loss detection and restart handler

**Data Flow**: User click → Controller validates → Flood fill updates Model → View re-renders → Check game over

**Flood Fill Algorithm**: Use BFS or DFS from (0,0). Track visited tiles, change to new color, check 4 neighbors, repeat until queue empty. O(n) complexity.

## Color Palette

Neon colors with high contrast for dark background:
- Hot Pink (#FF006E)
- Cyan (#00F5FF)
- Lime Green (#39FF14)
- Electric Purple (#BF00FF)
- Bright Yellow (#FFFF00)
- Orange (#FF6600)

## Tech Stack

- **Vanilla HTML/CSS/JavaScript** — No frameworks, no build steps
- **Single HTML file** — Self-contained (CSS and JS embedded)
- **No backend** — Fully client-side
- **Runs directly in browser** — Open index.html to play

## Planned File Structure

```
neon-spill/
├── index.html    # Main game container
├── styles.css    # All styling and animations
└── script.js     # Game logic and DOM manipulation
```
