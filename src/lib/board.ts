import { DIMENSIONS, DRAW } from "./constants";

export default class Board {
  grid: GridType;

  constructor(grid?: GridType) {
    this.grid = grid || new Array(DIMENSIONS ** 2).fill(null);
  }

  // Collect indices of the empty squares and return them
  getEmptySquares = (grid = this.grid) => {
    let squares: number[] = [];
    grid.forEach((square, i) => {
      if (square === null) squares.push(i);
    });
    return squares;
  };

  // Check if all squares are empty
  isEmpty = (grid = this.grid) => {
    return this.getEmptySquares(grid).length === DIMENSIONS ** 2;
  };

  // Check for winner and return it -or null if empty squares remain
  getWinner = (grid = this.grid) => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let res: SquareType = null;
    let row: number[] | null = null;
    winningCombos.forEach((el, i) => {
      if (
        grid[el[0]] !== null &&
        grid[el[0]] === grid[el[1]] &&
        grid[el[0]] === grid[el[2]]
      ) {
        res = grid[el[0]]; // winning player
        row = el; // winning combo
      } else if (res === null && this.getEmptySquares(grid).length === 0) {
        res = DRAW;
      }
    });
    return { res, row };
  };

  // Update square with player's value
  makeMove = (square: number, player: number) => {
    if (this.grid[square] === null) {
      this.grid[square] = player;
    }
  };

  // Create a copy of the game board
  clone = () => {
    return new Board(this.grid.concat());
  };
}
