import { useEffect, useState } from "react";
import { PLAYER_X, PLAYER_O } from "../lib/constants";
import { switchPlayer } from "../lib/utils";
import * as Switch from "@radix-ui/react-switch";
import { Button } from "./ui/Button";
import clsx from "clsx";
import { IconLogo, IconO, IconX } from "../lib/icons";
import X from "../assets/icon-x-silver.svg";
import O from "../assets/icon-o.svg";

interface PlayerSelectProps {
  choosePlayer: (option: number) => void;
  startNewGame: () => void;
}

const PlayerSelect = ({ choosePlayer, startNewGame }: PlayerSelectProps) => {
  // player 1 is "O"
  const [playerO, setPlayerO] = useState(true);

  return (
    <div className="flex flex-col items-center gap-10">
      <IconLogo />
      <div className="relative">
        <div className="flex flex-col items-center gap-6 rounded-large bg-_darkNavySemi p-6">
          <p id="select" className="headingXs uppercase text-_silver">
            Pick player 1's mark
          </p>
          <fieldset className="flex w-[279px] rounded-small bg-_darkNavy p-2 md:w-[412px]">
            <button
              onClick={() => {
                setPlayerO(false);
                choosePlayer(PLAYER_X);
              }}
              className={clsx([
                "grid w-[131px] place-content-center rounded-small md:w-[198px]",
                playerO
                  ? "bg-_darkNavy text-_silver hover:bg-_darkNavySemi"
                  : "bg-_silver text-_darkNavy",
              ])}
            >
              <svg
                className="scale-50"
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
            </button>
            <button
              onClick={() => {
                setPlayerO(true);
                choosePlayer(PLAYER_O);
              }}
              className={clsx([
                "grid w-[131px] place-content-center rounded-small md:w-[198px]",
                playerO
                  ? "bg-_silver text-_darkNavy"
                  : "bg-_darkNavy text-_silver hover:bg-_darkNavySemi",
              ])}
            >
              <svg
                className="scale-50"
                width={64}
                height={64}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
                  fill="currentColor"
                />
              </svg>
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
