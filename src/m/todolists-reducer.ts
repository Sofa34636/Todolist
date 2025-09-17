import {Todolist} from "../App.tsx";

export type DeleteTodoListAT = ReturnType<typeof DeleteTodoListAC> //
type ActionType = DeleteTodoListAT

export const todolistsReducer = (todolists: Todolist[], action: ActionType): Todolist[]=>{

    switch (action.type) {
        case "delete_todolist":
            return todolists.filter(t => t.id !== action.payload.id) //Удаляем сам лист
            default:
                return todolists // если что-то не так просто верни лист
    }
}

export  const DeleteTodoListAC = (id:string) =>({
    type: "delete_todolist",
    payload: {
        id: id,
    }
}as const)