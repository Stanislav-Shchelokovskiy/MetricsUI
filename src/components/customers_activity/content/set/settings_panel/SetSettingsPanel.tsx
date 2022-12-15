import React from 'react'
import CustomersGroupsSelector from './CustomersGroupsSelector'
import TicketsTypesSelector from './TicketsTypesSelector'
import TicketsTagsSelector from './TicketsTagsSelector'
import TribesSelector from './TribesSelector'


export default function SetSettingsPanel({ setTitle }: { setTitle: string }) {
    return (
        <div className='CustomersActivity_SetSettingsPanel'>
            <div className='CustomersActivity_SetSettingsChildPanel'>
                <TribesSelector setTitle={setTitle} />
                <CustomersGroupsSelector setTitle={setTitle} />
            </div>
            <div className='CustomersActivity_SetSettingsChildPanel'>
                <TicketsTagsSelector setTitle={setTitle} />
                <TicketsTypesSelector setTitle={setTitle} />
            </div>
        </div >
    )
}
