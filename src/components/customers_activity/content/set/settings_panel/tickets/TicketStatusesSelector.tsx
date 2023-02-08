import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../../store/Store'
import { changeTicketStatuses, changeTicketStatusesInclude } from '../../../../store/actions/Tickets'
import { fetchTicketStatuses, TicketStatus } from '../../../../network_resource_fetcher/FetchTicketStatuses'


export default function TicketStatusesSelector({ setTitle }: { setTitle: string }) {
    const value = useSelector((store: CustomersActivityStore) => store.customersActivitySets.find(x => x.title === setTitle)?.ticketStatuses)
    const onValueChange = (allValues: Array<TicketStatus>, values: Array<string>) => changeTicketStatuses({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeTicketStatusesInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<TicketStatus, string>
        className='CustomersActivity_TicketStatusesSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select statuses'
        label='Status'
        fetchDataSource={fetchTicketStatuses}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#CustomersActivity_Sets_ScrollView_div'
    />
} 
