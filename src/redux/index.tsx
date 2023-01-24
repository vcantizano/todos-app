import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ITodo } from "../types"
import { v4 as uuidv4 } from "uuid"

const initialState = [] as ITodo[]

const todoAppReducer = createSlice({
    name: "todoApp",
    initialState,
    reducers: {
        addTodo: {
            reducer: (state, action: PayloadAction<ITodo>) => {
                state.push(action.payload)
            },
            prepare: (title: string) => ({
                payload: {
                    id: uuidv4(),
                    title,
                    editing: false,
                    completed: true
                } as ITodo
            }),
        },
        removeTodo(state, action: PayloadAction<string>) {
            const index = state.findIndex(todo => todo.id === action.payload)
            state.splice(index, 1)
        },
        setTodoStatus(state, action: PayloadAction<{ completed: boolean; id: string }>) {
            return state.map(todo => todo.id === action.payload.id ? { ...todo, completed: action.payload.completed } : todo)
        },
        setCheckAll(state, action: PayloadAction<boolean>) {
            state.map(todo => todo.completed = action.payload)
        },
        setTodoTitle(state, action: PayloadAction<{ title: string; id: string }>) {
            return state.map(todo => todo.id === action.payload.id ? { ...todo, title: action.payload.title } : todo)
        },
        setTodoEditingStatus(state, action: PayloadAction<{ editing: boolean; id: string }>) {
            return state.map(todo => todo.id === action.payload.id ? { ...todo, editing: action.payload.editing } : todo)
        },
        clearCompletedTodos(state) {
            return state.filter(todo => !todo.completed)
        },
        reset() {
            return initialState
        }
    }
})

export const { addTodo, removeTodo, setTodoStatus, setCheckAll, setTodoTitle, setTodoEditingStatus, clearCompletedTodos, reset } = todoAppReducer.actions
export default todoAppReducer.reducer