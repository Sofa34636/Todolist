import {useState} from 'react';
import {TextField} from "@mui/material";


type PropsType = {
    title: string, // принимаем текст
    changeItemTitle: (newTitle: string) => void, // возвращаем измененный
}

export const EditableSpan = ({title, changeItemTitle}: PropsType) => {
    const [isEditMode, SetIsEditMode] = useState<boolean>(false)
    const [itemTitle, setitemTitle] = useState(title)

    const onEditMode = () => {
        SetIsEditMode(true)
    }
    const offEditMode = () => {
        SetIsEditMode(false) // убираем возможность ввода
        changeItemTitle(itemTitle) // родителю закидываем содержимое     локального стейта
    }
    return (
        <div>
            {isEditMode
                ? <TextField
                    variant="standard"
                    autoFocus// автоматически ставит курсов
                    onBlur={offEditMode} // вызывается при окончании изменения
                    value={itemTitle}
                    onChange={(e) => {
                        setitemTitle(e.currentTarget.value)
                    }}
                />


                : <span onDoubleClick={onEditMode}>{title} {/* при 2 нажалии меняеи на true */}
    </span>
            }
        </div>);
};


