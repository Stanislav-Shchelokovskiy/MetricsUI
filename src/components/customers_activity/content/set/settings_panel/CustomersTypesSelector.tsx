import React from 'react'
import MultiOptionSelectorWithFetch from '../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore, useCustomersActivitySelector } from '../../../store/Store'
import { changeCustomersTypes, changeCustomersTypesInclude } from '../../../store/Actions'
import { fetchTicketsTypes, TicketsType } from '../../../network_resource_fetcher/FetchTicketsTypes'
import { FilterParametersNode } from '../../../store/SetsReducer'


export default function CustomersTypesSelector({ setTitle }: { setTitle: string }) {
    const state = useCustomersActivitySelector((store: CustomersActivityStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.ticketsTypes as FilterParametersNode<number>
    )
    const onValueChange = (allValues: Array<TicketsType>, values: Array<number>) => changeCustomersTypes({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeCustomersTypesInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelectorWithFetch<TicketsType, number>
        className='CustomersActivity_CustomersTypesSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select user types'
        label='User types'
        fetchDataSourceValues={fetchTicketsTypes}
        defaultValue={state?.values}
        includeButtonState={state?.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#CustomersActivity_Sets_ScrollView_div'
    />
} 
