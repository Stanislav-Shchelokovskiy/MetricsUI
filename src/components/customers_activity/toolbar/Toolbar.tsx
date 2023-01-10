import React from 'react'
import Button from '../../common/components/Button'
import DownloadButton from './DownloadButton'
import SaveStateButton from '../../common/components/state_management/SaveStateButton'
import StateSelector from '../../common/components/state_management/StateSelector'
import DropStateButton from '../../common/components/state_management/DropStateButton'
import ShareStateButton from '../../common/components/state_management/ShareStateButton'
import { CustomersActivityStore } from '../store/Store'
import TrackedGroupsModeSwitcher from './TrackedGroupsModeSwitcher'

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
        <Button
            className='CustomersActivityMenuButton'
            icon='menu'
            onClick={props.showHideMenu}
        />
        <TrackedGroupsModeSwitcher visible={props.menuOpened} />
    </div>
}

const ToolbarCommands = React.memo(() => {
    const valuesSelector = (state: CustomersActivityStore) => state.viewState.stateKeys
    const keySelector = (state: CustomersActivityStore) => state.viewState.key
    const state_salt = 'CustomersActivity_'
    return <div className='CustomersActivityToolbarCommands'>
        <StateSelector
            className='CustomersActivityViewStateSelector'
            valuesSelector={valuesSelector}
            state_salt={state_salt} />
        <SaveStateButton
            className='CustomersActivitySaveStateButton'
            keySelector={keySelector}
            state_salt={state_salt} />
        <DropStateButton
            className='CustomersActivityDropStateButton'
            valuesSelector={valuesSelector}
            state_salt={state_salt} />
        <ShareStateButton
            className='CustomersActivityShareStateButton'
            keySelector={keySelector}
            state_salt={state_salt} />
        <div className='CustomersActivityToolbarSeparator'></div>
        <DownloadButton />
    </div>
})
