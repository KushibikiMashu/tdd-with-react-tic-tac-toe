import React from 'react';
import {SquareMark} from '../types';
import './Square.css'

type Props = {
  value: SquareMark;
  onClick: () => void;
  isWinMark: boolean;
};

const Component: React.FC<Props> = (props) => (
  <button
    className="square"
    style={{backgroundColor: props.isWinMark ? 'yellow' : 'white'}}
    onClick={props.onClick}
  >
    {props.value}
  </button>
);

export default Component;
