import React, { useCallback } from 'react'
import { BaseContainerState } from '../common/store/multiset_container/BaseContainerState'
import { SetState } from './store/sets_reducer/Interfaces'
import { ContainerState } from './store/ContainerReducer'
import ComparisonGraph from '../common/components/multiset_container/graph/ComparisonGraph'
import { fetchPeriodsArray } from './network_resource_fetcher/FetchPeriodsArray'
import {
    fetchTicketsWithIterationsAggregates,
    TicketsWithIterationsAggregates
} from './network_resource_fetcher/FetchTicketsWithIterationsAggregates'
import {
    isTicketsMetricSelected,
    isIterationsMetricSelected,
    isIterationsToTicketsMetricSelected
} from '../common/components/multiset_container/graph/MetricSelector'


export default function CustomersActivityComparisonGraph() {
    const aggSelector = useCallback((containerState: BaseContainerState, aggs: TicketsWithIterationsAggregates) => {
        if (isTicketsMetricSelected(containerState.metric))
            return aggs.tickets

        if (isIterationsMetricSelected(containerState.metric))
            return aggs.iterations

        if (isIterationsToTicketsMetricSelected(containerState.metric))
            return aggs.iterations_to_tickets

        return aggs.people
    }, [])
    const containerDepsSelector = useCallback((containerState: ContainerState) => [containerState.baselineAlignedModeEnabled], [])

    return <ComparisonGraph<ContainerState, SetState, TicketsWithIterationsAggregates>
        aggSelector={aggSelector}
        fetchPeriods={fetchPeriodsArray}
        fetchAggs={fetchTicketsWithIterationsAggregates}
        containerDepsSelector={containerDepsSelector}
    />
}
