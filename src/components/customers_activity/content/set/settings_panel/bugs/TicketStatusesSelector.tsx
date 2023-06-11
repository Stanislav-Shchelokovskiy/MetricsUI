import React from 'react'
import { useSelector } from 'react-redux'
import { CustomersActivityStore } from '../../../../store/Store'
import { changeTicketStatuses, changeTicketStatusesInclude } from '../../../../store/actions/Bugs'
import { fetchTicketStatuses, TicketStatus } from '../../../../network_resource_fetcher/bugs/FetchTicketStatuses'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import BugsSelectorWrapper from './BugsSelectors'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'


export default function TicketStatusesSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((store: CustomersActivityStore) => store.sets.find(x => x.title === setTitle)?.ticketStatuses)
    const onValueChange = (allValues: Array<TicketStatus>, values: Array<string>) => changeTicketStatuses({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeTicketStatusesInclude({ stateId: setTitle, data: include })

    return <BugsSelectorWrapper
        Wrapped={MultiOptionSelector}
        setTitle={setTitle}
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
    />
} 
