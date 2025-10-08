import Container from "@mui/material/Container";
import {Grid} from "@mui/material";
import {CreateItemForm} from "@/CreateItemForm.tsx";
import {useDispatch} from "react-redux";
import {
    createTodolistAC,
} from "@/model/todolists-reducer.ts";
import {Todolists} from "@/Todolists.tsx";

export const Main = () => {

    const dispatch = useDispatch() // dispatch - функция для отправки actions (инструкций) в редюсер. useDispatch - кастомный хук


    const createTodolist = (title: string) => {
        dispatch(createTodolistAC(title)) // меняем стейт тудулистов
    }

    return (
        <div>
            <Container maxWidth={'lg'}>
                <Grid container sx={{mb: '30px'}}>
                    <CreateItemForm onCreateItem={createTodolist}/> {/* форма для создания нового тудулиста */}
                </Grid>
                <Grid container spacing={4}>
                    <Todolists/>
                </Grid>
            </Container>
        </div>
    );
};
