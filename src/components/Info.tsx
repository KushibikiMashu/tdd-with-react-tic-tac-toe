import React from "react";

import StepList from "./StepList";
import "./Info.css";

import { History } from "../types";

type Props = {
  status: string;
  onClick: () => void;
  history: History;
  jumpTo: (i: number) => void;
  currentStepNumber: number;
};

const Component: React.FC<Props> = (props) => (
  <div className="info">
    <div>{props.status}</div>
    <button onClick={props.onClick}>toggle</button>

    <StepList
      history={props.history}
      jumpTo={props.jumpTo}
      currentStepNumber={props.currentStepNumber}
    />
  </div>
);

export default Component;
