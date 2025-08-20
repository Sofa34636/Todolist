import './App.css'
import {Button} from "./Button.tsx";
import {filterValues} from "./App.tsx";
import {useState} from 'react'


export type Task = {
    id: string,
    title: string,
    isDone: boolean,
}

type TodolistItemType = {
    title: string
    tasks: Task[]
    filter: filterValues
    data?: string
    deleteTask: (taskId: Task["id"]) => void // taskId(можно что угодно написать): Task["id"] - тип данных на входе, void(пустота) - тип данных на выходе
    chengeFilter: (filter: filterValues) => void
    createTask: (title: Task["title"]) => void
    changeTaskStatus: (taskId: Task["id"], newTaskStatus: Task["isDone" ]) => void
}

export const TodolistItem = (props: TodolistItemType) => {
    const [taskTitle, setTaskTitle] = useState('') // управляемый input с помощью useState дает возможность организовывать управления данными полученными от пользователя, еще до их отправки, прорабатывая разные сценарии при вводе
    const [error, setError] = useState(false)

    const createTaskHandler = () => { //обертка, у  нас  есть  приходящие данные в пропсы компоненты
        const trimmedTitle = taskTitle.trim()//  проверка  состоит строка  из одних  пробелов или там  что-то есть , обрезает  пробелы
        if (trimmedTitle) { // если  что-то  есть после обрезания пробелов,  то добавляем
            props.createTask(taskTitle) // в функцию создания переддает полученные данные с поля ввода
        } else {
            setError(true)
        }
        setTaskTitle("")
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    placeholder="max title length 15 characters"
                    value={taskTitle} // из стайда передаем что поьлзователь ввел в поле
                    onChange={(e) =>{
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
                <Button title={"+"}
                        disabled={!taskTitle} // если ничего нет в инпуте, то кнопка не нажимается
                        onClick={createTaskHandler} // сюда передаются  посредники, что бы компонет оставался чистым
                />
                {error && !taskTitle && <div>Please, enter title</div>}
                {taskTitle.length > 15 && (<div style={{color: "red"}}>Title length too long</div>)}
                {!!taskTitle.length && taskTitle.length <= 15 && (
                    <div>Rest amount of charters {15 - taskTitle.length}</div>)}
                {error && <div style={{color: "red"}}>Enter valid title</div> // если много пробелов будет  ошибка
                }

            </div>
            {props.tasks.length === 0 ? (
                <p>
                    тасок нет
                </p>
            ) : (
                <ul>
                    {props.tasks.map((task, index) => {

                        return (
                            <li key={index}>
                                <input
                                    onChange={(e) => props.changeTaskStatus(task.id, e.target.checked)}
                                    type="checkbox" checked={task.isDone}
                                />
                                <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
                                <Button onClick={() => props.deleteTask(task.id)}
                                        title="X"/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button className={props.filter === "all" ? "btn-filter-active" : ""} title={"all"}
                        onClick={() => props.chengeFilter("all")} // как бы снизу  на верх передаем "all"  пропсы
                />
                <Button className={props.filter === "active" ? "btn-filter-active" : ""} title={"active"}
                        onClick={() => props.chengeFilter("active")}/>
                <Button className={props.filter === "completed" ? "btn-filter-active" : ""} title={"completed"}
                        onClick={() => props.chengeFilter("completed")}/>
            </div>
            <div>{props.data}</div>
        </div>
    )
}


