import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../../store/Store'
import { changeDuplicatedToTicketTypes, changeDuplicatedToTicketsTypesInclude,  } from '../../../../store/actions/TicketsTypes'
import { fetchTicketsTypes, TicketsType } from '../../../../network_resource_fetcher/FetchTicketsTypes'


export default function DuplicatedToTicketsTypesSelector({ setTitle }: { setTitle: string }) {
    const value = useSelector((store: CustomersActivityStore) =>store.customersActivitySets.find(x => x.title === setTitle)?.duplicatedToTicketsTypes)
    const onValueChange = (allValues: Array<TicketsType>, values: Array<number>) => changeDuplicatedToTicketTypes({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeDuplicatedToTicketsTypesInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<TicketsType, number>
        className='CustomersActivity_ReferredTicketsTypesSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select referred ticket types'
        label='Duplicated to ticket types'
        fetchDataSource={fetchTicketsTypes}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#CustomersActivity_Sets_ScrollView_div'
    />
} 