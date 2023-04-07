import { PLAYER_O, PLAYER_X } from "../lib/constants";
import { IconLogo, IconRestart } from "../lib/icons";
import GameSquare from "./GameSquare";
import { Button } from "./ui/Button";
import X from "../assets/icon-x-silver.svg";
import O from "../assets/icon-o-silver.svg";
import logo from "../assets/logo.svg";
import restart from "../assets/icon-restart.svg";
import { useWindowSize } from "../lib/useWindowSize";

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
  const { width } = useWindowSize();

  const iconSize = width! <= 375 ? 16 : 20;

  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="flex items-center justify-start">
        <img src={logo} alt="" />
      </div>

      <div className="relative">
        <div className="md:headingXs flex h-[52px] w-[96px] items-center justify-center gap-2 rounded-small bg-_darkNavySemi text-sm font-bold uppercase text-_silver md:w-[140px]">
          {nextMove === PLAYER_X ? (
            <img src={X} alt="" width={iconSize} height={iconSize} />
          ) : (
            <img src={O} alt="" width={iconSize} height={iconSize} />
          )}
          <span className="">turn</span>
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
            <img src={restart} alt="" />
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
