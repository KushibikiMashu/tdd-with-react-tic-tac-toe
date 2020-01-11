import React from "react";
import { render } from "@testing-library/react";
import Square from "./Square";

test('render numbers', () => {
  const { getByText, rerender } = render(<Square value={1}/>)
  expect(getByText('1')).toBeInTheDocument()

  rerender(<Square value={2}/>)
  expect(getByText('2')).toBeInTheDocument()
})
