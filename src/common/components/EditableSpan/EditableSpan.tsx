import TextField from '@mui/material/TextField'
import {type ChangeEvent, useState} from 'react'

type Props = {
    value: string // принимаем текст
    onChange: (title: string) => void // возвращаем измененный
}

export const EditableSpan = ({ value, onChange }: Props) => {
    const [title, setTitle] = useState(value)
    const [isEditMode, setIsEditMode] = useState(false)

    const turnOnEditMode = () => {
        setIsEditMode(true)
    }

    const turnOffEditMode = () => {
        setIsEditMode(false) // убираем возможность ввода
        onChange(title) // родителю закидываем содержимое     локального стейта
    }

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        <>
            {isEditMode ? (
                <TextField variant={'outlined'}
                           value={title}
                           size={'small'}
                           onChange={changeTitle}
                           onBlur={turnOffEditMode} // вызывается при окончании изменения
                           autoFocus // автоматически ставит курсов
                />
            ) : (
                <span onDoubleClick={turnOnEditMode}>{value} {/* при 2 нажалии меняеи на true */}
            </span>
            )}
        </>
    )
}