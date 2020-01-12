import React, { useState } from 'react';
import Board from './Board';
import './Game.css';
import { History, Squares, SquareMark } from '../types/types';

function calculateWinner(squares: Squares): SquareMark {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const Game: React.FC = () => {
  const [history, setHistory] = useState<History>([
    {
      squares: Array(9).fill(null)
    }
  ]);
  const [xIsNext, setNext] = useState<boolean>(true);
  const [stepNumber, setStepNumber] = useState<number>(0);

  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  function jumpTo(step: number) {
    setStepNumber(step);
    setNext(step % 2 === 0);
  }

  const current = history[stepNumber];
  const currentSquares = current.squares;
  const winner = calculateWinner(currentSquares);

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  function handleClick(i: number) {
    const target = history.slice(0, stepNumber + 1);
    const squares = currentSquares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(target.concat([{ squares }]));
    setNext(!xIsNext);
    setStepNumber(target.length);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} onClick={i => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
