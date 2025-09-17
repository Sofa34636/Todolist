import './App.css'
// import {Button} from "./Button.tsx";
import {FilterValues, Todolist} from "./App.tsx";
import {AddItemForm} from "./AddItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {Button, Checkbox, IconButton, ListItem, List, Box} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {containerSx, getListItemSx} from "./TodolistItem.styles.ts";


export type Task = {
    id: string,
    title: string,
    isDone: boolean,
}

type TodolistItemType = {
    todolistId: Todolist["id"]
    title: Todolist["title"],
    tasks: Task[]
    filter: FilterValues
    data?: string
    deleteTask: (taskId: Task["id"], todolistId: Todolist["id"]) => void // taskId(можно что угодно написать): Task["id"] - тип данных на входе, void(пустота) - тип данных на выходе
    createTask: (title: Task["title"], todolistId: Todolist["id"]) => void
    deleteTodolist: (todolistId: Todolist["id"]) => void
    changeTodolistFilter: (filter: FilterValues, todolistId: Todolist["id"]) => void
    changeTaskStatus: (taskId: Task["id"], newTaskStatus: Task["isDone" ], todolistId: Todolist["id"]) => void
    changeTaskTitle: (taskId: Task["id"], newTitle: Task["title" ], todolistId: Todolist["id"]) => void
    changeTodolistTitle: (newTitle: Todolist["title" ], todolistId: Todolist["id"]) => void
}

export const TodolistItem = (props: TodolistItemType) => {

    const tasksList = props.tasks.length === 0 ? (
        <p>
            тасок нет
        </p>
    ) : (
        <List>
            {props.tasks.map((task, index) => {
                const changeTaskTitleHandler = (title: string) => {
                    props.changeTaskTitle(task.id, title, props.todolistId)
                }// changeTaskStatus - сюда передает новое название, Id таски и Id листа

                return (
                    <ListItem disablePadding key={index}
                              sx={getListItemSx(task.isDone)}>
                        <Box>
                            <Checkbox
                                onChange={(e) => props.changeTaskStatus(task.id, e.target.checked, props.todolistId)}
                                checked={task.isDone}
                                size="small"
                                color="primary"
                            >
                            </Checkbox>
                            <span className={task.isDone ? "task-done" : "task"}>
                            <EditableSpan title={task.title}
                                          changeItemTitle={changeTaskTitleHandler} // changeTaskTitleHandler - сюда приходит новое название
                            />
                        </span>
                        </Box>
                        <IconButton
                            onClick={() => props.deleteTask(task.id, props.todolistId)} // в определенном листе удалить тукую-то таску

                        >
                            <DeleteIcon/>
                        </IconButton>
                    </ListItem>

                )
            })}
        </List>
    )


    const createTaskHandler = (taskTitle: string) => { // Для нового листа получили название и теперь его создаем
        props.createTask(taskTitle, props.todolistId) // в функцию создания переддает полученные данные с поля ввода

    }
    const changeTodolistTitleHandler = (newTitle: string) => props.changeTodolistTitle(newTitle, props.todolistId)
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeItemTitle={changeTodolistTitleHandler}/>
                <Button title="x"/>
                <IconButton onClick={() => props.deleteTodolist(props.todolistId)}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm createItem={createTaskHandler}/> {/*Главная задача дать название листа*/}
            {tasksList}
            <div>
                <Box sx={containerSx}>
                    <Button
                        onClick={() => props.changeTodolistFilter("all", props.todolistId)} // как бы снизу  на верх передаем "all"  пропсы
                        size="small"
                        variant="outlined"
                        color="primary"
                    >All</Button>
                    <Button
                        onClick={() => props.changeTodolistFilter("all", props.todolistId)} // как бы снизу  на верх передаем "all"  пропсы
                        size="small"
                        variant="outlined"
                        color={"primary"}
                    >active</Button>
                    <Button
                        onClick={() => props.changeTodolistFilter("all", props.todolistId)} // как бы снизу  на верх передаем "all"  пропсы
                        size="small"
                        variant="outlined"
                        color="primary"
                    >completed</Button>
                </Box>

            </div>
            <div>{props.data}</div>
        </div>
    )
}


