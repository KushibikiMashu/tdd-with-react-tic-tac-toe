import React, {useState} from "react";
import Square from "./Square";

const Board: React.FC = () => {
  const [squares, setSquares] = useState<Array<string | null>>(Array(9).fill(null))

  function handleClick(i: number) {
    const slicedSquares = squares.slice()
    slicedSquares[i] = 'X'
    setSquares(slicedSquares)
  }

  const renderSquare: React.FC<number> = i =>
    <Square
      value={squares[i]}
      onClick={() => handleClick(i)}
    />

  const status = 'Next player: X';

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

export default Board
