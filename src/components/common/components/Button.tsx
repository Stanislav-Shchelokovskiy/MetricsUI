import React from 'react'
import { Button as DxButton } from 'devextreme-react/button'
import * as includeIconSvg from './assets/include.svg'
import * as excludeIconSvg from './assets/exclude.svg'
import * as decomposeIconSvg from './assets/decompose.svg'

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
    stylingMode: 'text',
    focusStateEnabled: false,
    render: undefined,
    onClick: undefined,
    hint: '',
    id: '',
}


type location = 'before' | 'after'
export interface ButtonOptions {
    name: string
    location: location,
    [index: string]: any;
}

export function getIncludeButtonOptions(
    isInIncludeState: boolean,
    onIncludeChange: ((include: boolean) => void),
    name: string = 'include',
    location: location = 'before',
    includeIcon: string = includeIconSvg.default,
    excludeIcon: string = excludeIconSvg.default,
    includeHint: string = '',
    excludeHint: string = '',
    includeState: string = 'success',
    excludeState: string = 'danger',
): ButtonOptions {
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

const defaultOptions = {
    location: 'after' as const,
    text: '',
    stylingMode: 'text',
    type: 'normal',
    hoverStateEnabled: true,
    focusStateEnabled: false,
    activeStateEnabled: false,
    onClick: undefined,
}

export function getClearButtonOptions(): ButtonOptions {
    return {
        ...defaultOptions,
        name: 'customclear',
        icon: 'clear',
    }
}

export function getDecomposeButtonOptions(): ButtonOptions {
    return {
        ...defaultOptions,
        name: 'decomposeValues',
        icon: decomposeIconSvg.default,
    }
}

export function getFavoritesButtonOptions(): ButtonOptions {
    return {
        ...defaultOptions,
        name: 'favorites',
        icon: 'favorites',
    }
}
