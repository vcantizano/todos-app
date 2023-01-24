import React from 'react'
import { renderWithState } from '../../utils';
import { TodoPage } from '../../Pages';
import { screen } from '@testing-library/react';
import { store } from '../../store';
import { reset } from '../../redux';

beforeEach(() => {
    store.dispatch(reset())
})

describe("<TodoPage />", () => {
    test("should display a TodoPage component", () => {
        renderWithState(<TodoPage />)

        const divEl = screen.getByTestId("todoapp-div")
        expect(divEl).toBeInTheDocument()
    })
})