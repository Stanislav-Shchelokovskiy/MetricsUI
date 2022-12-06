import React from 'react'
import CustomersGroupsSelector from './CustomersGroupsSelector'
import TicketsTypesSelector from './TicketsTypesSelector'
import TicketsTagsSelector from './TicketsTagsSelector'
import TribesSelector from '../../../../common/components/TribesSelector'
import { AppStore } from '../../../../common/AppStore'
import { changeTribes } from '../../../store/Actions'
import { Tribe } from '../../../../common/Interfaces'


function SetSettingsPanel({ setTitle }: { setTitle: string }) {
    const stateSelector = (store: AppStore) => store.customersActivitySets.find(x => x.title === setTitle)?.tribes || []
    const changeSelectedTribesAction = (allValues: Array<Tribe>, selectedTribes: Array<string>) => changeTribes({ stateId: setTitle, data: selectedTribes })

    return (
        <div className='CustomersActivity_SetSettingsPanel'>
            <TribesSelector
                stateSelector={stateSelector}
                changeSelectedTribesAction={changeSelectedTribesAction} />
            <CustomersGroupsSelector setTitle={setTitle} />
            <TicketsTagsSelector setTitle={setTitle} />
            <TicketsTypesSelector setTitle={setTitle} />
        </div>
    )
}

export default React.memo(SetSettingsPanel)
