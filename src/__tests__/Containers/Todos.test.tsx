import React from 'react'
import { screen, fireEvent } from '@testing-library/react';

import { Todos } from '../../Containers';
import { addTodo, reset } from '../../redux';
import { store } from '../../store';
import { renderWithState } from '../../utils';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
    store.dispatch(reset())
})

describe("<Todos />", () => {
    test("should display a default Todos without elements", () => {
        renderWithState(<Todos />)
        
        const todoTitleEl = screen.getByTestId("todo-title")
        expect(todoTitleEl).toBeInTheDocument()
        
        expect(screen.queryByTestId("todo-list")).toBeNull()
    })
    
    test("should display a default Todos with elements", () => {
        store.dispatch(addTodo("task #1"))
        const todoList = store.getState().todoApp
        const todoLength = todoList.length
        expect(todoLength).toBe(1)

        renderWithState(<Todos />)
        
        expect(screen.getByTestId("todo-title")).toBeInTheDocument()
        expect(screen.getByTestId("todo-list")).toBeInTheDocument()

        const firstTodo = todoList.find(todo => todo.title === "task #1")
        const liEl = screen.getByTestId(`todo-list-li-${firstTodo?.id}`)
        expect(liEl).toBeInTheDocument()
        expect(liEl).not.toHaveClass("editing")

        expect(screen.queryByTestId(`todo-list-input-${firstTodo?.id}`)).toBeNull()

        const checkboxEl = screen.getByTestId(`todo-list-checkbox-${firstTodo?.id}`)
        expect(checkboxEl).toBeInTheDocument()
        expect(checkboxEl).toBeChecked()

        const labelEl = screen.getByTestId(`todo-list-label-${firstTodo?.id}`)
        expect(labelEl).toBeInTheDocument()
        expect(labelEl.textContent).toBe(firstTodo?.title)

        const destroyBtnEl = screen.getByTestId(`todo-list-removeBtn-${firstTodo?.id}`)
        expect(destroyBtnEl).toBeInTheDocument()
    })

    test("should display Todos, uncheck todo item", () => {
        store.dispatch(addTodo("task #1"))
        const todoList = store.getState().todoApp
        const todoLength = todoList.length
        expect(todoLength).toBe(1)

        renderWithState(<Todos />)

        const firstTodo = todoList.find(todo => todo.title === "task #1")
        const labelEl = screen.getByTestId(`todo-list-label-${firstTodo?.id}`)
        userEvent.click(labelEl)
        const checkboxEl = screen.getByTestId(`todo-list-checkbox-${firstTodo?.id}`)
        expect(checkboxEl).not.toBeChecked()
    })

    test("should display Todos, edit todo item on Enter pressed", () => {
        store.dispatch(addTodo("task #1"))
        const todoList = store.getState().todoApp
        const todoLength = todoList.length
        expect(todoLength).toBe(1)

        renderWithState(<Todos />)

        const firstTodo = todoList.find(todo => todo.title === "task #1")
        let labelEl = screen.getByTestId(`todo-list-label-${firstTodo?.id}`)
        userEvent.dblClick(labelEl)
        expect(screen.queryByTestId(`todo-list-checkbox-${firstTodo?.id}`)).toBeNull()
        
        let inputEl = screen.getByTestId(`todo-list-input-${firstTodo?.id}`)
        expect(inputEl).toBeInTheDocument()

        userEvent.type(inputEl, " edited")
        expect(inputEl).toHaveValue(`${firstTodo?.title} edited`)

        fireEvent.keyDown(inputEl, { key: 'Enter', code: 'Enter', charCode: 13 })
        expect(screen.queryByTestId(`todo-list-input-${firstTodo?.id}`)).toBeNull()
        labelEl = screen.getByTestId(`todo-list-label-${firstTodo?.id}`)
        expect(labelEl).toBeInTheDocument()
        expect(labelEl.textContent).toBe(`${firstTodo?.title} edited`)
    })

    test("should display Todos, edit todo item on Blur", () => {
        store.dispatch(addTodo("task #1"))
        const todoList = store.getState().todoApp
        const todoLength = todoList.length
        expect(todoLength).toBe(1)

        renderWithState(<Todos />)

        const firstTodo = todoList.find(todo => todo.title === "task #1")
        let labelEl = screen.getByTestId(`todo-list-label-${firstTodo?.id}`)
        userEvent.dblClick(labelEl)
        expect(screen.queryByTestId(`todo-list-checkbox-${firstTodo?.id}`)).toBeNull()
        
        let inputEl = screen.getByTestId(`todo-list-input-${firstTodo?.id}`)
        expect(inputEl).toBeInTheDocument()

        userEvent.type(inputEl, " edited")
        expect(inputEl).toHaveValue(`${firstTodo?.title} edited`)

        fireEvent.blur(inputEl)
        expect(screen.queryByTestId(`todo-list-input-${firstTodo?.id}`)).toBeNull()
        labelEl = screen.getByTestId(`todo-list-label-${firstTodo?.id}`)
        expect(labelEl).toBeInTheDocument()
        expect(labelEl.textContent).toBe(`${firstTodo?.title} edited`)
    })

    test("should display Todos, edit todo item and press Esc (no changes made)", () => {
        store.dispatch(addTodo("task #1"))
        const todoList = store.getState().todoApp
        const todoLength = todoList.length
        expect(todoLength).toBe(1)

        renderWithState(<Todos />)

        const firstTodo = todoList.find(todo => todo.title === "task #1")
        let labelEl = screen.getByTestId(`todo-list-label-${firstTodo?.id}`)
        userEvent.dblClick(labelEl)
        expect(screen.queryByTestId(`todo-list-checkbox-${firstTodo?.id}`)).toBeNull()
        
        let inputEl = screen.getByTestId(`todo-list-input-${firstTodo?.id}`)
        expect(inputEl).toBeInTheDocument()

        userEvent.type(inputEl, " edited")
        expect(inputEl).toHaveValue(`${firstTodo?.title} edited`)

        fireEvent.keyDown(inputEl, { key: 'Escape', code: 'Escape', charCode: 27 })
        expect(screen.queryByTestId(`todo-list-input-${firstTodo?.id}`)).toBeNull()
        labelEl = screen.getByTestId(`todo-list-label-${firstTodo?.id}`)
        expect(labelEl).toBeInTheDocument()
        expect(labelEl.textContent).toBe(firstTodo?.title)
    })

    test("should display Todos, edit todo item with empty value (removes element)", () => {
        store.dispatch(addTodo("task #1"))
        const todoList = store.getState().todoApp
        const todoLength = todoList.length
        expect(todoLength).toBe(1)

        renderWithState(<Todos />)

        const firstTodo = todoList.find(todo => todo.title === "task #1")
        let labelEl = screen.getByTestId(`todo-list-label-${firstTodo?.id}`)
        userEvent.dblClick(labelEl)
        expect(screen.queryByTestId(`todo-list-checkbox-${firstTodo?.id}`)).toBeNull()
        
        let inputEl = screen.getByTestId(`todo-list-input-${firstTodo?.id}`)
        expect(inputEl).toBeInTheDocument()

        fireEvent.change(inputEl, { target: { value: '' }})
        expect(screen.queryByTestId("todo-list")).toBeNull()
        expect(store.getState().todoApp.length).toBe(0)
    })

    test("should display Todos, remove todo item with button", () => {
        store.dispatch(addTodo("task #1"))
        const todoList = store.getState().todoApp
        const todoLength = todoList.length
        expect(todoLength).toBe(1)

        renderWithState(<Todos />)

        const firstTodo = todoList.find(todo => todo.title === "task #1")
        let removeBtnEl = screen.getByTestId(`todo-list-removeBtn-${firstTodo?.id}`)
        userEvent.click(removeBtnEl)
        expect(screen.queryByTestId("todo-list")).toBeNull()
        expect(store.getState().todoApp.length).toBe(0)
    })
})