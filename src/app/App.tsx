import styles from "./App.module.css"
import {ThemeProvider} from '@mui/material/styles'

import CssBaseline from '@mui/material/CssBaseline'
import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {selectThemeMode} from "./app-selectors.ts";
import {getTheme} from "../common/theme/theme.ts";
import {Header} from "@/common/components/Header/Header.tsx";
import {Main} from "@/app/Main.tsx";





export const App = () => {

     const themeMode = useAppSelector(selectThemeMode) // пустой массив. Достаем таски

    // создаём тему для MUI (здесь настраиваются основные стили)
    const theme = getTheme(themeMode)

    return (
        <ThemeProvider theme={theme}> {/* оборачиваем приложение в тему */}
            <div className={styles.app}>
                <CssBaseline/> {/* сбрасываем стили по умолчанию */}
                <Header/>
                <Main/>
            </div>
        </ThemeProvider>
    )
}
