import React from "react";

import "./App.css";
import Game from "./Game";

const Component: React.FC = () => (
  <>
    <h1>Tic-Tac-Toe</h1>
    <p>
      <a href="https://github.com/KushibikiMashu/tdd-with-react-tic-tac-toe">
        GitHub
      </a>
    </p>

    <Game />
  </>
);

export default Component;
