interface SquareProps {
  value: SquareType;
  onSquareClick: () => void;
}

const Square = ({ value, onSquareClick }: SquareProps) => {
  return (
    <div
      onClick={onSquareClick}
      className="grid h-16 w-16 cursor-pointer place-content-center rounded-lg bg-neutral-200 text-xl font-bold"
    >
      {value}
    </div>
  );
};

export default Square;
