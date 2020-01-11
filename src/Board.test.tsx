import React from "react";
import { render, fireEvent } from '@testing-library/react'
import Board from "./Board";
import '@testing-library/jest-dom/extend-expect'

test('render board', () => {
  const { getByText } = render(<Board />)
  const text = getByText(/Next player/i)
  expect(text).toBeInTheDocument()
})

test('Square component renders X', () => {
  const { getAllByRole } = render(<Board />)
  const button = getAllByRole('button')[0]
  fireEvent.click(button)
  expect(button).toHaveTextContent('X')
})
