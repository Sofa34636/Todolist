import {useDispatch} from "react-redux";
import {AppDispatch} from "../../app/store.ts";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>() // useSelector  - Принимает колбэк  функцию, которая принимает state и возвращает какую-то его часть todolists