import React, { useCallback } from 'react'
import OptionSelector from '../common/components/OptionSelector'
import { MultisetContainerStore } from '../common/store/multiset_container/Store'
import { ContainerState } from './store/ContainerReducer'
import { changeAggBy } from './store/Actions'
import { fetchAggBy } from './network_resource_fetcher/AggBy'
import { TAKE_FROM_DEFAULT_SELECTOR } from '../common/store/multiset_container/Utils'


export default function AggBySelector() {
    const valueSelector = useCallback((store: MultisetContainerStore<ContainerState>) => store.container.aggBy, [])
    const defaultValueSelector = useCallback((values: Array<string>) => values[0], [])
    return (
        <OptionSelector
            className='CostMetrics_AggBySelector'
            fetchDataSource={fetchAggBy}
            valueSelector={valueSelector}
            defaultValueSelector={defaultValueSelector}
            onValueChange={changeAggBy}
            label='Agg by' />
    )
}

export function getValidAggByOrDefault(value: string | undefined) {
    return value ? value : TAKE_FROM_DEFAULT_SELECTOR
}
