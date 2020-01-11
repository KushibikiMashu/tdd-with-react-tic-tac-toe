import React from "react";
import { render } from '@testing-library/react'
import Board from "./Board";
import '@testing-library/jest-dom/extend-expect'

test('render board', () => {
  const { getByText } = render(<Board />)
  const text = getByText(/Next player/i)
  expect(text).toBeInTheDocument()
})
