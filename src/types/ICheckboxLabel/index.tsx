interface ICheckboxLabel {
    inputId: string,
    checked: boolean,
    inputClass: string,
    inputTestId: string,
    inputOnChange?: () => void,
    labelTestId: string,
    labelOnClick: React.MouseEventHandler<HTMLLabelElement>,
    children?: React.ReactNode
}

export default ICheckboxLabel