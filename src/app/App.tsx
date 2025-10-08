import './App.css'
import {ThemeProvider} from '@mui/material/styles'

import CssBaseline from '@mui/material/CssBaseline'
import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {selectThemeMode} from "./app-selectors.ts";
import {getTheme} from "../common/theme/theme.ts";
import {Header} from "@/Header.tsx";
import {Main} from "@/app/Main.tsx";





export const App = () => {

     const themeMode = useAppSelector(selectThemeMode) // пустой массив. Достаем таски

    // создаём тему для MUI (здесь настраиваются основные стили)
    const theme = getTheme(themeMode)

    return (
        <ThemeProvider theme={theme}> {/* оборачиваем приложение в тему */}
            <div className={'app'}>
                <CssBaseline/> {/* сбрасываем стили по умолчанию */}
                <Header/>
                <Main/>
            </div>
        </ThemeProvider>
    )
}
