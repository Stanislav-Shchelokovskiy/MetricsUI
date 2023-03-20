import React from 'react'
import DownloadButton from './DownloadButton'
import SaveStateButton from '../../common/components/state_management/SaveStateButton'
import StateSelector from '../../common/components/state_management/StateSelector'
import DropStateButton from '../../common/components/state_management/DropStateButton'
import ShareStateButton from '../../common/components/state_management/ShareStateButton'
import { CustomersActivityStore } from '../store/Store'
import AdvancedSettingButton from './AdvancedSettingButton'
import HelpButton from '../../common/components/help/HelpButton'
import { fetchHelp } from '../network_resource_fetcher/FetchHelp'
import MenuButton from './MenuButton'

interface Props {
    showHideMenu: () => void
    menuOpened: boolean
}

export default function Toolbar(props: Props) {
    return (
        < div className='CustomersActivityToolbar'>
            <ToolbarMenu {...props} />
            <ToolbarCommands />
        </div>
    )
}

function ToolbarMenu(props: Props) {
    return <div className='CustomersActivityToolbarMenu'>
        <MenuButton {...props} />
        <AdvancedSettingButton visible={props.menuOpened} />
        <HelpButton
            visible={props.menuOpened}
            className='CustomersActivityHelpButton'
            fetchHelpItems={fetchHelp}
        />
    </div>
}

const ToolbarCommands = React.memo(() => {
    const stateNamesSelector = (state: CustomersActivityStore) => state.viewState.stateKeys
    const stateNameSelector = (state: CustomersActivityStore) => state.viewState.key
    const statePropsSelector = (state: CustomersActivityStore) => {
        return {
            customersActivity: state.customersActivity,
            customersActivitySets: state.customersActivitySets
        }
    }
    const state_salt = 'CustomersActivity_'
    return <div className='CustomersActivityToolbarCommands'>
        <StateSelector
            className='CustomersActivityViewStateSelector'
            stateNamesSelector={stateNamesSelector}
            state_salt={state_salt} />
        <SaveStateButton
            className='CustomersActivitySaveStateButton'
            stateNameSelector={stateNameSelector}
            state_salt={state_salt} />
        <DropStateButton
            className='CustomersActivityDropStateButton'
            stateNamesSelector={stateNamesSelector}
            state_salt={state_salt} />
        <ShareStateButton
            className='CustomersActivityShareStateButton'
            statePropsSelector={statePropsSelector}
            state_salt={state_salt} />
        <div className='CustomersActivityToolbarSeparator'></div>
        <DownloadButton />
    </div>
})
