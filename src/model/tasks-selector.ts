import {RootState} from "../app/store.ts";
import {TasksState} from "@/model/tasks-reducer.ts";

export const selectTasks =(state: RootState): TasksState=> state.tasks // Сделано за пределами функции что бы при перересовке компоненты они не пересоздавались
