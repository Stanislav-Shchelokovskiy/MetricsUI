import React from 'react'
import Button from '../../common/components/Button'
import DownloadButton from './DownloadButton'
import SaveStateButton from '../../common/components/state_management/SaveStateButton'
import StateSelector from '../../common/components/state_management/StateSelector'
import DropStateButton from '../../common/components/state_management/DropStateButton'
import { CustomersActivityStore } from '../store/Store'

function Toolbar({ onShowChange }: { onShowChange: () => void }) {
    const valuesSelector = (state: CustomersActivityStore) => state.viewState.stateKeys
    const keySelector = (state: CustomersActivityStore) => state.viewState.key
    const state_salt = 'CustomersActivity_'
    return (
        < div className='CustomersActivityToolbar'>
            <Button
                className='CustomersActivityMenuButton'
                icon='menu'
                onClick={onShowChange}
            />
            <div className='CustomersActivityToolbarCommands'>
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
                <div className='CustomersActivityToolbarSeparator'></div>
                <DownloadButton />
            </div>
        </div>
    )
}

export default React.memo(Toolbar)
