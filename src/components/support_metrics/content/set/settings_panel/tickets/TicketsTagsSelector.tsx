import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { SupportMetricsStore } from '../../../../store/Store'
import { changeTicketsTags, changeTicketsTagsInclude } from '../../../../store/actions/Tickets'
import { fetchTicketsTags, TicketsTag } from '../../../../network_resource_fetcher/tickets/FetchTicketsTags'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { ticketsTagsSelector, ticketStatusesSelectorName } from '../../../../store/sets/Selectors'
import { setDecomposition } from '../../../../../common/store/multiset_container/sets/Defaults'


export default function TicketsTagsSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((store: SupportMetricsStore) => ticketsTagsSelector(store, setTitle))
    const onValueChange = (allValues: Array<TicketsTag>, values: Array<string>) => changeTicketsTags({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeTicketsTagsInclude({ stateId: setTitle, data: include })
    const decompositionArgs = setDecomposition(setTitle, ticketStatusesSelectorName)

    return <MultiOptionSelector<TicketsTag, string>
        displaySelector='name'
        valueSelector='id'
        placeholder='Select ticket tags'
        label='Ticket tags'
        fetchDataSource={fetchTicketsTags}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
        decompositionArgs={decompositionArgs}
    />
} 
