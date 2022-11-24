import React from 'react'
import CustomersGroupsSelector from './CustomersGroupsSelector'
import TicketsTypesSelector from './TicketsTypesSelector'
import TicketsTagsSelector from './TicketsTagsSelector'
import TribesSelector from '../../../../common/components/TribesSelector'
import ApplyButton from './ApplyButton'



function SetSettingsPanel() {
    return (
        <div className='CustomersActivity_SetSettingsPanel'>
            <CustomersGroupsSelector />
            <TicketsTypesSelector />
            <TicketsTagsSelector />
            {/* <TribesSelector /> */}
            <ApplyButton />
        </div>
    )
}

export default React.memo(SetSettingsPanel)