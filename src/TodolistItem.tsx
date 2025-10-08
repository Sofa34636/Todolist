import {CreateItemForm} from './CreateItemForm'
import {Todolist} from "@/model/todolists-reducer.ts";
import {createTaskAC} from "@/model/tasks-reducer.ts";
import {useDispatch} from "react-redux";
import {TodolistTitle} from "@/TodolistTitle.tsx";
import {Tasks} from "@/Tasks.tsx";
import {FilterButtons} from "@/FilterButtons.tsx";

type Props = {
    todolist: Todolist
}

export const TodolistItem = ({todolist}: Props) => {

    const dispatch = useDispatch() // dispatch - функция для отправки actions (инструкций) в редюсер. useDispatch - кастомный хук

    // Для нового листа получили название и теперь его создаем
    const createTaskHandler = (title: string) => {
        dispatch(createTaskAC({todolistId: todolist.id, title}))        // в функцию создания переддает полученные данные с поля ввода
    }

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            {/* Форма для добавления новой таски */}
            <CreateItemForm onCreateItem={createTaskHandler}/>
            <Tasks todolist={todolist}/>
            <FilterButtons todolist={todolist}/>
        </div>
    )
}


