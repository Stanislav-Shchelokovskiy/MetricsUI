import React, { useRef } from 'react'
import MultiOptionSelector from '../../../../common/components/MultiOptionSelector'
import { AppStore } from '../../../../common/AppStore'
import { changeTicketsTags } from '../../../store/Actions'
import { fetchTicketsTags, TicketsTag } from '../../../network_resource_fetcher/FetchTicketsTags'


export default function TicketsTagsSelector({ setTitle }: { setTitle: string }) {
    const stateSelector = (store: AppStore) => store.customersActivitySets.find(x => x.title === setTitle)?.ticketsTags || []
    const onValueChange = (allValues: Array<TicketsTag>, values: Array<number>) => changeTicketsTags({ stateId: setTitle, data: values })

    return <MultiOptionSelector<TicketsTag, number>
        className='CustomersActivity_TicketsTagsSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select tickets tags'
        label='Tickets tags'
        fetchDataSourceValues={fetchTicketsTags}
        stateSelector={stateSelector}
        onValueChange={onValueChange} />
} 
