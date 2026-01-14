# Game Design Document: Chromascape (โครมาสเคป)

## 1. Core Feeling (ความรู้สึกหลัก)
**English:** Zen, Visually Satisfying, Intellectual ("Aha!" moments).


## 2. Game Fantasy (จินตนาการในเกม)
**English:** The player is restoring a colorless world. The world acts like a coloring book, but the colors behave like water constrained by physics and logic.
## 3. Target Players (กลุ่มผู้เล่นเป้าหมาย)
**English:** Fans of logic puzzles (like Sudoku, Minesweeper) and casual gamers who enjoy satisfying visual effects (like PowerWash Simulator).


## 4. Core Loop Idea (วงจรการเล่นหลัก)
**English:**
1.  **Observe:** Look at the grid, the barriers, and the target goals.
2.  **Plan:** Calculate where to place a "Blocker" or where to start the "Pour".
3.  **Execute:** Trigger the Flood Fill.
4.  **Watch:** Watch the color spread step-by-step (BFS algorithm visual).
5.  **Result:** Success (Filled targets only) or Fail (Spilled over / Ran out of paint).

)


**English:** Flood fill algorithms are naturally satisfying to watch. Gamifying this common computer science concept creates a bridge between relaxing visuals and challenging logic.
