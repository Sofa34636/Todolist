export type FieldError = {
    error: string
    field: string
}

export type BaseResponse <T = {}> = { // BaseResponse - дженериковый тип
    data: T
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
}
