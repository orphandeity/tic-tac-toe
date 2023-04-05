import { useState } from "react";
import { PLAYER_X } from "../lib/constants";
import { IconX, IconO, IconXOutline, IconOOutline } from "../lib/icons";

interface GameSquareProps {
  index: number;
  humanMove: (index: number) => void;
  value: SquareType;
}

const GameSquare = ({ index, humanMove, value }: GameSquareProps) => {
  // has the square been played?
  const isActive = value !== null;

  // hover state
  const [isOver, setIsOver] = useState(false);

  const MarkerX = () => (isOver ? <IconXOutline /> : <IconX />);

  const MarkerO = () => (isOver ? <IconOOutline /> : <IconO />);

  return (
    <div className="relative">
      <div
        onClick={() => humanMove(index)}
        onMouseEnter={() => setIsOver(true)}
        onMouseLeave={() => setIsOver(false)}
        className="grid h-[140px] w-[140px] cursor-pointer place-content-center rounded-large bg-_darkNavySemi"
      >
        {isActive && (value === PLAYER_X ? <MarkerX /> : <MarkerO />)}
      </div>

      <div className="absolute inset-0 -z-10 translate-y-2 rounded-large bg-[#10202A]" />
    </div>
  );
};

export default GameSquare;
