import React from "react";
import { render, fireEvent } from '@testing-library/react'
import Board from "./Board";
import '@testing-library/jest-dom/extend-expect'

test('render board', () => {
  const { getByText } = render(<Board />)
  const text = getByText(/Next player/i)
  expect(text).toBeInTheDocument()
})

test('Square component renders X and O', () => {
  const { getAllByRole } = render(<Board />)
  const firstSquare = getAllByRole('button')[0]
  fireEvent.click(firstSquare)
  expect(firstSquare).toHaveTextContent('X')

  const secondSquare = getAllByRole('button')[1]
  fireEvent.click(secondSquare)
  expect(secondSquare).toHaveTextContent('O')
})
