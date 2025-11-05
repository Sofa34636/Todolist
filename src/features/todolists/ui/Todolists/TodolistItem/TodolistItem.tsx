import {CreateItemForm} from '@/common/components/CreateItemForm/CreateItemForm.tsx'
import {Todolist} from "@/features/todolists/model/todolists-reducer.ts";
import {createTaskAC} from "@/features/todolists/model/tasks-reducer.ts";
import {useDispatch} from "react-redux";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle.tsx";
import {Tasks} from "./Tasks/Tasks.tsx";
import {FilterButtons} from "./FilterButtons/FilterButtons.tsx";

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


