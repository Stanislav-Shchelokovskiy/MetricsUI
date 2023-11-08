import React, { useRef } from 'react'
import { NumberBox, Button } from 'devextreme-react/number-box'
import { useDispatch } from 'react-redux'
import { PayloadAction } from '@reduxjs/toolkit'
import { ButtonOptions } from './Button'

interface Props {
    className: string | undefined
    step: number,
    min: number | undefined,
    max: number | undefined,
    currentValue: number | undefined,
    defaultValue: number | undefined
    spinDelay: number,
    format: (value: number) => string,
    disabled: boolean,
    placeholder: string
    label: string
    onValueChange: (value: number | undefined) => PayloadAction<any>
    customButtons: Array<ButtonOptions> | undefined
}

export default function NumericSelector(props: Props) {
    const ref = useRef<NumberBox>(null)

    const dispatch = useDispatch()
    let timerId: NodeJS.Timeout | undefined = undefined
    const onValueChange = (value: number | undefined) => {
        if (timerId !== undefined)
            clearTimeout(timerId)
        timerId = setTimeout(() => {
            dispatch(props.onValueChange(value))
            clearTimeout(timerId)
        }, props.spinDelay)
    }

    const resetButtonOptions = {
        text: '',
        stylingMode: 'text',
        icon: 'revert',
        focusStateEnabled: false,
        elementAttr: {
            id: 'resetButton'
        },
        onClick: (e: any) => {
            ref.current?.instance.option('value', props.defaultValue)
        }
    }

    return <NumberBox
        {...props}
        ref={ref}
        defaultValue={props.currentValue}
        showSpinButtons={true}
        useLargeSpinButtons={true}
        onValueChange={onValueChange}
        mode='number'>
        {
            props.customButtons !== undefined ?
                props.customButtons.map(o => <Button
                    key={o.name}
                    name={o.name}
                    location={o.location}
                    options={o} />) :
                null
        }
        <Button name='spins' />
        <Button
            name='reset'
            options={resetButtonOptions} />
    </NumberBox>
}

const defaultProps = {
    className: undefined,
    step: 5,
    min: 0,
    max: undefined,
    defaultValue: undefined,
    format: undefined,
    disabled: false,
    placeholder: undefined,
    customButtons: undefined,
    spinDelay: 1000,
    label: '',
}

NumericSelector.defaultProps = defaultProps
