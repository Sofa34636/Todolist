import {instance} from "@/common/components/instance/instance.ts";
import {Todolist} from "@/features/todolists/api/todolistsApi.types.ts";
import {BaseResponse} from "@/common/types";

export const todolistsApi = {
    getTodolists() {
        return instance.get<Todolist[]>(`/todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post<BaseResponse<{ item: Todolist }>> // BaseResponse - дженериковый тип
            (`/todo-lists`, {title},)
    },
    deleteTodolist(id: string) {
        return  instance.delete<BaseResponse>(`/todo-lists/${id}`,)
    },
    changeTodolist(id: string, title: string) {
        return  instance.put<BaseResponse>(`/todo-lists/${id}`, {title},)
    },

}