import React from 'react';
import {SquareMark} from '../types/types';
import './Square.css'

type Props = {
  value: SquareMark;
  onClick: () => void;
  isCompleted: boolean;
};

const Square: React.FC<Props> = (props) => (
  <button
    className="square"
    style={{backgroundColor: props.isCompleted ? 'yellow' : 'white'}}
    onClick={props.onClick}
  >
    {props.value}
  </button>
);

export default Square;
