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
import GameOver from "./GameOver";

// These values are declared outside of component
// so they don't get re-created on each re-render

// default array for grid
const emptyGrid: SquareType[] = new Array(DIMENSIONS ** 2).fill(null);

// Board class
// contains methods for determining current state of game board (e.g. empty squares, winner)
const board = new Board();

export default function TicTacToe() {
  // game board squares
  const [grid, setGrid] = useState<SquareType[]>(emptyGrid);

  // human & ai player values
  const [players, setPlayers] = useState<Record<string, number | null>>({
    human: null,
    ai: null,
  });

  // current state of game (not started, playing, over)
  const [gameState, setGameState] = useState(GAME_STATES.notStarted);

  // whose turn is it?
  const [nextMove, setNextMove] = useState<number | null>(null);

  // who won?
  const [winner, setWinner] = useState<string | null>(null);

  // difficulty
  const [mode, setMode] = useState(GAME_MODES.medium);

  // update grid state with new move
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
        const smartMove = !board.isEmpty(grid) && Math.random() < 0.6;
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
    if (!grid[index] && nextMove === players.human) {
      move(index, players.human);
      setNextMove(players.ai);
    }
  };

  // make ai player's move when nextMove gets updated
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

  // check for winner when nextMove gets updated
  useEffect(() => {
    const { res: boardWinner, row } = board.getWinner(grid);
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

  // player select
  const choosePlayer = (option: number) => {
    setPlayers({ human: option, ai: switchPlayer(option) });
  };

  // start new game
  const startNewGame = () => {
    setGameState(GAME_STATES.inProgress);
    setNextMove(PLAYER_X);
  };

  // restart game
  const restartGame = () => {
    setGameState(GAME_STATES.notStarted);
    setGrid(emptyGrid);
  };

  switch (gameState) {
    case GAME_STATES.notStarted:
    default:
      return (
        <PlayerSelect choosePlayer={choosePlayer} startNewGame={startNewGame} />
      );
    case GAME_STATES.inProgress:
      return (
        <GameBoard
          grid={grid}
          humanMove={humanMove}
          nextMove={nextMove}
          players={players}
          restartGame={restartGame}
        />
      );
    case GAME_STATES.over:
      return <GameOver winner={winner} restartGame={restartGame} />;
  }
}
