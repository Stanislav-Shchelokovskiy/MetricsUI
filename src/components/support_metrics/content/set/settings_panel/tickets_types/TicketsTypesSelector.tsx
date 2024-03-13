import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { SupportMetricsStore } from '../../../../store/Store'
import { DEFAULT_SET } from '../../../../store/sets/Defaults'
import { changeTicketsTypes, changeTicketsTypesInclude } from '../../../../store/actions/TicketsTypes'
import { fetchTicketsTypes, TicketsType } from '../../../../network_resource_fetcher/tickets/FetchTicketsTypes'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { ticketsTypesSelector, ticketsTypesSelectorName } from '../../../../store/sets/Selectors'
import { setDecomposition } from '../../../../../common/store/multiset_container/sets/Defaults'


export default function TicketsTypesSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((store: SupportMetricsStore) => ticketsTypesSelector(store, setTitle))
    const onValueChange = (allValues: Array<TicketsType>, values: Array<number>) => changeTicketsTypes({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeTicketsTypesInclude({ stateId: setTitle, data: include })
    const defaultValue = DEFAULT_SET.ticketsTypes?.values
    const decompositionArgs = setDecomposition(setTitle, ticketsTypesSelectorName)

    return <MultiOptionSelector<TicketsType, number>
        displaySelector='name'
        valueSelector='id'
        placeholder='Select ticket types'
        label='Ticket types'
        fetchDataSource={fetchTicketsTypes}
        value={value?.values}
        defaultValue={defaultValue}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        decompositionArgs={decompositionArgs}
    />
} 
