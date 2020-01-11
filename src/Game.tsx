import React from 'react';
import './App.css';
import './Game.css'

const Square: React.FC = () => <>
  <button className="square">
    {/* TODO */}
  </button>
</>

const Board: React.FC = () => {
  const renderSquare: React.FC<Number> = i => <Square/>
  const status = 'Next player: X';

  return (
    <div>
      <div className="status">{status}</div>
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

const Game: React.FC = () => <>
  <div className="game">
    <div className="game-board">
      <Board/>
    </div>
    <div className="game-info">
      <div>{/* status */}</div>
      <ol>{/* TODO */}</ol>
    </div>
  </div>
</>


export default Game;