import React, { PropsWithChildren, FC } from 'react'
import ToolbarCommands from './ToolbarCommands'
import { ToolbarMenu } from './ToolbarMenu'
import AdvancedSettingsButton, { SettingsProps } from './AdvancedSettings'

export interface ToolbarProps {
    showHideMenu: () => void
    menuOpened: boolean
    settings: FC<SettingsProps> | null
}


export function Toolbar(props: PropsWithChildren<ToolbarProps>) {
    return (
        <div className='Toolbar'>
            <ToolbarMenu {...props}>
                <AdvancedSettingsButton
                    visible={props.menuOpened}
                    customSettings={props.settings} />
                {props.children}
            </ToolbarMenu>
            <ToolbarCommands />
        </div>
    )
}
