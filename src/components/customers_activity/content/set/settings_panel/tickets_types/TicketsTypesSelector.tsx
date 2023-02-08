import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../../store/Store'
import { changeTicketsTypes, changeTicketsTypesInclude } from '../../../../store/actions/TicketsTypes'
import { fetchTicketsTypes, TicketsType } from '../../../../network_resource_fetcher/tickets/FetchTicketsTypes'


export default function TicketsTypesSelector({ setTitle }: { setTitle: string }) {
    const value = useSelector((store: CustomersActivityStore) =>store.customersActivitySets.find(x => x.title === setTitle)?.ticketsTypes)
    const onValueChange = (allValues: Array<TicketsType>, values: Array<number>) => changeTicketsTypes({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeTicketsTypesInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<TicketsType, number>
        className='CustomersActivity_TicketsTypesSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select ticket types'
        label='Ticket types'
        fetchDataSource={fetchTicketsTypes}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#CustomersActivity_Sets_ScrollView_div'
    />
} 
