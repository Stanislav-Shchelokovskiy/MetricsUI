import React from 'react'
import { Button as DxButton } from 'devextreme-react/button'

interface Props {
    className: string
    text: string
    icon: string
    disabled: boolean
    render: ((button: any) => any) | undefined
    onClick: () => void
    hint: string
    id: string
}

export default function Button(props: Props) {
    return (
        <DxButton
            {...props}
        />
    )
}

Button.defaultProps = {
    className: '',
    text: '',
    icon: '',
    disabled: false,
    type: 'normal',
    stylingMode: 'outlined',
    focusStateEnabled: false,
    render: undefined,
    hint: '',
    id: '',
}
