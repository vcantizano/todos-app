import { configureStore } from '@reduxjs/toolkit'
import {persistReducer} from "redux-persist"
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "redux";
import { persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import todoAppReducer from '../redux'

const reducers = combineReducers({
  todoApp: todoAppReducer
})

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})


export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store)