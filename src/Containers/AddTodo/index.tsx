import React, { FormEvent, memo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { addTodo, setCheckAll } from "../../redux"
import { GetTodoList } from '../../utils'
import { CheckboxLabel, TextInput } from '../../BaseComponents'
import './AddTodo.css'

const AddTodo = () => {
    const [todoTitle, setTodoTitle] = useState("")
    const [checkedAll, setCheckedAll] = useState(false)

    const dispatch = useDispatch<AppDispatch>();
    const todoList = GetTodoList()

    const handleOnSubmitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!!todoTitle) {
            dispatch(addTodo(todoTitle))
            setTodoTitle("")
        }
    }

    const onLabelClick = () => {
        if (todoList.length > 0) {
            dispatch(setCheckAll(!checkedAll))
            setCheckedAll(!checkedAll)
        }
    }

    return (
        <div className='main'>
            <form data-testid="add-todo-form" onSubmit={handleOnSubmitForm} className='new-todo'>
                <CheckboxLabel
                    inputId='checkbox'
                    checked={checkedAll}
                    inputClass="toggle-all"
                    inputTestId='checkAll-checkbox'
                    labelTestId='checkAll-label'
                    labelOnClick={onLabelClick}
                />
                <TextInput dataTestId='todo-input' value={todoTitle} handleChange={e => setTodoTitle(e.target.value)} />
            </form>
        </div>
    )
}

export default memo(AddTodo)