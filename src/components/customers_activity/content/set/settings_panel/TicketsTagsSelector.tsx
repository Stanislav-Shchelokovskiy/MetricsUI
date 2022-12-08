import React from 'react'
import MultiOptionSelectorWithFetch from '../../../../common/components/MultiOptionSelector'
import { AppStore, useAppSelector } from '../../../../common/AppStore'
import { changeTicketsTags, changeTicketsTagsInclude } from '../../../store/Actions'
import { fetchTicketsTags, TicketsTag } from '../../../network_resource_fetcher/FetchTicketsTags'
import { FilterParametersNode } from '../../../store/SetsReducer'


export default function TicketsTagsSelector({ setTitle }: { setTitle: string }) {
    const state = useAppSelector((store: AppStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.ticketsTags as FilterParametersNode<number>
    )
    const onValueChange = (allValues: Array<TicketsTag>, values: Array<number>) => changeTicketsTags({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeTicketsTagsInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelectorWithFetch<TicketsTag, number>
        className='CustomersActivity_TicketsTagsSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select tickets tags'
        label='Tickets tags'
        fetchDataSourceValues={fetchTicketsTags}
        defaultValue={state.values}
        includeButtonState={state.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange} />
} 
