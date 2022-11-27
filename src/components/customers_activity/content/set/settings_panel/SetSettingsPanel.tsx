import React, { useCallback, useRef } from 'react'
import CustomersGroupsSelector from './CustomersGroupsSelector'
import TicketsTypesSelector from './TicketsTypesSelector'
import TicketsTagsSelector from './TicketsTagsSelector'
import TribesSelector from '../../../../common/components/TribesSelector'
import ApplyButton from './ApplyButton'
import { AppStore } from '../../../../common/AppStore'
import { changeSelectedTribes } from '../../../store/Actions'
import { Tribe } from '../../../../common/Interfaces'



function SetSettingsPanel({ title }: { title: string }) {
    const renderCount = useRef(0)
    console.log(title, ' SetSettingsPanel render ', renderCount.current++)

    const stateSelector = (store: AppStore) => store.customersActivitySets.find(x => x.title === title)?.selectedTribes || []
    const changeSelectedTribesAction = (selectedTribes: Array<Tribe>) => changeSelectedTribes({ title: title, data: selectedTribes })

    //const setState: SetState = useAppSelector((state: AppStore) => state.customersActivity.sets.find(x => x.title === title) || INITIAL_SET_STATE)
    return (
        <div className='CustomersActivity_SetSettingsPanel'>
            <CustomersGroupsSelector title={title} />
            <TicketsTypesSelector title={title} />
            <TicketsTagsSelector title={title} />
            <TribesSelector
                stateSelector={stateSelector}
                changeSelectedTribesAction={changeSelectedTribesAction} />
            <ApplyButton title={title} />
        </div>
    )
}

export default React.memo(SetSettingsPanel)