import React from 'react'
import AdvancedSettingButton from './AdvancedSettingButton'
import HelpButton from '../../common/components/help/HelpButton'
import { fetchHelp } from '../network_resource_fetcher/FetchHelp'
import { Toolbar, ToolbarProps } from '../../common/components/multiset_container/Toolbar/Toolbar'

export default function SupportMetricsToolbar(props: ToolbarProps) {
    return (
        <Toolbar {...props}>
            <AdvancedSettingButton visible={props.menuOpened} />
            <HelpButton
                visible={props.menuOpened}
                fetchHelpItems={fetchHelp}
            />
        </Toolbar>
    )
}
