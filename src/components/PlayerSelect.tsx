import { useEffect, useState } from "react";
import { PLAYER_X, PLAYER_O } from "../lib/constants";
import { switchPlayer } from "../lib/utils";
import * as Switch from "@radix-ui/react-switch";
import { Button } from "./ui/Button";
import clsx from "clsx";

interface PlayerSelectProps {
  players: Record<string, number | null>;
  setPlayers: React.Dispatch<
    React.SetStateAction<Record<string, number | null>>
  >;
  choosePlayer: (option: number) => void;
}

const PlayerSelect = ({
  players,
  setPlayers,
  choosePlayer,
}: PlayerSelectProps) => {
  const [playerO, setPlayerO] = useState(true);

  const mark = playerO ? PLAYER_O : PLAYER_X;

  function handleCheckedChange() {
    setPlayerO(!playerO);
  }

  useEffect(() => {
    if (playerO) {
      setPlayers({ human: PLAYER_O, ai: switchPlayer(PLAYER_X) });
    } else {
      setPlayers({ human: PLAYER_X, ai: switchPlayer(PLAYER_O) });
    }
  }, [playerO]);

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="relative">
        <div className="flex flex-col items-center gap-6 rounded-large bg-_darkNavySemi p-6">
          <p id="select" className="headingXs uppercase text-_silver">
            Pick player 1's mark
          </p>
          <Switch.Root
            aria-describedby="select"
            checked={playerO}
            onCheckedChange={handleCheckedChange}
            className="w-[412px] rounded-small bg-_darkNavy p-2"
          >
            <Switch.Thumb asChild>
              <div
                className={clsx([
                  "w-[230px] rounded-small bg-_silver py-3 transition-transform",
                  playerO && "translate-x-[165px]",
                ])}
              >
                <span className="headingLg text-_darkNavy">
                  {playerO ? "O" : "X"}
                </span>
              </div>
            </Switch.Thumb>
          </Switch.Root>
          <p className="body uppercase text-_silver">remember: x goes first</p>
        </div>
        <div className="absolute inset-0 -z-10 translate-y-2 rounded-large bg-[#10202A]" />
      </div>
      <div className="relative w-full">
        <Button onClick={() => choosePlayer(mark)}>new game (vs cpu)</Button>
        <div className="absolute inset-0 -z-10 translate-y-2 rounded-large bg-[#CB8B14]" />
      </div>
    </div>
  );
};

export default PlayerSelect;
