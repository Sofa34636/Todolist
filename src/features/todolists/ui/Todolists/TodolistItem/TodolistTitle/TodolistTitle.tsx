
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx";
import { IconButton } from "@mui/material";
import {changeTodolistTitleAC, deleteTodolistAC, Todolist} from "@/features/todolists/model/todolists-reducer.ts";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import styles from "./TodolistTitle.module.css"


type Props = {
    todolist: Todolist
}


export const TodolistTitle = ({todolist}: Props) => {
    const  {id, title} = todolist

    const dispatch = useAppDispatch() // dispatch - функция для отправки actions (инструкций) в редюсер. useDispatch - кастомный хук

// Удаляем сам тудулист
    const deleteTodolistHandler = () => {
        dispatch(deleteTodolistAC({id})) // удаляем тудулист

    }
    // Меняем название тудулиста
    const changeTodolistTitleHandler = (title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))

    }

    // @ts-ignore
    return (
        <div className={styles.container}>
            <h3>
                {/* EditableSpan - редактируемое название списка */}
                <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
            </h3>
            {/* Кнопка удалить весь тудулист */}
            <IconButton onClick={deleteTodolistHandler}>
                <DeleteIcon />
            </IconButton>
        </div>
    );
};
