import React from 'react';
import Square from './Square';
import './Board.css';

import {Squares} from '../types';

export type ContainerProps = {
  squares: Squares;
  onClick: (i: number) => void;
  lines: number[] | null;
}

type Props = {
  rows: number[]
  isWinMark: (i: number) => boolean
  makeCols: (i: number) => number[]
} & ContainerProps

const Component: React.FC<Props> = (props) => (
  <div>
    {props.rows.map(i => (
      <div className="board-row" key={i}>
        {props.makeCols(i).map(j =>
          <Square
            key={j}
            value={props.squares[j]}
            onClick={() => props.onClick(j)}
            isWinMark={props.isWinMark(j)}
          />
        )}
      </div>
    ))}
  </div>
)

const Container: React.FC<ContainerProps> = (props) => {
  const rows = [0, 1, 2]
  const makeCols = (i: number) => [i * 3, i * 3 + 1, i * 3 + 2]
  const isWinMark = (i: number) => props.lines === null ? false : props.lines.includes(i)

  return <Component {...props} rows={rows} isWinMark={isWinMark} makeCols={makeCols}/>
}

export default Container;
