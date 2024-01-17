import React from 'react'
import { useDispatch } from 'react-redux'
import { PayloadAction } from '@reduxjs/toolkit'
import { CheckBox } from 'devextreme-react/check-box'

interface Props {
    text: string
    defaultValue: boolean | null | undefined
    onValueChange: (value: boolean | null | undefined) => PayloadAction<any>
}

export default function ThreeStateSelectorSelector(props: Props) {
    const dispatch = useDispatch()
    const onValueChange = (value: boolean | null | undefined) => {
        dispatch(props.onValueChange(value))
    }
    return <CheckBox
        className='ThreeStateSelectorSelector'
        text={props.text}
        defaultValue={props.defaultValue}
        onValueChange={onValueChange}
        enableThreeStateBehavior={true}
        stylingMode='filled'
    />
}
