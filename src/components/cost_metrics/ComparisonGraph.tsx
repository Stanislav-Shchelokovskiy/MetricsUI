import React from 'react'
import { SetState } from './store/sets_reducer/SetsReducer'
import { ContainerState } from './store/ContainerReducer'
import ComparisonGraph from '../common/components/multiset_container/graph/ComparisonGraph'
import { fetchPeriodsArray } from './network_resource_fetcher/PeriodsArray'
import {
    fetchCostMetricsAggregates,
    CostMetricsAggregates,
} from './network_resource_fetcher/CostMetricsAggregates'


export default function CostMetricsComparisonGraph() {
    return <ComparisonGraph<ContainerState, SetState, CostMetricsAggregates>
        fetchPeriods={fetchPeriodsArray}
        fetchAggs={fetchCostMetricsAggregates}
    />
}
