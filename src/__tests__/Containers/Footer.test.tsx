import { screen } from "@testing-library/react"

import { Footer } from '../../Containers'
import { renderWithState } from '../../utils'
import { store } from '../../store'
import { addTodo, reset, setTodoStatus } from '../../redux'

beforeEach(() => {
    store.dispatch(reset())
})

describe("<Footer />", () => {
    test("should display a default Footer without elements", () => {
        renderWithState(<Footer />)
        expect(screen.queryByTestId("todo-count-div")).toBeNull()
    })

    test("should display a default Footer with elements", () => {
        store.dispatch(addTodo("task #1"))
        const todo = store.getState().todoApp.length
        expect(todo).toBe(1)
        
        renderWithState(<Footer />)

        expect(screen.getByTestId("todo-count-div")).toBeInTheDocument()
        const todoCountTextEl = screen.getByTestId("todo-count-text")
        expect(todoCountTextEl).toBeInTheDocument()
        const todoCount = store.getState().todoApp.filter(todo => !todo.completed)
        expect(todoCountTextEl.textContent).toEqual(`${todoCount.length} item${(todoCount.length===0 || todoCount.length%2===0) ? 's' : ''} left`)

        expect(screen.getByTestId("todo-filters-div")).toBeInTheDocument()
        expect(screen.getByTestId("todo-link-all")).toHaveClass("selected")
        expect(screen.getByTestId("todo-link-active")).not.toHaveClass("selected")
        expect(screen.getByTestId("todo-link-completed")).not.toHaveClass("selected")

        expect(screen.getByTestId("todo-clear-btn")).toBeInTheDocument()
    })
    
    test("should display a default Footer with /active route", () => {
        store.dispatch(addTodo("task #1"))
        const todo = store.getState().todoApp.length
        expect(todo).toBe(1)
        store.dispatch(setTodoStatus({ completed: false, id: store.getState().todoApp[0].id }))
        
        renderWithState(<Footer />, { route: '/active' })

        expect(screen.getByTestId("todo-count-div")).toBeInTheDocument()
        const todoCountTextEl = screen.getByTestId("todo-count-text")
        expect(todoCountTextEl).toBeInTheDocument()
        const todoCount = store.getState().todoApp.filter(todo => !todo.completed)
        expect(todoCountTextEl.textContent).toEqual(`${todoCount.length} item${(todoCount.length===0 || todoCount.length%2===0) ? 's' : ''} left`)

        expect(screen.getByTestId("todo-filters-div")).toBeInTheDocument()
        expect(screen.getByTestId("todo-link-all")).not.toHaveClass("selected")
        expect(screen.getByTestId("todo-link-active")).toHaveClass("selected")
        expect(screen.getByTestId("todo-link-completed")).not.toHaveClass("selected")

        expect(screen.getByTestId("todo-clear-btn")).toBeInTheDocument()
    })
    
    test("should display a default Footer with /completed route", () => {
        store.dispatch(addTodo("task #1"))
        const todo = store.getState().todoApp.length
        expect(todo).toBe(1)
        
        renderWithState(<Footer />, { route: '/completed' })

        expect(screen.getByTestId("todo-count-div")).toBeInTheDocument()
        const todoCountTextEl = screen.getByTestId("todo-count-text")
        expect(todoCountTextEl).toBeInTheDocument()
        const todoCount = store.getState().todoApp.filter(todo => !todo.completed)
        expect(todoCountTextEl.textContent).toEqual(`${todoCount.length} item${(todoCount.length===0 || todoCount.length%2===0) ? 's' : ''} left`)

        expect(screen.getByTestId("todo-filters-div")).toBeInTheDocument()
        expect(screen.getByTestId("todo-link-all")).not.toHaveClass("selected")
        expect(screen.getByTestId("todo-link-active")).not.toHaveClass("selected")
        expect(screen.getByTestId("todo-link-completed")).toHaveClass("selected")

        expect(screen.getByTestId("todo-clear-btn")).toBeInTheDocument()
    })
})