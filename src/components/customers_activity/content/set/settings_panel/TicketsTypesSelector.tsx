import React, { useRef } from 'react'
import MultiOptionSelector from '../../../../common/components/MultiOptionSelector'
import { AppStore } from '../../../../common/AppStore'
import { changeTicketsTypes } from '../../../store/Actions'
import { fetchTicketsTypes, TicketsType } from '../../../network_resource_fetcher/FetchTicketsTypes'


export default function TicketsTypesSelector({ setTitle }: { setTitle: string }) {
    const stateSelector = (store: AppStore) => store.customersActivitySets.find(x => x.title === setTitle)?.ticketsTypes || []
    const dataSourceObjectKeySelector = (value: TicketsType) => value.id
    const dataSourceObjectByKeySelector = (value: TicketsType, targetKeyValue: number) => value.id === targetKeyValue
    const onValueChange = (values: Array<TicketsType>) => changeTicketsTypes({ stateId: setTitle, data: values })

    return <MultiOptionSelector<TicketsType, number>
        className='CustomersActivity_TicketsTypesSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select tickets types'
        label='Tickets types'
        fetchDataSourceValues={fetchTicketsTypes}
        stateSelector={stateSelector}
        dataSourceObjectKeySelector={dataSourceObjectKeySelector}
        dataSourceObjectByKeySelector={dataSourceObjectByKeySelector}
        onValueChange={onValueChange} />
} 
