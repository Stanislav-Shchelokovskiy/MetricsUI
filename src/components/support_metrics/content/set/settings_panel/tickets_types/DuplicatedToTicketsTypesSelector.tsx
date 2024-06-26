import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { SupportMetricsStore } from '../../../../store/Store'
import { changeDuplicatedToTicketTypes, changeDuplicatedToTicketsTypesInclude, } from '../../../../store/actions/TicketsTypes'
import { fetchTicketsTypes, TicketsType } from '../../../../network_resource_fetcher/tickets/FetchTicketsTypes'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { duplicatedToTicketsTypesSelector, duplicatedToTicketsTypesSelectorName } from '../../../../store/sets/Selectors'
import { setDecomposition } from '../../../../../common/store/multiset_container/sets/Defaults'


export default function DuplicatedToTicketsTypesSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((store: SupportMetricsStore) => duplicatedToTicketsTypesSelector(store, setTitle))
    const onValueChange = (allValues: Array<TicketsType>, values: Array<number>) => changeDuplicatedToTicketTypes({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeDuplicatedToTicketsTypesInclude({ stateId: setTitle, data: include })
    const decompositionArgs = setDecomposition(setTitle, duplicatedToTicketsTypesSelectorName)

    return <MultiOptionSelector<TicketsType, number>
        displaySelector='name'
        valueSelector='id'
        placeholder='Select referred ticket types'
        label='Duplicated to ticket types'
        fetchDataSource={fetchTicketsTypes}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        decompositionArgs={decompositionArgs}
    />
} 
