type ButtonType = {
    title: string
    onClick?:()=>void
    disabled?: boolean
    className?: string
}

export const Button = (props: ButtonType) => {
    return  <button
        className={props.className}
        disabled={props.disabled}
        onClick={props.onClick}>{props.title}</button>

}
