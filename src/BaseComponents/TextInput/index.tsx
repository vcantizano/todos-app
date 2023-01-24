import React, { FC, memo } from 'react'
import { ITextInput } from '../../types'
import './TextInput.css'

const TextInput: FC<ITextInput> = ({ dataTestId, value, handleChange = () => {}, className, handleBlur, handleKeyDown }) => (
    <input
        type="text" data-testid={dataTestId} autoFocus
        value={value} onChange={handleChange} className={className}
        onBlur={handleBlur} onKeyDown={handleKeyDown}
    />
)

export default memo(TextInput)