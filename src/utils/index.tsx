import { useSelector } from "react-redux"
import { BrowserRouter as Router, useParams } from "react-router-dom"
import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'
import { RootState, store } from '../store'

export const GetTodoList = () => {
    let todoList = useSelector((state: RootState) => state.todoApp)

    const params = useParams()
    if (!!params["*"]) {
        switch (params["*"]) {
            case "active":
                todoList = todoList.filter(todo => !todo.completed)
                break
            case "completed":
                todoList = todoList.filter(todo => todo.completed)
                break
            default:
                break
        }
    }

    return todoList
}

export const renderWithState = (ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>, { route = '/', ...renderOptions } = {}) => {
    window.history.pushState({}, 'Test page', route)
    const Wrapper: React.JSXElementConstructor<{ children: React.ReactElement<any, string | React.JSXElementConstructor<any>> }> =
        ({ children }) => (
        <Provider store={store}>
            <Router>
                {children}
            </Router>
        </Provider>
    )
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}