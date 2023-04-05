import { useEffect, useState } from "react";
import { PLAYER_X, PLAYER_O } from "../lib/constants";
import { switchPlayer } from "../lib/utils";
import * as Switch from "@radix-ui/react-switch";
import { Button } from "./ui/Button";
import clsx from "clsx";

interface PlayerSelectProps {
  choosePlayer: (option: number) => void;
  startNewGame: () => void;
  players: Record<string, number | null>;
}

const PlayerSelect = ({
  choosePlayer,
  startNewGame,
  players,
}: PlayerSelectProps) => {
  return (
    <div className="flex flex-col items-center gap-10">
      <div className="relative">
        <div className="flex flex-col items-center gap-6 rounded-large bg-_darkNavySemi p-6">
          <p id="select" className="headingXs uppercase text-_silver">
            Pick player 1's mark
          </p>
          <fieldset className="flex w-[412px] rounded-small bg-_darkNavy p-2">
            <button
              onClick={() => choosePlayer(PLAYER_X)}
              className="w-[198px] rounded-small bg-_silver py-3"
            >
              X
            </button>
            <button
              onClick={() => choosePlayer(PLAYER_O)}
              className="w-[198px] rounded-small bg-_silver py-3"
            >
              O
            </button>
          </fieldset>
          <p className="body uppercase text-_silver">remember: x goes first</p>
        </div>
        <div className="absolute inset-0 -z-10 translate-y-2 rounded-large bg-[#10202A]" />
      </div>
      <div className="relative w-full">
        <Button onClick={startNewGame}>new game (vs cpu)</Button>
        <div className="absolute inset-0 -z-10 translate-y-2 rounded-large bg-[#CB8B14]" />
      </div>
    </div>
  );
};

export default PlayerSelect;
