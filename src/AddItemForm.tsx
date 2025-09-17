import {useState} from 'react';
import {IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {TextField} from "@mui/material";


type PropsType = {
    createItem: (title: string) => void
}

export const AddItemForm = ({createItem}: PropsType) => {
    const [taskTitle, setTaskTitle] = useState('') // управляемый input с помощью useState дает возможность организовывать управления данными полученными от пользователя, еще до их отправки, прорабатывая разные сценарии при вводе
    const [error, setError] = useState(false)

    const createTaskHandler = () => { //обертка, у  нас  есть  приходящие данные в пропсы компоненты
        const trimmedTitle = taskTitle.trim()//  проверка  состоит строка  из одних  пробелов или там  что-то есть , обрезает  пробелы
        if (trimmedTitle) { // если  что-то  есть после обрезания пробелов,  то добавляем
            createItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTaskTitle("")
    }

    return (
        <div>
            <TextField
                size="small"
                variant="outlined"

                placeholder="max title length 15 characters"
                value={taskTitle} // из стайда передаем что поьлзователь ввел в поле
                onChange={(e) => {
                    error && setError(false)
                    setTaskTitle(e.currentTarget.value)
                }} // получаем значение из поля и складываем в стейт, каждйк раз перересовка всего при вводе каждого символа
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        createTaskHandler()
                    }
                }}
                className={error ? "taskInputError" : ""}
            />

            <IconButton
                disabled={!taskTitle} // если ничего нет в инпуте, то кнопка не нажимается
                onClick={createTaskHandler} // сюда передаются  посредники, что бы компонет оставался чистым
            >
                <AddIcon/>
            </IconButton>
            {error && !taskTitle && <div>Please, enter title</div>}
            {taskTitle.length > 15 && (<div style={{color: "red"}}>Title length too long</div>)}
            {!!taskTitle.length && taskTitle.length <= 15 && (
                <div>Rest amount of charters {15 - taskTitle.length}</div>)}
            {error && <div style={{color: "red"}}>Enter valid title</div> // если много пробелов будет  ошибка
            }

        </div>
    );
};

