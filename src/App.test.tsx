import React from 'react';
import App from './App';
import { renderWithState } from './utils';

describe("<App />", () => {
  test("should display a App component", () => {
    renderWithState(<App />)
  })
})
