import React from 'react'
import { SUPPORT_METRICS_END_POINT } from '../../common/EndPoint'
import { getShareableState } from '../../common/store/multiset_container/Store'
import StateManagementCommands from '../../common/components/state_management/StateManagementCommands'
import { Toolbar, ToolbarProps } from '../../common/components/multiset_container/Toolbar/Toolbar'
import { ToolbarMenu } from '../../common/components/multiset_container/Toolbar/ToolbarMenu'
import { ToolbarCommands, ToolbarSeparator } from '../../common/components/multiset_container/Toolbar/ToolbarCommands'
import DownloadButton from '../../common/components/DownloadButton'
import GoHomeButton from '../../common/components/HomeButton'
import { FilterTooltip } from './FilterTooltip'
import { fetchCostMetricsRaw } from '../network_resource_fetcher/CostMetricsRaw'


export default function CostMetricsToolbar(props: ToolbarProps) {
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
            endPoint={SUPPORT_METRICS_END_POINT}
        />
        <ToolbarSeparator />
        <DownloadButton fetchData={fetchCostMetricsRaw} />
        <ToolbarSeparator />
        <GoHomeButton className='CommandButton' />
    </ToolbarCommands>
})
