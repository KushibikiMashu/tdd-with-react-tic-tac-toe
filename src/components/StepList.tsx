import React from 'react';
import {History} from "../types";

type ContainerProps = {
  history: History
  jumpTo: (i: number) => void
  currentStepNumber: number
}

type Props = {
  steps: {
    text: string
    onClick: () => void
    location: History[number]['location']
  }[]
} & Pick<ContainerProps, 'currentStepNumber'>

const Component: React.FC<Props> = (props) => (
  <ol>
    {props.steps.map((step, i) =>
      <li key={i}>
        <button
          style={i === props.currentStepNumber ? {fontWeight: 'bold'} : undefined}
          onClick={step.onClick}
        >
          {step.text}
        </button>
        {' '}
        {step.location && step.location.row && step.location.col && <span>({step.location.row}, {step.location.col})</span>}
      </li>
    )}
  </ol>
)

const Container: React.FC<ContainerProps> = (props) => {
  const steps = props.history.map(step => {
      const stepNumber = step.number
      const text = stepNumber ? `Go to move #${stepNumber}` : 'Go to game start';
      const onClick = () => props.jumpTo(stepNumber)

      return {text, onClick, location: step.location}
    }
  )

  return <Component currentStepNumber={props.currentStepNumber} steps={steps}/>
}

export default Container
