import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import {changeTodolistFilterAC, FilterValues, Todolist} from "@/features/todolists/model/todolists-reducer.ts";
import {containerSx} from "@/common/styles/container.styles.ts";


type Props = {
    todolist: Todolist
}


export const FilterButtons = ({todolist}:Props) => {

        const {id, filter} = todolist


        const dispatch = useDispatch() // dispatch - функция для отправки actions (инструкций) в редюсер. useDispatch - кастомный хук


        // Меняем фильтр (кнопки All/Active/Completed)
        const changeFilterHandler = (filter: FilterValues) => {
            dispatch(changeTodolistFilterAC({id, filter}))
        }
    return (
        <>
            {/* Кнопки для смены фильтра */}
            <Box sx={containerSx}>
                <Button variant={filter === 'all' ? 'outlined' : 'text'}
                        color={'inherit'}
                        onClick={() => changeFilterHandler('all')}>
                    All
                </Button>
                <Button variant={filter === 'active' ? 'outlined' : 'text'}
                        color={'primary'}
                        onClick={() => changeFilterHandler('active')}>
                    Active
                </Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                        color={'secondary'}
                        onClick={() => changeFilterHandler('completed')}>
                    Completed
                </Button>
            </Box>
        </>
    )
}