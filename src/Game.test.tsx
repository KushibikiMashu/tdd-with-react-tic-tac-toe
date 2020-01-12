import React from "react";
import {render, fireEvent} from '@testing-library/react'
import Game from "./Game";
import '@testing-library/jest-dom/extend-expect'

test('render next player is X', () => {
  const {getByText} = render(<Game/>)
  const text = getByText(/Next player: X/i)
  expect(text).toBeInTheDocument()
})

test('render next player is O', () => {
  const {getByText, getAllByRole} = render(<Game/>)
  fireEvent.click(getAllByRole('button')[0])
  const text = getByText(/Next player: O/i)
  expect(text).toBeInTheDocument()
})

test('Square component renders X and O', () => {
  const {getAllByRole} = render(<Game/>)
  const firstSquare = getAllByRole('button')[0]
  fireEvent.click(firstSquare)
  expect(firstSquare).toHaveTextContent('X')

  const secondSquare = getAllByRole('button')[1]
  fireEvent.click(secondSquare)
  expect(secondSquare).toHaveTextContent('O')
})

test('render Winner X when game ends', () => {
  const {getByText, getAllByRole} = render(<Game/>)
  fireEvent.click(getAllByRole('button')[0]) // X
  fireEvent.click(getAllByRole('button')[6]) // O
  fireEvent.click(getAllByRole('button')[1]) // X
  fireEvent.click(getAllByRole('button')[7]) // O
  fireEvent.click(getAllByRole('button')[2]) // X
  const text = getByText(/Winner: X/i)
  expect(text).toBeInTheDocument()
})