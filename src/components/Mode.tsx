import { GAME_MODES } from "../lib/constants";

interface ModeProps {
  mode: string;
  changeMode: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Mode = ({ mode, changeMode }: ModeProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="mode" className="text-sm font-semibold">
        Select difficulty
      </label>
      <select
        id="mode"
        onChange={changeMode}
        value={mode}
        className="cursor-pointer border-black"
      >
        {Object.keys(GAME_MODES).map((key) => {
          const gameMode = GAME_MODES[key];
          return (
            <option key={gameMode} value={gameMode}>
              {key}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Mode;
