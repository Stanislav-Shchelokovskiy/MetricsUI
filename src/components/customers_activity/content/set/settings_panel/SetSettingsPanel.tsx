import React from 'react'
import CustomersGroupsSelector from './CustomersGroupsSelector'
import TicketsTypesSelector from './TicketsTypesSelector'
import TicketsTagsSelector from './TicketsTagsSelector'
import TribesSelector from '../../../../common/components/TribesSelector'
import { AppStore } from '../../../../common/AppStore'
import { changeTribes } from '../../../store/Actions'
import { Tribe } from '../../../../common/Interfaces'


function SetSettingsPanel({ title }: { title: string }) {
    const stateSelector = (store: AppStore) => store.customersActivitySets.find(x => x.title === title)?.tribes || []
    const changeSelectedTribesAction = (selectedTribes: Array<Tribe>) => changeTribes({ title: title, data: selectedTribes })

    return (
        <div className='CustomersActivity_SetSettingsPanel'>
            <TribesSelector
                stateSelector={stateSelector}
                changeSelectedTribesAction={changeSelectedTribesAction} />
            <CustomersGroupsSelector title={title} />
            <TicketsTagsSelector title={title} />
            <TicketsTypesSelector title={title} />
        </div>
    )
}

export default React.memo(SetSettingsPanel)
