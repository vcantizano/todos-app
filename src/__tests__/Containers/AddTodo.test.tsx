import React from 'react'
import { AddTodo } from '../../Containers';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { store } from '../../store';
import { reset } from '../../redux';
import { renderWithState } from '../../utils';

beforeEach(() => {
    store.dispatch(reset())
})

describe("<AddTodo />", () => {
    test("should display a blank addTodo form with label to check all data items as completed", () => {
        renderWithState(<AddTodo />)

        const inputEl = screen.getByTestId("todo-input")
        expect(inputEl).toBeInTheDocument()
        expect(inputEl).toHaveAttribute("type", "text")

        expect(screen.getByTestId("checkAll-label")).toBeInTheDocument()
    })

    test('pass valid todo to input field', () => {
        renderWithState(<AddTodo />)
        const handleSubmit = jest.fn()
 
        const inputEl = screen.getByTestId("todo-input")
        userEvent.type(inputEl, "task #1")
        expect(inputEl).toHaveValue("task #1")

        const formEl = screen.getByTestId("add-todo-form")
        formEl.onsubmit = handleSubmit
        fireEvent.submit(formEl)
        expect(handleSubmit).toHaveBeenCalled()

        const todo = store.getState().todoApp.length
        expect(todo).toBe(1)
    })

    test('pass invalid todo to input field', () => {
        renderWithState(<AddTodo />)
        const handleSubmit = jest.fn()
 
        const inputEl = screen.getByTestId("todo-input")
        userEvent.type(inputEl, "")
        expect(inputEl).toHaveValue("")

        const formEl = screen.getByTestId("add-todo-form")
        formEl.onsubmit = handleSubmit
        fireEvent.submit(formEl)
        expect(handleSubmit).toHaveBeenCalled()

        const todo = store.getState().todoApp.length
        expect(todo).toBe(0)
    })
})