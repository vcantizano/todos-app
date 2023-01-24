import React, { FC, memo } from 'react'
import { ICheckboxLabel } from '../../types'
import './CheckboxLabel.css'

const CheckboxLabel: FC<ICheckboxLabel> = ({ inputId, checked, inputClass, inputTestId, inputOnChange = () => {}, labelTestId, labelOnClick, children }) => (
    <>
        <input id={inputId} type="checkbox" checked={checked} onChange={inputOnChange} className={inputClass} data-testid={inputTestId} aria-checked={checked} />
        <label htmlFor={inputId} data-testid={labelTestId} onClick={labelOnClick}>{children}</label>
    </>
)

export default memo(CheckboxLabel)