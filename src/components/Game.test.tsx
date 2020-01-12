import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Game from './Game';

test('render next player is X', () => {
  const { getByText } = render(<Game />);
  const text = getByText(/Next player: X/i);
  expect(text).toBeInTheDocument();
});

test('render next player is O', () => {
  const { getByText, getAllByRole } = render(<Game />);

  fireEvent.click(getAllByRole('button')[0]);

  const text = getByText(/Next player: O/i);
  expect(text).toBeInTheDocument();
});

test('Square component renders X and O', () => {
  const { getAllByRole } = render(<Game />);
  const firstSquare = getAllByRole('button')[0];
  fireEvent.click(firstSquare);
  expect(firstSquare).toHaveTextContent('X');

  const secondSquare = getAllByRole('button')[1];
  fireEvent.click(secondSquare);
  expect(secondSquare).toHaveTextContent('O');
});

test('render Winner X when game ends', () => {
  const { getByText, getAllByRole } = render(<Game />);

  fireEvent.click(getAllByRole('button')[0]); // X
  fireEvent.click(getAllByRole('button')[6]); // O
  fireEvent.click(getAllByRole('button')[1]); // X
  fireEvent.click(getAllByRole('button')[7]); // O
  fireEvent.click(getAllByRole('button')[2]); // X

  const text = getByText(/Winner: X/i);
  expect(text).toBeInTheDocument();
});

test('to have reset button', () => {
  const { getByText } = render(<Game />);
  const reset = getByText(/Go to game start/i);
  expect(reset).toBeInTheDocument();
});

test('reset game', () => {
  const { getByText, getAllByRole } = render(<Game />);

  fireEvent.click(getAllByRole('button')[0]); // X
  const reset = getByText(/Go to game start/i);
  fireEvent.click(reset);

  expect(getAllByRole('button')[0]).toHaveTextContent('');
});

test('go back to the first move', () => {
  const { getByText, getAllByRole } = render(<Game />);

  fireEvent.click(getAllByRole('button')[0]); // X
  fireEvent.click(getAllByRole('button')[1]); // O
  fireEvent.click(getAllByRole('button')[2]); // X

  const moveOne = getByText(/Go to move #1/i);
  fireEvent.click(moveOne);

  expect(getAllByRole('button')[0]).toHaveTextContent('X');
  expect(getAllByRole('button')[1]).toHaveTextContent('');
  expect(getAllByRole('button')[2]).toHaveTextContent('');
});

test('delete past moves', () => {
  const { getByText, getAllByRole, queryByLabelText } = render(<Game />);

  fireEvent.click(getAllByRole('button')[0]); // X
  fireEvent.click(getAllByRole('button')[1]); // O
  fireEvent.click(getAllByRole('button')[2]); // X

  const reset = getByText(/Go to game start/i);
  fireEvent.click(reset);

  fireEvent.click(getAllByRole('button')[0]); // X

  expect(getByText(/Go to move #1/i)).toBeInTheDocument();
  expect(queryByLabelText(/Go to move #2/i)).toBeNull();
  expect(queryByLabelText(/Go to move #3/i)).toBeNull();
});

test('update next player', () => {
  const { getByText, getAllByRole } = render(<Game />);

  fireEvent.click(getAllByRole('button')[0]); // X
  fireEvent.click(getAllByRole('button')[1]); // O
  fireEvent.click(getAllByRole('button')[2]); // X

  const moveOne = getByText(/Go to move #1/i);
  fireEvent.click(moveOne);

  const player = getByText(/Next player: O/i);
  expect(player).toBeInTheDocument();
});

test('', () => {
  const { getByText, getAllByRole } = render(<Game />);

  fireEvent.click(getAllByRole('button')[8]); // X

  const row = getByText(/row: 3/i);
  expect(row).toBeInTheDocument();

  const col = getByText(/col: 3/i);
  expect(col).toBeInTheDocument();
});
