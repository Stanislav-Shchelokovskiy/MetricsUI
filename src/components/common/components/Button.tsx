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


export function getIncludeButtonOptions(
    isInIncludeState: boolean,
    includeIcon: string,
    excludeIcon: string,
    onIncludeChange: ((include: boolean) => void)
) {
    return {
        text: '',
        stylingMode: 'text',
        type: isInIncludeState ? 'success' : 'danger',
        icon: isInIncludeState ? includeIcon : excludeIcon,
        onClick: (e: any) => {
            if (e.component.option('type') === 'danger') {
                e.component.option('type', 'success')
                e.component.option('icon', includeIcon)
                onIncludeChange(true)
            } else {
                e.component.option('type', 'danger')
                e.component.option('icon', excludeIcon)
                onIncludeChange(false)
            }
        }
    }
}
