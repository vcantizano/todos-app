import React, { memo, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { CheckboxLabel, TextInput } from '../../BaseComponents';
import { removeTodo, setTodoEditingStatus, setTodoStatus, setTodoTitle } from '../../redux';
import { AppDispatch } from '../../store';
import { GetTodoList } from '../../utils';
import './Todos.css';

const Todos = () => {
    const todoList = GetTodoList()
    const dispatch = useDispatch<AppDispatch>()
    const [defaultTodoList, setDefaultTodoList] = useState(todoList)
    const [updateDefaultTodoList, setUpdateDefaultTodoList] = useState(false)

    useEffect(() => {
        if (updateDefaultTodoList) {
            setDefaultTodoList(todoList)
            setUpdateDefaultTodoList(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [todoList.length, updateDefaultTodoList])
    

    const onHandleClick = (e: React.MouseEvent<HTMLLabelElement, globalThis.MouseEvent>, id: string) => {
        if (e.detail === 2) {
            dispatch(setTodoEditingStatus({ editing: true, id }))
        }
    }

    const saveEdition = (id: string) => {
        dispatch(setTodoEditingStatus({ editing: false, id }))
        setUpdateDefaultTodoList(true)
    }

    const onHandleKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
        if (e.code === "Enter") {
            saveEdition(id)
        }
        else if (e.code === "Escape") {
            const defaultTitle = defaultTodoList.find(todo => todo.id === id)?.title || ''
            dispatch(setTodoTitle({ title: defaultTitle, id }))
            saveEdition(id)
        }
    }

    const handleChangeTodoTitle = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        if (e.target.value === '') {
            dispatch(removeTodo(id))
        }
        else {
            dispatch(setTodoTitle({ title: e.target.value, id }))
        }
    }

    return (
        <>
            <h1 data-testid="todo-title">{"todos"}</h1>
            {todoList.length > 0 && <div className='main todo-list' data-testid="todo-list">
                {todoList.map(todo => (
                    <li key={todo.id} className={`${todo.editing ? 'editing' : ''}`} data-testid={`todo-list-li-${todo.id}`}>
                        {todo.editing ?
                            <TextInput
                                dataTestId={`todo-list-input-${todo.id}`} value={todo.title} className="edit"
                                handleChange={e => handleChangeTodoTitle(e, todo.id)}
                                handleBlur={() => saveEdition(todo.id)}
                                handleKeyDown={e => onHandleKeyPressed(e, todo.id)}
                            /> :
                            <>
                                <CheckboxLabel
                                    inputId='checkbox'
                                    checked={todo.completed}
                                    inputClass="toggle"
                                    inputTestId={`todo-list-checkbox-${todo.id}`}
                                    inputOnChange={() => { dispatch(setTodoStatus({ completed: !todo.completed, id: todo.id })) }}
                                    labelTestId={`todo-list-label-${todo.id}`}
                                    labelOnClick={(e) => onHandleClick(e, todo.id)}
                                >
                                    {todo.title}
                                </CheckboxLabel>
                                <button className='destroy' onClick={() => { dispatch(removeTodo(todo.id)) }} data-testid={`todo-list-removeBtn-${todo.id}`} />
                            </>}
                    </li>
                ))}
            </div>}
        </>
    )
}

export default memo(Todos)