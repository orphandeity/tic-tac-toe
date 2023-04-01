import { useState } from "react";
import Board from "./components/Board";

function App() {
  // move history
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // current move
  const [currentMove, setCurrentMove] = useState(0);
  // current board state
  const currentSquares = history[currentMove];
  // next player
  const xIsNext = currentMove % 2 === 0;

  // handle square click
  function handlePlay(nextSquares: SquareType[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  // handle time travel
  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
    if (nextMove === 0) setHistory([Array(9).fill(null)]);
  }

  // previous moves
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <main className="mt-16 grid min-h-screen justify-items-center">
      <div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div>
        <ol>{moves}</ol>
      </div>
    </main>
  );
}

export default App;
