import React, { memo } from 'react'
import { AddTodo, Todos, Footer } from '../../Containers'

const TodoPage = () => {
    return (
        <div className='todoapp' data-testid="todoapp-div">
            <AddTodo />
            <Todos />
            <Footer />
        </div>
    )
}

export default memo(TodoPage)