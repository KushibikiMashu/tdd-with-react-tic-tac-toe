import React, { useState } from 'react';
import Board from './Board';
import StepList from './StepList';
import './Game.css';
import { History, SquareMark, Cells } from '../types';
import {calculateWinner} from "./presenter";

type Props = {
  currentSquares: History[number]['squares']
  orderedHistory: History
  onSquareClick : (i:number) => void
  winner: { mark: SquareMark; lines: number[] } | null
  locations: Cells
  onButtonClick: () => void
  status: string
  stepNumber: number
  jumpTo: (i:number) => void
}

const Component: React.FC<Props> = (props) => (
  <div className="game">
    <div className="game-board">
      <Board
        squares={props.currentSquares}
        onClick={i => props.onSquareClick(i)}
        lines={props.winner === null ? null : props.winner.lines}
      />
      <ol>
        {props.locations.map((location, i) => {
          if (location.row === null) return null;
          return (
            <li key={i}>
              <span>row: {location.row}</span>
              <span>col: {location.col}</span>
            </li>
          );
        })}
      </ol>
    </div>
    <div className="game-info">
      <div>{props.status}</div>
      <button onClick={props.onButtonClick}>toggle</button>
      <StepList
        history={props.orderedHistory}
        jumpTo={props.jumpTo}
        currentStepNumber={props.stepNumber}
      />
    </div>
  </div>
)

const Container: React.FC = () => {
  const [history, setHistory] = useState<History>([
    {
      squares: Array(9).fill(null),
      number: 0,
    },
  ]);
  const [xIsNext, setNext] = useState<boolean>(true);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [locations, setLocations] = useState<Cells>([
    {
      row: null,
      col: null,
    },
  ]);
  const [asc, toggle] = useState<boolean>(true);
  const handleButtonClick = () => toggle(!asc)
  const orderedHistory = asc ? history : history.slice().reverse();

  function jumpTo(step: number) {
    setStepNumber(step);
    setNext(step % 2 === 0);
  }

  const current = history[stepNumber];
  const currentSquares = current.squares;
  const winner = calculateWinner(currentSquares);

  let status;
  if (winner) {
    status = 'Winner: ' + winner.mark;
  } else if (winner === null && history.length === 10) {
    status = 'Draw game';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const handleSquareClick = (i: number) => {
    const targetNumber = stepNumber + 1;
    const target = history.slice(0, targetNumber);
    const squares = currentSquares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(target.concat([{ squares, number: targetNumber }]));
    setNext(!xIsNext);
    setStepNumber(target.length);

    const newLocations = locations.slice(0, targetNumber);
    setLocations(
      newLocations.concat([
        {
          row: Math.floor(i / 3) + 1,
          col: (i % 3) + 1,
        },
      ])
    );
  }

  return <Component
    currentSquares={currentSquares}
    winner={winner}
    orderedHistory={orderedHistory}
    onSquareClick={handleSquareClick}
    locations={locations}
    onButtonClick={handleButtonClick}
    status={status}
    stepNumber={stepNumber}
    jumpTo={jumpTo}
  />
}

export default Container;
