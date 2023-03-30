import React from 'react'
import { Button as DxButton } from 'devextreme-react/button'
import * as includeIconSvg from './assets/include.svg'
import * as excludeIconSvg from './assets/exclude.svg'

interface Props {
    className: string
    text: string
    icon: string
    disabled: boolean
    render: ((button: any) => any) | undefined
    onClick: ((e: any) => void) | undefined
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
    onClick: undefined,
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
    isInIncludeState: boolean,
    onIncludeChange: ((include: boolean) => void),
    name: string = 'include',
    location: string = 'before',
    includeIcon: string = includeIconSvg.default,
    excludeIcon: string = excludeIconSvg.default,
    includeHint: string = '',
    excludeHint: string = '',
    includeState: string = 'success',
    excludeState: string = 'danger',
) {
    return {
        name: name,
        className: name,
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

export function getClearButtonOptions() {
    return {
        text: '',
        stylingMode: 'text',
        icon: 'clear',
        type: 'normal',
        hoverStateEnabled: false,
        focusStateEnabled: false,
        activeStateEnabled: false,
        onClick: undefined
    }
}
