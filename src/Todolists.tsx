import {Grid} from "@mui/material";
import Paper from "@mui/material/Paper";
import {TodolistItem} from "@/TodolistItem.tsx";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolist} from "@/model/todolists-selectors.ts";

export const Todolists = () => {
    // следит за массивом, чтобы при изменении перерисовывать
    const todolists = useAppSelector(selectTodolist) // пустой обект. useAppSelector  -кастомный хук,принимает колбэк  функцию, которая принимает state и возвращает какую-то его часть todolists



    return (
        <>
            {todolists.map(todolist => {
                return (
                    <Grid key={todolist.id}>
                        <Paper sx={{p: '0 20px 20px 20px'}}>
                            <TodolistItem
                                todolist={todolist}
                            />
                        </Paper>
                    </Grid>
                )
            })}
        </>
    );
};
