import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../../store/Store'
import { changeTicketsTags, changeTicketsTagsInclude } from '../../../../store/actions/Tickets'
import { fetchTicketsTags, TicketsTag } from '../../../../network_resource_fetcher/tickets/FetchTicketsTags'


export default function TicketsTagsSelector({ setTitle }: { setTitle: string }) {
    const value = useSelector((store: CustomersActivityStore) => store.sets.find(x => x.title === setTitle)?.ticketsTags)
    const onValueChange = (allValues: Array<TicketsTag>, values: Array<string>) => changeTicketsTags({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeTicketsTagsInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<TicketsTag, string>
        className='CustomersActivity_TicketsTagsSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select ticket tags'
        label='Ticket tags'
        fetchDataSource={fetchTicketsTags}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
    />
} 
