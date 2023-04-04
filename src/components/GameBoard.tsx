import { PLAYER_O, PLAYER_X } from "../lib/constants";
import { IconLogo, IconO, IconRestart, IconX } from "../lib/icons";
import { Button } from "./ui/Button";

interface GameBoardProps {
  grid: SquareType[];
  humanMove: (index: number) => void;
  nextMove: number | null;
  players: Record<string, number | null>;
  startNewGame: () => void;
}

const GameBoard = ({
  grid,
  humanMove,
  nextMove,
  players,
  startNewGame,
}: GameBoardProps) => {
  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="flex items-center justify-start">
        <IconLogo />
      </div>
      <div className="relative">
        <div className="headingXs flex items-center justify-center gap-2 rounded-small bg-_darkNavySemi py-3 uppercase text-_silver">
          <span className="headingMd">{nextMove === PLAYER_O ? "O" : "X"}</span>{" "}
          turn
        </div>
        <div className="absolute inset-0 -z-10 translate-y-1 rounded-small bg-[#10202A]" />
      </div>
      <div className="flex items-center justify-end">
        <div className="relative">
          <Button variant={"silver"} size={"sm"} onClick={startNewGame}>
            <IconRestart />
          </Button>
          <div className="absolute inset-0 -z-10 translate-y-1 rounded-small bg-[#6B8998]" />
        </div>
      </div>
      {grid.map((value, index) => {
        const isActive = value !== null;

        return (
          <div key={index} className="relative">
            <div
              onClick={() => humanMove(index)}
              className="grid h-[140px] w-[140px] cursor-pointer place-content-center rounded-large bg-_darkNavySemi"
            >
              {isActive && <>{value === PLAYER_X ? <IconX /> : <IconO />}</>}
            </div>
            <div className="absolute inset-0 -z-10 translate-y-2 rounded-large bg-[#10202A]" />
          </div>
        );
      })}
      <div className="flex flex-col items-center justify-center rounded-large bg-_lightBlue py-3">
        <span className="body uppercase">
          X {players.human === PLAYER_X ? "(YOU)" : "(CPU)"}
        </span>
        <span className="headingMd">0</span>
      </div>
      <div className="flex flex-col items-center justify-center rounded-large bg-_silver py-3">
        <span className="body uppercase">TIES</span>
        <span className="headingMd">0</span>
      </div>
      <div className="flex flex-col items-center justify-center rounded-large bg-_lightYellow py-3">
        <span className="body uppercase">
          O {players.human === PLAYER_O ? "(YOU)" : "(CPU)"}
        </span>
        <span className="headingMd">0</span>
      </div>
    </div>
  );
};

export default GameBoard;
