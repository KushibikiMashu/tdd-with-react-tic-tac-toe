import React from 'react';
import Square from './Square';
import { Squares } from '../types/types';

type Props = {
  squares: Squares;
  onClick: (i: number) => void;
};

const Board: React.FC<Props> = ({ squares, onClick }) => {
  const renderSquare: React.FC<number> = i => (
    <Square value={squares[i]} onClick={() => onClick(i)} />
  );

  const renderSquares = () => {
    return [0, 1, 2].map(i => {
      const multiplied = i * 3;
      return (
        <div className="board-row">
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
