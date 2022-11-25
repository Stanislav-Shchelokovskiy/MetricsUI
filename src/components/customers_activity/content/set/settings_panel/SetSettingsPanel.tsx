import React from 'react'
import CustomersGroupsSelector from './CustomersGroupsSelector'
import TicketsTypesSelector from './TicketsTypesSelector'
import TicketsTagsSelector from './TicketsTagsSelector'
import TribesSelector from '../../../../common/components/TribesSelector'
import ApplyButton from './ApplyButton'
import { AppStore, useAppSelector } from '../../../../common/AppStore'
import { SetState, INITIAL_SET_STATE } from '../../../store/SetReducer'



function SetSettingsPanel({ title }: { title: string }) {
    // const stateSelector = useCallback((store: AppStore) => store.forecaster.selectedTribes, [])
    // const changeSelectedTribesAction = useCallback(changeSelectedTribes, [])
    const setState: SetState = useAppSelector((state: AppStore) => state.customersActivity.sets.find(x => x.title === title) || INITIAL_SET_STATE)
    return (
        <div className='CustomersActivity_SetSettingsPanel'>
            <CustomersGroupsSelector />
            <TicketsTypesSelector />
            <TicketsTagsSelector />
            {/* <TribesSelector
                stateSelector={stateSelector}
                changeSelectedTribesAction={changeSelectedTribesAction} /> */}
            <ApplyButton />
        </div>
    )
}

export default React.memo(SetSettingsPanel)