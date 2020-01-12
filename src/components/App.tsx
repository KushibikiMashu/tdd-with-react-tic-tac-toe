import React from 'react';
import './App.css';
import Game from './Game';

const App: React.FC = () => (
  <>
    <div style={{ paddingBottom: 16 }}>
      <a href="https://github.com/KushibikiMashu/tdd-with-react-tic-tac-toe">
        See codes on GitHub
      </a>
    </div>
    <Game />
  </>
);

export default App;
