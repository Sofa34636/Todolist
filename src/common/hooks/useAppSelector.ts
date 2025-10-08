import {useSelector} from "react-redux";
import {RootState} from "../../app/store.ts";

export const useAppSelector = useSelector.withTypes<RootState>() // кастомный хук для типизации  useSelector  - Принимает колбэк  функцию, которая принимает state и возвращает какую-то его часть todolists