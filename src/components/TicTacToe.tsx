import React, { useCallback, useEffect, useState } from "react";
import {
  DIMENSIONS,
  PLAYER_X,
  PLAYER_O,
  SQUARE_DIMS,
  GAME_STATES,
  DRAW,
  GAME_MODES,
} from "../lib/constants";
import { getRandomInt, switchPlayer } from "../lib/utils";
import Board from "../lib/board";
import { minimax } from "../lib/minimax";
import PlayerSelect from "./PlayerSelect";
import GameBoard from "./GameBoard";

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

  const [mode, setMode] = useState(GAME_MODES.medium);

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

  /**
   * Make the AI move. If it's the first move (the board is empty),
   * make the move at any random cell to skip unnecessary Minimax calculations
   */
  const aiMove = useCallback(() => {
    // important to pass a COPY of the grid here
    const board = new Board(grid.concat());
    const emptyIndices = board.getEmptySquares(grid);
    let index;
    switch (mode) {
      case GAME_MODES.easy:
        do {
          index = getRandomInt(0, 8);
        } while (!emptyIndices.includes(index));
        break;
      // Medium level is half minimax and half random
      case GAME_MODES.medium:
        const smartMove = !board.isEmpty(grid) && Math.random() < 0.5;
        if (smartMove) {
          index = minimax(board, players.ai!)[1];
        } else {
          do {
            index = getRandomInt(0, 8);
          } while (!emptyIndices.includes(index));
        }
        break;
      case GAME_MODES.difficult:
      default:
        index = board.isEmpty(grid)
          ? getRandomInt(0, 8)
          : minimax(board, players.ai!)[1];
    }

    if (index !== null && !grid[index]) {
      if (players.ai !== null) {
        move(index, players.ai);
      }
      setNextMove(players.human);
    }
  }, [move, grid, players, mode]);

  const changeMode = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMode(e.target.value);
  };

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
        <PlayerSelect
          players={players}
          setPlayers={setPlayers}
          choosePlayer={choosePlayer}
        />
      );
    case GAME_STATES.inProgress:
      return (
        <GameBoard
          grid={grid}
          humanMove={humanMove}
          nextMove={nextMove}
          players={players}
        />
      );
    case GAME_STATES.over:
      return (
        <div className="flex flex-col justify-center gap-2">
          <p className="text-xl font-bold">{winner}</p>
          <button
            onClick={startNewGame}
            className="border border-black px-4 py-2"
          >
            New Game
          </button>
        </div>
      );
  }
}
