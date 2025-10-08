import {RootState} from "../app/store.ts";
import {Todolist} from "@/model/todolists-reducer.ts";

export const selectTodolist =(state: RootState): Todolist[]=> state.todolists // Сделано за пределами функции что бы при перересовке компоненты они не пересоздавались
