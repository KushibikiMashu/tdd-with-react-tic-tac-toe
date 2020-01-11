import React from "react";
import {render} from "@testing-library/react";
import Game from "./Game";

test('render Game', () => {
  const { getByText } = render(<Game />)
  const text = getByText(/Next player/i)
  expect(text).toBeInTheDocument()
})
