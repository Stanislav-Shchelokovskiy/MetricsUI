import React, { useCallback } from 'react'
import { BaseContainerState } from '../common/store/multiset_container/BaseContainerState'
import { SetState } from './store/sets_reducer/SetsReducer'
import { ContainerState } from './store/ContainerReducer'
import ComparisonGraph from '../common/components/multiset_container/graph/ComparisonGraph'
import { fetchPeriodsArray } from './network_resource_fetcher/PeriodsArray'
import {
    fetchCostMetricsAggregates,
    CostMetricsAggregates,
} from './network_resource_fetcher/CostMetricsAggregates'


export default function CostMetricsComparisonGraph() {
    const aggSelector = useCallback((containerState: BaseContainerState, aggs: CostMetricsAggregates) => {
        return aggs.aggs
    }, [])
    const depsSelector = useCallback((containerState: ContainerState) => {
        return [containerState.aggBy]
    }, [])


    return <ComparisonGraph<ContainerState, SetState, CostMetricsAggregates>
        aggSelector={aggSelector}
        containerDepsSelector={depsSelector}
        fetchPeriods={fetchPeriodsArray}
        fetchAggs={fetchCostMetricsAggregates}
    />
}
