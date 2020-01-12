import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Game from './Game';

describe('<Square />', () => {
  it('render next player is X', () => {
    const { getByText } = render(<Game />);
    const text = getByText(/Next player: X/i);
    expect(text).toBeInTheDocument();
  });

  it('render next player is O', () => {
    const { getByText, getAllByRole } = render(<Game />);

    fireEvent.click(getAllByRole('button')[0]);

    const text = getByText(/Next player: O/i);
    expect(text).toBeInTheDocument();
  });

  it('Square component renders X and O', () => {
    const { getAllByRole } = render(<Game />);
    const firstSquare = getAllByRole('button')[0];

    fireEvent.click(firstSquare);
    expect(firstSquare).toHaveTextContent('X');

    const secondSquare = getAllByRole('button')[1];
    fireEvent.click(secondSquare);

    expect(secondSquare).toHaveTextContent('O');
  });
});

describe('<Game /> game ends', () => {
  it('render Winner X when game ends', () => {
    const { getByText, getAllByRole } = render(<Game />);

    const numbers = [0, 6, 1, 7, 2];
    for (let i = 0; i < numbers.length; i++) {
      fireEvent.click(getAllByRole('button')[numbers[i]]);
    }

    const text = getByText(/Winner: X/i);
    expect(text).toBeInTheDocument();
  });

  it('highlight the three squares that caused the win', () => {
    const { getAllByRole } = render(<Game />);

    const numbers = [0, 6, 1, 7, 2];
    for (let i = 0; i < numbers.length; i++) {
      fireEvent.click(getAllByRole('button')[numbers[i]]);
    }

    expect(getAllByRole('button')[0]).toHaveStyle('background-color: yellow');
    expect(getAllByRole('button')[1]).toHaveStyle('background-color: yellow');
    expect(getAllByRole('button')[2]).toHaveStyle('background-color: yellow');
  });

  it('display a message about the result being a draw ', () => {
    const { getByText, getAllByRole } = render(<Game />);

    const numbers = [0, 3, 1, 4, 5, 2, 7, 8, 6];
    for (let i = 0; i < numbers.length; i++) {
      fireEvent.click(getAllByRole('button')[numbers[i]]);
    }

    expect(getByText(/Draw game/i)).toBeInTheDocument();
  });
});

describe('<Game /> time travel feature', () => {
  it('to have reset button', () => {
    const { getByText } = render(<Game />);
    const reset = getByText(/Go to game start/i);
    expect(reset).toBeInTheDocument();
  });

  it('reset game', () => {
    const { getByText, getAllByRole } = render(<Game />);

    fireEvent.click(getAllByRole('button')[0]); // X
    const reset = getByText(/Go to game start/i);
    fireEvent.click(reset);

    expect(getAllByRole('button')[0]).toHaveTextContent('');
  });

  it('go back to the first move', () => {
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

  it('delete past moves', () => {
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

  it('update next player', () => {
    const { getByText, getAllByRole } = render(<Game />);

    fireEvent.click(getAllByRole('button')[0]); // X
    fireEvent.click(getAllByRole('button')[1]); // O
    fireEvent.click(getAllByRole('button')[2]); // X

    const moveOne = getByText(/Go to move #1/i);
    fireEvent.click(moveOne);

    const player = getByText(/Next player: O/i);
    expect(player).toBeInTheDocument();
  });

  it('make font bold at selected move', () => {
    const { getByText, getAllByRole } = render(<Game />);

    fireEvent.click(getAllByRole('button')[0]); // X
    fireEvent.click(getAllByRole('button')[1]); // O

    const moveOne = getByText(/Go to move #2/i);
    fireEvent.click(moveOne);

    expect(moveOne).toHaveStyle('font-weight: bold');
  });

  it('change order of moves history', () => {
    const { getByText, getAllByText, getAllByRole } = render(<Game />);

    fireEvent.click(getAllByRole('button')[0]); // X
    fireEvent.click(getAllByRole('button')[1]); // O

    const toggle = getByText(/toggle moves order/i);
    fireEvent.click(toggle);

    const histories = getAllByText(/Go to/i);
    expect(histories[2]).toHaveTextContent('Go to game start');
  });
});

describe('record clicked cell position', () => {
  test('display selected cell history', () => {
    const { getByText, getAllByRole } = render(<Game />);

    fireEvent.click(getAllByRole('button')[8]); // X

    const row = getByText(/row: 3/i);
    expect(row).toBeInTheDocument();

    const col = getByText(/col: 3/i);
    expect(col).toBeInTheDocument();
  });
});
