import React from 'react'
import AdvancedSettingButton from './AdvancedSettingButton'
import HelpButton from '../../common/components/help/HelpButton'
import { fetchHelp } from '../network_resource_fetcher/FetchHelp'
import { Toolbar, ToolbarProps } from '../../common/components/multiset_container/Toolbar/Toolbar'
import { ToolbarMenu } from '../../common/components/multiset_container/Toolbar/ToolbarMenu'
import { FilterTooltip } from './FilterTooltip'


export default function SupportMetricsToolbar(props: ToolbarProps) {
    return (
        <Toolbar {...props}>
            <ToolbarMenu
                {...props}
                menuButtonTooltip={FilterTooltip}
            >
                <AdvancedSettingButton visible={props.menuOpened} />
                <HelpButton
                    visible={props.menuOpened}
                    fetchHelpItems={fetchHelp}
                />
            </ToolbarMenu >
        </Toolbar>
    )
}
