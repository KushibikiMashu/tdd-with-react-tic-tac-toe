import React from "react";

type Props = {
  value: string | null,
  onClick: () => void
}

const Square: React.FC<Props> = ({value, onClick}) => {
  return (
    <button
      className="square"
      onClick={onClick}
    >
      {value}
    </button>
  )
}

export default Square
