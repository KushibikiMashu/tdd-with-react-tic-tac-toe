import React from "react";

const Square: React.FC<{value: Number}> = ({value}) => <>
  <button className="square">
    {value}
  </button>
</>

export default Square
