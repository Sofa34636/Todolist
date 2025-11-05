import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {NavButton} from "@/common/components/NavButton/NavButton.ts";
import Switch from "@mui/material/Switch";
import {changeThemeModeAC} from "@/app/app-reducer.ts";
import {useDispatch} from "react-redux";
import {getTheme} from "@/common/theme/theme.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectThemeMode} from "@/app/app-selectors.ts";
import {containerSx} from "@/common/styles/container.styles.ts";

export const Header = () => {
    const themeMode = useAppSelector(selectThemeMode) // пустой массив. Достаем таски
    const dispatch = useDispatch() // dispatch - функция для отправки actions (инструкций) в редюсер. useDispatch - кастомный хук

    // создаём тему для MUI (здесь настраиваются основные стили)
    const theme = getTheme(themeMode)


// переключаем тему (светлая/тёмная)
    const changeMode = () => {

        dispatch(changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}))
    }
    return (
        <AppBar position="static" sx={{mb: '30px'}}>
            <Toolbar>
                <Container maxWidth={'lg'} sx={containerSx}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <NavButton>Sign in</NavButton>
                        <NavButton>Sign up</NavButton>
                        <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                        <Switch color={'default'} onChange={changeMode}/>
                    </div>
                </Container>
            </Toolbar>
        </AppBar>
    )

}