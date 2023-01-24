interface ITextInput {
    dataTestId: string,
    value: string,
    handleChange?: React.ChangeEventHandler<HTMLInputElement>,
    className?: string,
    handleBlur?: React.FocusEventHandler<HTMLInputElement>,
    handleKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
}

export default ITextInput