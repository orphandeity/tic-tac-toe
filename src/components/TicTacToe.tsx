import React, { useCallback, useEffect, useState } from "react";
import {
  DIMENSIONS,
  PLAYER_X,
  PLAYER_O,
  SQUARE_DIMS,
  GAME_STATES,
  DRAW,
} from "../lib/constants";
import { getRandomInt, switchPlayer } from "../lib/utils";
import Board from "../lib/board";

// declare default array for grid
// outside of component so it doesn't get re-created on re-render
const emptyGrid = new Array(DIMENSIONS ** 2).fill(null);

const board = new Board();

export default function TicTacToe() {
  // initialize game board
  const [grid, setGrid] = useState(emptyGrid);

  const [players, setPlayers] = useState<Record<string, number | null>>({
    human: null,
    ai: null,
  });

  const [gameState, setGameState] = useState(GAME_STATES.notStarted);

  const [nextMove, setNextMove] = useState<number | null>(null);

  const [winner, setWinner] = useState<string | null>(null);

  const move = useCallback(
    (index: number, player: number | null) => {
      if (player && gameState === GAME_STATES.inProgress) {
        setGrid((grid) => {
          const gridCopy = grid.concat();
          gridCopy[index] = player;
          return gridCopy;
        });
      }
    },
    [gameState]
  );

  const aiMove = useCallback(() => {
    let index = getRandomInt(0, 8);
    while (grid[index]) {
      index = getRandomInt(0, 8);
    }
    move(index, players.ai);
    setNextMove(players.human);
  }, [move, grid, players]);

  const humanMove = (index: number) => {
    console.log(index);
    if (!grid[index] && nextMove === players.human) {
      move(index, players.human);
      setNextMove(players.ai);
    }
  };

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (
      nextMove !== null &&
      nextMove === players.ai &&
      gameState !== GAME_STATES.over
    ) {
      // delay ai moves to make them seem more natural
      timeout = setTimeout(() => {
        aiMove();
      }, 500);
    }
    return () => clearTimeout(timeout);
  }, [nextMove, aiMove, players.ai, gameState]);

  useEffect(() => {
    const boardWinner = board.getWinner(grid);
    const declareWinner = (winner: number) => {
      let winnerStr = "";
      switch (winner) {
        case PLAYER_X:
          winnerStr = "Player X Wins!";
          break;
        case PLAYER_O:
          winnerStr = "Player O Wins!";
          break;
        case DRAW:
        default:
          winnerStr = "It's a draw!";
      }
      setGameState(GAME_STATES.over);
      setWinner(winnerStr);
    };
    if (boardWinner !== null && gameState !== GAME_STATES.over) {
      declareWinner(boardWinner);
    }
  }, [gameState, grid, nextMove]);

  const choosePlayer = (option: number) => {
    setPlayers({ human: option, ai: switchPlayer(option) });
    setGameState(GAME_STATES.inProgress);
    // set Player X to make the next move
    setNextMove(PLAYER_X);
  };

  const startNewGame = () => {
    setGameState(GAME_STATES.notStarted);
    setGrid(emptyGrid);
  };

  switch (gameState) {
    case GAME_STATES.notStarted:
    default:
      return (
        <div>
          <p>Choose your player</p>
          <menu className="flex gap-4">
            <button onClick={() => choosePlayer(PLAYER_X)}>X</button>
            <p>or</p>
            <button onClick={() => choosePlayer(PLAYER_O)}>O</button>
          </menu>
        </div>
      );
    case GAME_STATES.inProgress:
      return (
        <div className="grid grid-cols-3 gap-4">
          {grid.map((value, index) => {
            const isActive = value !== null;

            return (
              <div
                key={index}
                onClick={() => humanMove(index)}
                className="grid h-16 w-16 cursor-pointer place-content-center border"
              >
                {isActive && <span>{value === PLAYER_X ? "X" : "O"}</span>}
              </div>
            );
          })}
        </div>
      );
    case GAME_STATES.over:
      return (
        <div>
          <p>{winner}</p>
          <button onClick={startNewGame}>New Game</button>
        </div>
      );
  }
}
