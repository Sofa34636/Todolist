import ListItem from "@mui/material/ListItem";
import {getListItemSx} from "@/TodolistItem.styles.ts";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "@/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "@/model/tasks-reducer.ts";
import type {ChangeEvent} from "react";
import {useDispatch} from "react-redux";
import {Todolist} from "@/model/todolists-reducer.ts";

type Props = {
    task: Task
    todolistId: string
}

export const TaskItem = ({task, todolistId}:Props) =>{
    const dispatch = useDispatch() // dispatch - функция для отправки actions (инструкций) в редюсер. useDispatch - кастомный хук

    // удалить конкретную таску из конкретного тудулиста
    const deleteTaskHandler = () => {
        // тип данных берём из Todolist["id"], todolistId определяет, из какого тудулиста удалить
        dispatch(deleteTaskAC({todolistId, taskId: task.id}))
    }

    // сменить статус конкретной таски (checkbox)
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC({todolistId, taskId: task.id, isDone: newStatusValue}))

    }

    // сменить название конкретной таски
    const changeTaskTitleHandler = (title: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId: task.id, title}))  // сюда передает новое название, Id таски и Id листа

    }

    return (
        <ListItem  sx={getListItemSx(task.isDone)}>
            <div>
                {/* Чекбокс для статуса */}
                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                {/* Редактируемое название таски */}
                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
            </div>
            {/* Кнопка удалить таску */}
            <IconButton onClick={deleteTaskHandler}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    )
}