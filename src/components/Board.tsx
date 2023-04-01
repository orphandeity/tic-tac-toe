import { useState } from "react";
import Square from "./Square";

interface BoardProps {
  xIsNext: boolean;
  squares: SquareType[];
  onPlay: (nextSquares: SquareType[]) => void;
}

const Board = ({ xIsNext, squares, onPlay }: BoardProps) => {
  const winner = calculateWinner(squares);

  let status;

  if (winner) status = "Winner: " + winner;
  else status = "Next player: " + (xIsNext ? "X" : "O");

  function handleClick(i: number) {
    // check if move is valid
    if (squares[i] || calculateWinner(squares)) return;
    // make copy of squares array
    const nextSquares = squares.slice();
    // check whose turn it is make changes to new array
    if (xIsNext) nextSquares[i] = "X";
    else nextSquares[i] = "O";
    // update board state
    onPlay(nextSquares);
  }

  function calculateWinner(squares: SquareType[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  return (
    <>
      <span className="text-xl font-bold">{status}</span>
      <div className="grid grid-cols-3 gap-4">
        {squares.map((square, i) => (
          <Square key={i} value={square} onSquareClick={() => handleClick(i)} />
        ))}
      </div>
    </>
  );
};

export default Board;
