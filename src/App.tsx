import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import type {Task} from "./TodolistItem";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import {Box, createTheme, CssBaseline, Switch, ThemeProvider} from "@mui/material";
import Grid from '@mui/material/Grid'
import {Paper} from "@mui/material";
import {containerSx} from "./TodolistItem.styles.ts";
import {NavButton} from "./NavButton.ts";
import {amber, indigo} from "@mui/material/colors";


export type  FilterValues = "all" | "active" | "completed";

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}
export type TasksState = {
    [todolistId: string]: Task[] // асециативный массив типизируем
}

function App() {
    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolists, setTodolists] = useState<Todolist[]>([ // следит за массивом, что бы при изменении перерисовывать
        {id: todolistId_1, title: 'What to learn', filter: "all"},  // обект
        {id: todolistId_2, title: 'What to buy', filter: "all"},
    ])

    const [tasks, setTasks] = useState<TasksState>({
        [todolistId_1]: [ // отсылка к переменной поэтому []
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: false},
            {id: v1(), title: "JS/TS", isDone: false},
        ],
        [todolistId_2]:
            [
                {id: v1(), title: "Bread", isDone: true},
                {id: v1(), title: "Meet", isDone: false},
                {id: v1(), title: "Milk", isDone: false},
            ]
    })

    //tasks

    const deleteTask = (taskId: Task["id"], todolistId: Todolist["id"]) => { // тип данных берем из  Todolist["id"], todolistId - определяет какой тоду лист
        //create  next state
        // immutable change data
        const nextState = {
            ...tasks, [todolistId]: // ищем по этому ключу нужный лист. из-за того что ключ [todolistId_2] переменная ставим скобки []
                tasks[todolistId] // в этот лист кладем масив тасок, которые получаем в результате фильтрации
                    .filter(t =>  // Берём массив tasks, при клике на Х получаем id задачи и возвращаем новый массив, где остаются только элементы, у которых id не равен id нажатой задачи. при 2 !== 2 например получает false и просто не берет этот элемент в массив
                        t.id !== taskId // taskId - это то что мы нажали, t.id - проход по массиву [1,2,3]
                    )
        }
        //set next state
        setTasks(nextState) // заносим новый массив
    }
    const createTask = (title: Task["title"], todolistId: Todolist["id"]) => {
        const newTask = {id: v1(), title: title, isDone: true}; //  создали обект
        const newTasks = {...tasks, [todolistId]: [...tasks[todolistId], newTask]} // сделали копию массива, сделали копию листа и  после положили новую таску
        setTasks(newTasks)
    }
    const changeTaskStatus = (taskId: Task["id"], newTaskStatus: Task["isDone" ], todolistId: Todolist["id"]) => {
        //create  next state
        // immutable change data
        const nextState = {
            ...tasks, [todolistId]: tasks[todolistId]
                .map(t => t.id === taskId ? {...t, isDone: newTaskStatus} : t)
        }
        //set next state
        setTasks(nextState)
    }
    const changeTaskTitle = (taskId: Task["id"], newTitle: Task["title" ], todolistId: Todolist["id"]) => {
        //create  next state
        // immutable change data
        const nextState = {
            ...tasks, [todolistId]: tasks[todolistId]
                .map(t => t.id === taskId ? {...t, title: newTitle} : t)
        }
        //set next state
        setTasks(nextState)
    }


    // todolist
    const changeTodolistFilter = (filter: FilterValues, todolistId: Todolist["id"]) => {
        const nextState: Todolist[] = todolists.map(t => t.id === todolistId ? {...t, filter} : t)  // в информации о листах проходимся по  массиву  и есили приходящее id === листу,  то копируем массив и меняем в нем filter
        setTodolists(nextState)
    }

    const deleteTodolist = (todolistId: Todolist["id"]) => {
        const nextState: Todolist[] = todolists.filter(t => t.id !== todolistId) //Удаляем сам лист
        setTodolists(nextState)
        const copyTasksState = {...tasks}  // имютабельно копируем
        delete copyTasksState[todolistId] // удаляем таски листа
        setTasks(copyTasksState)
    }

    const createTodolist = (title: string) => {
        const newTodolistId = v1()
        const newTodolist: Todolist = {
            id: newTodolistId,
            title: title,
            filter: "all"
        }
        const nextState: Todolist[] = [...todolists, newTodolist]
        setTodolists(nextState)
        const nextTasksState = {...tasks, [newTodolistId]: []}
        setTasks(nextTasksState)
    }

    const changeTodolistTitle = (newTitle: Todolist["title" ], todolistId: Todolist["id"]) => {
        //create  next state
        // immutable change data
        const nextState: Todolist[] = todolists.map(tl => tl.id === todolistId ? {...tl, title: newTitle} : tl)

        //set next state
        setTodolists(nextState)
    }

    // UI

    const getFilteredTasks = (tasks: Task[], filter: FilterValues): Task[] => {
        let filteredTasks = tasks
        if (filter === "active") {
            filteredTasks = filteredTasks.filter(t => !t.isDone)
        }
        if (filter === "completed") {
            filteredTasks = filteredTasks.filter(t => t.isDone)
        }
        return filteredTasks
    }
    const todolistsComponents = todolists.map(tl => {
        const filteredTasks: Task[] = getFilteredTasks(tasks[tl.id], tl.filter) // Выбираем нужный лист
        return (
            <div>
                <Grid key={tl.id}>
                    <Paper elevation={8} sx={{p: "20px"}}>
                        <TodolistItem

                            todolistId={tl.id}
                            title={tl.title}
                            tasks={filteredTasks} // отправляем уже отфильтрованное
                            filter={tl.filter}

                            changeTaskTitle={changeTaskTitle}
                            deleteTask={deleteTask}
                            changeTodolistFilter={changeTodolistFilter}
                            createTask={createTask}
                            deleteTodolist={deleteTodolist}
                            changeTaskStatus={changeTaskStatus}
                            changeTodolistTitle={changeTodolistTitle}
                        />
                    </Paper>
                </Grid>
            </div>
        )
    })

    const [isLight, setIsLight] = useState<boolean>(false)

    const theme = createTheme({ // какие-то основные стили
        palette: {
            primary: indigo,
            secondary: amber,
            mode: isLight ? "light" : "dark"
        }
    })

    return (
        <div className="app">
            <ThemeProvider theme={theme}> {/* настройка общих стилей*/}
                <CssBaseline/> {/* типо сброс стилей */}
                <AppBar position="static">
                    <Toolbar>
                        <Container maxWidth="lg" sx={containerSx}>

                            <IconButton color="inherit">
                                <MenuIcon/>
                            </IconButton>
                            <Box>
                                <NavButton>Sign in</NavButton>
                                <NavButton>Sign up</NavButton>
                                <NavButton background={theme.palette.primary.light}>FAQ</NavButton>
                                <Switch onChange={() => setIsLight(!isLight)}/>
                            </Box>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="lg">
                    <Grid container sx={{p: "20px 0"}}>
                        <AddItemForm createItem={createTodolist}/> {/*Главная задача дать название листа*/}
                    </Grid>
                    <Grid container spacing={6}>
                        {todolistsComponents}
                    </Grid>

                </Container>
            </ThemeProvider>
        </div>
    )
}

export default App



