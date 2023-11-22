import React, { PropsWithChildren } from 'react'
import ToolbarCommands from './ToolbarCommands'
import { ToolbarMenu } from './ToolbarMenu'
import AdvancedSettingsButton from './AdvancedSettings'

export interface ToolbarProps {
    showHideMenu: () => void
    menuOpened: boolean
}

export function Toolbar(props: PropsWithChildren<ToolbarProps>) {
    return (
        <div className='Toolbar'>
            <ToolbarMenu {...props}>
                <AdvancedSettingsButton visible={props.menuOpened} />
                {props.children}
            </ToolbarMenu>
            <ToolbarCommands />
        </div>
    )
}
