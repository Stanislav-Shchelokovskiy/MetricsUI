import React from 'react'
import CustomersGroupsSelector from './CustomersGroupsSelector'
import TicketsTypesSelector from './TicketsTypesSelector'
import TicketsTagsSelector from './TicketsTagsSelector'
import TribesSelector from './TribesSelector'


function SetSettingsPanel({ setTitle }: { setTitle: string }) {
    return (
        <div className='CustomersActivity_SetSettingsPanel'>
            <TribesSelector setTitle={setTitle} />
            <CustomersGroupsSelector setTitle={setTitle} />
            <TicketsTagsSelector setTitle={setTitle} />
            <TicketsTypesSelector setTitle={setTitle} />
        </div>
    )
}

export default React.memo(SetSettingsPanel)
