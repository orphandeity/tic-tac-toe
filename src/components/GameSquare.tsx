import { useState } from "react";
import { PLAYER_X } from "../lib/constants";
import { useWindowSize } from "../lib/useWindowSize";
import X from "../assets/icon-x.svg";
import XOutline from "../assets/icon-x-outline.svg";
import O from "../assets/icon-o.svg";
import OOutline from "../assets/icon-o-outline.svg";

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

  const { width } = useWindowSize();

  const iconSize = width! <= 375 ? 40 : 64;

  const MarkerX = () =>
    isOver ? (
      <img src={XOutline} alt="" width={iconSize} height={iconSize} />
    ) : (
      <img src={X} alt="" width={iconSize} height={iconSize} />
    );

  const MarkerO = () =>
    isOver ? (
      <img src={OOutline} alt="" width={iconSize} height={iconSize} />
    ) : (
      <img src={O} alt="" width={iconSize} height={iconSize} />
    );

  return (
    <div className="relative h-24 w-24 md:h-[140px] md:w-[140px]">
      <div
        onClick={() => humanMove(index)}
        onMouseEnter={() => setIsOver(true)}
        onMouseLeave={() => setIsOver(false)}
        className="grid aspect-square w-full cursor-pointer place-content-center rounded-large bg-_darkNavySemi"
      >
        {isActive && (value === PLAYER_X ? <MarkerX /> : <MarkerO />)}
      </div>

      <div className="absolute inset-0 -z-10 translate-y-2 rounded-large bg-[#10202A]" />
    </div>
  );
};

export default GameSquare;
