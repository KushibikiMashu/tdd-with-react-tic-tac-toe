import React from 'react';
import Square from './Square';
import { Squares } from '../types/types';

type Props = {
  squares: Squares;
  onClick: (i: number) => void;
  lines: number[] | null;
};

const Board: React.FC<Props> = ({ squares, onClick, lines }) => {
  const renderSquare: React.FC<number> = i => (
    <Square
      key={i}
      value={squares[i]}
      onClick={() => onClick(i)}
      isComplete={lines !== null ? lines.includes(i) : false}
    />
  );

  const renderSquares = () => {
    return [0, 1, 2].map(i => {
      const multiplied = i * 3;
      return (
        <div className="board-row" key={i}>
          {[multiplied, multiplied + 1, multiplied + 2].map(i =>
            renderSquare(i)
          )}
        </div>
      );
    });
  };

  return <div>{renderSquares()}</div>;
};

export default Board;
