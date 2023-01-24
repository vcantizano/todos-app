import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { clearCompletedTodos } from '../../redux'
import { AppDispatch } from "../../store"
import { GetTodoList } from '../../utils'
import './Footer.css'

const Footer = () => {
    const todoList = GetTodoList()
    const dispatch = useDispatch<AppDispatch>()
    const location = useLocation()

    const todoCount = todoList.filter(todo => !todo.completed)

    return (
        <>
            {todoList.length > 0 && <div className='footer'>
                <div className='todo-count' data-testid="todo-count-div">
                    <strong data-testid="todo-count-text">{`${todoCount.length} item${(todoCount.length===0 || todoCount.length%2===0) ? 's' : ''} left`}</strong>
                </div>
                <div className='filters' data-testid="todo-filters-div">
                    <li>
                        <Link to='/' className={`${location.pathname === "/" ? 'selected' : ''}`} data-testid="todo-link-all">{'All'}</Link>
                        <Link to='/active' className={`${location.pathname === "/active" ? 'selected' : ''}`} data-testid="todo-link-active">{'Active'}</Link>
                        <Link to='/completed' className={`${location.pathname === "/completed" ? 'selected' : ''}`} data-testid="todo-link-completed">{'Completed'}</Link>
                    </li>
                </div>
                <div
                    data-testid="todo-clear-btn"
                    className={`clear-completed${todoList.some(todo => todo.completed) ? '' : ' hidden'}`}
                    onClick={() => dispatch(clearCompletedTodos())}
                >
                        {'Clear completed'}
                </div>
            </div>}
        </>
    )
}

export default memo(Footer)
