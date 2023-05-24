import React from 'react'
import { getShareableState } from '../store/Store'
import StateManagementCommands from '../../common/components/state_management/StateManagementCommands'
import { Toolbar, ToolbarProps } from '../../common/components/multiset_container/Toolbar/Toolbar'
import { ToolbarMenu } from '../../common/components/multiset_container/Toolbar/ToolbarMenu'
import { ToolbarCommands } from '../../common/components/multiset_container/Toolbar/ToolbarCommands'
import { FilterTooltip } from './FilterTooltip'


export default function ToolbarWrapper(props: ToolbarProps) {
    return (
        <Toolbar {...props}>
            <ToolbarMenu
                {...props}
                menuButtonTooltip={FilterTooltip}
            >
            </ToolbarMenu >
            <ToolbarCommandsCached />
        </Toolbar>
    )
}

const ToolbarCommandsCached = React.memo(() => {
    return <ToolbarCommands>
        <StateManagementCommands
            shareableStateSelector={getShareableState}
            stateSalt='CostMetrics_'
        />
    </ToolbarCommands>
})
