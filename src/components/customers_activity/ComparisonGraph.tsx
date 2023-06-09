import React, { useCallback } from 'react'
import { SetState } from './store/sets_reducer/Interfaces'
import { ContainerState } from './store/ContainerReducer'
import ComparisonGraph from '../common/components/multiset_container/graph/ComparisonGraph'
import { fetchPeriodsArray } from './network_resource_fetcher/FetchPeriodsArray'
import {
    fetchTicketsWithIterationsAggregates,
    TicketsWithIterationsAggregates
} from './network_resource_fetcher/FetchTicketsWithIterationsAggregates'

export default function CustomersActivityComparisonGraph() {
    const containerDepsSelector = useCallback((containerState: ContainerState) => [containerState.baselineAlignedModeEnabled], [])

    return <ComparisonGraph<ContainerState, SetState, TicketsWithIterationsAggregates>
        fetchPeriods={fetchPeriodsArray}
        fetchAggs={fetchTicketsWithIterationsAggregates}
        containerDepsSelector={containerDepsSelector}
    />
}
