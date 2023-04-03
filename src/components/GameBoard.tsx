import { PLAYER_X } from "../lib/constants";

interface GameBoardProps {
  grid: any[];
  humanMove: (index: number) => void;
}

const GameBoard = ({ grid, humanMove }: GameBoardProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {grid.map((value, index) => {
        const isActive = value !== null;

        return (
          <div
            key={index}
            onClick={() => humanMove(index)}
            className="grid h-16 w-16 cursor-pointer place-content-center border border-black text-xl font-bold"
          >
            {isActive && <span>{value === PLAYER_X ? "X" : "O"}</span>}
          </div>
        );
      })}
    </div>
  );
};

export default GameBoard;
