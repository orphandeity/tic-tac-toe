import { Button } from "./ui/Button";

interface GameOverProps {
  winner: string | null;
  restartGame: () => void;
}

export default function GameOver({ winner, restartGame }: GameOverProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <p className="text-headingLg font-bold text-_lightYellow">{winner}</p>
      <Button onClick={restartGame} variant={"silver"} size={"sm"}>
        New Game
      </Button>
    </div>
  );
}
