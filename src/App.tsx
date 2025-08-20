import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import type {Task} from "./TodolistItem";
import {v1} from "uuid";

export type  filterValues = "all" | "active" | "completed";

function App() {
    const [filter, setFilter] = useState<filterValues>("all")
    const [tasks, setTasks] = useState<Task[]>([ // следит за массивом, что бы при изменении перерисовывать
        {id: v1(), title: 'HTML&CSS', isDone: true},  // обект
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ])

    // { id: v1(), title: 'What to learn', filter: 'all' },    { id: v1(), title: 'What to buy', filter: 'all' },

    // const [tasks, setTasks] = useState<TasksState>({
    //     [todolistId_1]: [ // отсылка к переменной поэтому []
    //         { id: v1(), title: "HTML", isDone: true },
    //         { id: v1(), title: "CSS", isDone: false },
    //         { id: v1(), title: "JS/TS", isDone: false },
    //     ],
    //     [todolistId_2]:
    //         [
    //             { id: v1(), title: "Bread", isDone: true },
    //             { id: v1(), title: "Meet", isDone: false },
    //             { id: v1(), title: "Milk", isDone: false },
    //         ]
    // })

    const chengeFilter = (filter: filterValues) => {
        setFilter(filter) // перерисовывает если произошли изменения(filter или сделали копию)
    }
    let filteredTasks = tasks
    if (filter === "active") {
        filteredTasks = tasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        filteredTasks = tasks.filter(t => t.isDone)
    }

    const deleteTask = (taskId: Task["id"]) => { // тип данных берем из Task["id"]
        //create  next state
        // immutable change data
        const filteredTasks = tasks.filter(t => { // Берём массив tasks, при клике на Х получаем id задачи и возвращаем новый массив, где остаются только элементы, у которых id не равен id нажатой задачи. при 2 !== 2 например получает false и просто не берет этот элемент в массив
            return t.id !== taskId // taskId - это то что мы нажали, t.id - проход по массиву [1,2,3]
        })
        //set next state
        setTasks(filteredTasks) // заносим новый массив
    }
    const createTask = (title: Task["title"]) => {
        const newTask = {id: v1(), title: title, isDone: true}; //  создали обект
        const newTasks = [newTask, ...tasks] // сделали копию массива и  перед ним  положили новую таску
        setTasks(newTasks)
    }
    const changeTaskStatus = (taskId: Task["id"], newTaskStatus: Task["isDone" ]) => {
        //create  next state
        // immutable change data
        const nextState = tasks.map(t => t.id === taskId ? {...t, isDone: newTaskStatus} : t)
        //set next state
        setTasks(nextState)
    }
    return (
        <div className="app">
            <TodolistItem title={"Helloy"}
                          tasks={filteredTasks} // отправляем уже отфильтрованное
                          deleteTask={deleteTask}
                          filter={filter}
                          chengeFilter={chengeFilter}
                          createTask={createTask}
                          changeTaskStatus={changeTaskStatus}
            />
        </div>
    )
}

export default App



