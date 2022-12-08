import React from 'react'
import MultiOptionSelectorWithFetch from '../../../../common/components/MultiOptionSelector'
import { AppStore, useAppSelector } from '../../../../common/AppStore'
import { changeTicketsTypes, changeTicketsTypesInclude } from '../../../store/Actions'
import { fetchTicketsTypes, TicketsType } from '../../../network_resource_fetcher/FetchTicketsTypes'
import { FilterParametersNode } from '../../../store/SetsReducer'


export default function TicketsTypesSelector({ setTitle }: { setTitle: string }) {
    const state = useAppSelector((store: AppStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.ticketsTypes as FilterParametersNode<number>
    )
    const onValueChange = (allValues: Array<TicketsType>, values: Array<number>) => changeTicketsTypes({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeTicketsTypesInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelectorWithFetch<TicketsType, number>
        className='CustomersActivity_TicketsTypesSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select tickets types'
        label='Tickets types'
        fetchDataSourceValues={fetchTicketsTypes}
        defaultValue={state.values}
        includeButtonState={state.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange} />
} 
