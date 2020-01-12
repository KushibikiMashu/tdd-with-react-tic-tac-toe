import React from 'react';
import { SquareMark } from '../types/types';

type Props = {
  value: SquareMark;
  onClick: () => void;
  isComplete: boolean;
};

const Square: React.FC<Props> = ({ value, onClick, isComplete }) => {
  return (
    <button
      className="square"
      style={isComplete ? { backgroundColor: 'yellow' } : undefined}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;
