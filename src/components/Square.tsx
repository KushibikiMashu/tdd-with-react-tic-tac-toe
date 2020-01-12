import React from 'react';
import { SquareMark } from '../types/types';

type Props = {
  value: SquareMark;
  onClick: () => void;
};

const Square: React.FC<Props> = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
