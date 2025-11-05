
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}
export type FilterValues = 'all' | 'active' | 'completed'


export const deleteTodolistAC = createAction<{ id: string }>('todolist/deleteTodolist') // к чему относится todolist, его тип deleteTodolist. <{id: string}> - сюда можно пизать типизацию парамметров, сейчас тут типизация payload. {type: 'delete_todolist', payload: { id }} as const}
export const changeTodolistTitleAC = createAction<{ id: string, title: string }>('todolist/changeTodolistTitle')
export const changeTodolistFilterAC = createAction<{
    id: string,
    filter: FilterValues
}>('todolist/changeTodolistFilter')

export const createTodolistAC = createAction('todolist/createTodolist', (title: string) => {
    return {payload: {title, id: nanoid()}}
})

const initialState: Todolist[] = []

export const todolistsReducer = createReducer(initialState, (builder) => {
    builder.addCase(deleteTodolistAC, (state, action) => {
        const index = state.findIndex(todo => todo.id === action.payload.id) // из документации. Больше не копируем имютабельно, она под копотом
        if (index !== -1) state.splice(index, 1) // если не находит возвращает -1, если находит то цифру массива
    })
        .addCase(createTodolistAC, (state, action) => {
            state.push({id: action.payload.id, title: action.payload.title, filter: 'all'})
        })
        .addCase(changeTodolistTitleAC, (state, action) => {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            if (index !== -1) state[index].title = action.payload.title
        })
        .addCase(changeTodolistFilterAC, (state, action) => {
            const todolist = state.find(todo => todo.id === action.payload.id)
            if (todolist) todolist.title = action.payload.filter
        })
})


