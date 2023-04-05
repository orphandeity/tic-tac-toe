import { PLAYER_O, PLAYER_X } from "../lib/constants";
import { IconLogo, IconO, IconRestart, IconX } from "../lib/icons";
import GameSquare from "./GameSquare";
import { Button } from "./ui/Button";

interface GameBoardProps {
  grid: SquareType[];
  humanMove: (index: number) => void;
  nextMove: number | null;
  players: Record<string, number | null>;
  restartGame: () => void;
}

const GameBoard = ({
  grid,
  humanMove,
  nextMove,
  players,
  restartGame,
}: GameBoardProps) => {
  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="flex items-center justify-start">
        <IconLogo />
      </div>

      <div className="relative">
        <div className="md:headingXs flex h-[52px] w-[96px] items-center justify-center rounded-small bg-_darkNavySemi text-sm font-bold uppercase text-_silver md:w-[140px]">
          {nextMove === PLAYER_X ? (
            <svg
              className="-translate-x-2 scale-[25%] md:scale-[35%]"
              width={64}
              height={64}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="-translate-x-2 scale-[25%] md:scale-[35%]"
              width={64}
              height={64}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
                fill="currentColor"
              />
            </svg>
          )}
          <span className="-translate-x-3">turn</span>
        </div>
        <div className="absolute inset-0 -z-10 translate-y-1 rounded-small bg-[#10202A]" />
      </div>

      <div className="flex items-center justify-end">
        <div className="relative">
          <Button
            className="scale-75 md:scale-100"
            variant={"silver"}
            size={"sm"}
            onClick={restartGame}
          >
            <IconRestart />
          </Button>
          <div className="absolute inset-0 -z-10 translate-y-1 scale-75 rounded-small bg-[#6B8998] md:scale-100" />
        </div>
      </div>

      {grid.map((value, index) => {
        const isActive = value !== null;

        return (
          <GameSquare
            key={index}
            index={index}
            humanMove={humanMove}
            value={value}
          />
        );
      })}

      <div className="flex flex-col items-center justify-center rounded-large bg-_lightBlue py-3">
        <span className="text-xs font-medium uppercase md:text-body md:tracking-body">
          X {players.human === PLAYER_X ? "(YOU)" : "(CPU)"}
        </span>
        <span className="text-xl font-bold md:text-headingMd md:tracking-headingMd">
          0
        </span>
      </div>

      <div className="flex flex-col items-center justify-center rounded-large bg-_silver py-3">
        <span className="text-xs font-medium uppercase md:text-body md:tracking-body">
          TIES
        </span>
        <span className="text-xl font-bold md:text-headingMd md:tracking-headingMd">
          0
        </span>
      </div>

      <div className="flex flex-col items-center justify-center rounded-large bg-_lightYellow py-3">
        <span className="text-xs font-medium uppercase md:text-body md:tracking-body">
          O {players.human === PLAYER_O ? "(YOU)" : "(CPU)"}
        </span>
        <span className="text-xl font-bold md:text-headingMd md:tracking-headingMd">
          0
        </span>
      </div>
    </div>
  );
};

export default GameBoard;
