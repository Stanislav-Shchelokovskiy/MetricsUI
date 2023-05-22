import React from 'react'
import { Tooltip } from 'devextreme-react/tooltip'
import { Toolbar, ToolbarProps } from '../../common/components/multiset_container/Toolbar/Toolbar'
import { ToolbarMenu } from '../../common/components/multiset_container/Toolbar/ToolbarMenu'
import { ToolbarCommands, ToolbarSeparator } from '../../common/components/multiset_container/Toolbar/ToolbarCommands'
import {FilterTooltip} from './FilterTooltip'


export default function ToolbarWrapper(props: ToolbarProps) {
    return (
        <Toolbar {...props}>
            <ToolbarMenu
                {...props}
                menuButtonTooltip={FilterTooltip}
            >
            </ToolbarMenu >
            <ToolbarCommands />
        </Toolbar>
    )
}
