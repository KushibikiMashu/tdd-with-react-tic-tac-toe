import React from "react";
import Square from "./Square";
import { Squares } from './types/types'

type Props = {
  squares: Squares,
  onClick: (i: number) => void
}

const Board: React.FC<Props> = ({ squares, onClick }) => {
  const renderSquare: React.FC<number> = i =>
    <Square
      value={squares[i]}
      onClick={() => onClick(i)}
    />

  return (
    <div>
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
