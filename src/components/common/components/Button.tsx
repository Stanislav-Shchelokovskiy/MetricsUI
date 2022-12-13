import React from 'react'
import { Button as DxButton } from 'devextreme-react/button'

interface Props {
    className: string
    text: string
    icon: string
    disabled: boolean
    render: (() => any) | undefined
    onClick: () => void
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
}
