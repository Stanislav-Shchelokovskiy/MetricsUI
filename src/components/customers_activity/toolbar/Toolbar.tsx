import React from 'react'
import DownloadButton from './DownloadButton'
import StateManagementCommands from '../../common/components/state_management/StateManagementCommands'
import { getShareableState } from '../store/Store'
import AdvancedSettingButton from './AdvancedSettingButton'
import HelpButton from '../../common/components/help/HelpButton'
import { fetchHelp } from '../network_resource_fetcher/FetchHelp'
import GoHomeButton from '../../common/components/HomeButton'
import { Toolbar, ToolbarProps } from '../../common/components/multiset_container/Toolbar/Toolbar'
import { ToolbarMenu } from '../../common/components/multiset_container/Toolbar/ToolbarMenu'
import { FilterTooltip } from './FilterTooltip'
import { ToolbarCommands, ToolbarSeparator } from '../../common/components/multiset_container/Toolbar/ToolbarCommands'


export default function CustomersActivityToolbar(props: ToolbarProps) {
    return (
        <Toolbar {...props}>
            <ToolbarMenu
                {...props}
                menuButtonTooltip={FilterTooltip}
            >
                <AdvancedSettingButton visible={props.menuOpened} />
                <HelpButton
                    visible={props.menuOpened}
                    className='CommandButton'
                    fetchHelpItems={fetchHelp}
                />
            </ToolbarMenu >
            <ToolbarCommandsCached />
        </Toolbar>
    )
}

const ToolbarCommandsCached = React.memo(() => {
    return <ToolbarCommands>
        <StateManagementCommands
            shareableStateSelector={getShareableState}
            stateSalt='CustomersActivity_'
        />
        <ToolbarSeparator />
        <DownloadButton />
        <ToolbarSeparator />
        <GoHomeButton className='CommandButton' />
    </ToolbarCommands>
})
