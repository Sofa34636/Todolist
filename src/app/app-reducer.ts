import {createAction, createReducer} from "@reduxjs/toolkit";

export const changeThemeModeAC = createAction<{ themeMode: ThemeMode }>('app/changeThemeMode') // к чему относится todolist, его тип deleteTodolist. <{id: string}> - сюда можно пизать типизацию парамметров, сейчас тут типизация payload. {type: 'delete_todolist', payload: { id }} as const}


const initialState = {
    themeMode: 'light' as ThemeMode,
}

export const appReducer = createReducer(initialState, builder => {
    builder
        .addCase(changeThemeModeAC, (state, action) => {
            // логика мутабельного изменения стейта при изменении темы
            state.themeMode = action.payload.themeMode;
        })
})

export type ThemeMode = 'dark' | 'light'