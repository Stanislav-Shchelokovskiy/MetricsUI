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

export interface ButtonOptions {
    name: string
    location: string,
    text: string
    type: string
    icon: string
    hint: string
    onClick: (e: any) => void
}

export function getIncludeButtonOptions(
    name: string,
    location: string,
    isInIncludeState: boolean,
    includeIcon: string,
    excludeIcon: string,
    onIncludeChange: ((include: boolean) => void),
    includeHint: string = '',
    excludeHint: string = '',
    includeState: string = 'success',
    excludeState: string = 'danger',
) {
    return {
        name: name,
        location: location,
        text: '',
        stylingMode: 'text',
        type: isInIncludeState ? includeState : excludeState,
        icon: isInIncludeState ? includeIcon : excludeIcon,
        hint: isInIncludeState ? includeHint : excludeHint,
        onClick: (e: any) => {
            if (e.component.option('type') === excludeState) {
                e.component.option('type', includeState)
                e.component.option('icon', includeIcon)
                onIncludeChange(true)
            } else {
                e.component.option('type', excludeState)
                e.component.option('icon', excludeIcon)
                onIncludeChange(false)
            }
        }
    }
}
