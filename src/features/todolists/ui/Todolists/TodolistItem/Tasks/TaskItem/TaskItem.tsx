import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, Task} from "@/features/todolists/model/tasks-reducer.ts";
import type {ChangeEvent} from "react";
import {useDispatch} from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import {getListItemSx} from "./Taskitem.styles.ts";

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