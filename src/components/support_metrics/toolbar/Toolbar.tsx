import React from 'react'
import HelpButton from '../../common/components/help/HelpButton'
import { fetchHelp } from '../network_resource_fetcher/Help'
import { Toolbar, ToolbarProps } from '../../common/components/multiset_container/Toolbar/Toolbar'

export default function SupportMetricsToolbar(props: ToolbarProps) {
    return (
        <Toolbar {...props}>
            <HelpButton
                visible={props.menuOpened}
                fetchHelpItems={fetchHelp}
            />
        </Toolbar>
    )
}
