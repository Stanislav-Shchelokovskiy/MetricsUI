import React from 'react'
import OptionSelector from '../common/components/OptionSelector'
import { MultisetContainerStore } from '../common/store/multiset_container/Store'
import { ContainerState } from './store/ContainerReducer'
import { changeAggBy } from './store/Actions'
import { fetchAggBy, AggBy } from './network_resource_fetcher/AggBy'


export default function AggBySelector() {
    const valueSelector = (store: MultisetContainerStore<ContainerState>) => store.container.aggBy
    const defaultValueSelector = (values: Array<AggBy>) => values[0]?.name
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
    return value ? value : 'takeFromValues'
}
