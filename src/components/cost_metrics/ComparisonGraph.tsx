import React, { useCallback } from 'react'
import { BaseContainerState } from '../common/store/multiset_container/BaseContainerState'
import { SetState } from './store/SetsReducer'
import { ContainerState } from './store/ContainerReducer'
import ComparisonGraph from '../common/components/multiset_container/graph/ComparisonGraph'
import { fetchPeriodsArray } from './network_resource_fetcher/PeriodsArray'
import {
    fetchCostMetricsAggregates,
    CostMetricsAggregates,
} from './network_resource_fetcher/CostMetrics'


export default function CostMetricsComparisonGraph() {
    const aggSelector = useCallback((containerState: BaseContainerState, aggs: CostMetricsAggregates) => {
        // if (isTicketsMetricSelected(containerState.metric))
        //     return aggs.tickets

        // if (isIterationsMetricSelected(containerState.metric))
        //     return aggs.iterations

        // if (isIterationsToTicketsMetricSelected(containerState.metric))
        //     return aggs.iterations_to_tickets

        return aggs.sc_hours
    }, [])


    return <ComparisonGraph<ContainerState, SetState, CostMetricsAggregates>
        aggSelector={aggSelector}
        fetchPeriods={fetchPeriodsArray}
        fetchAggs={fetchCostMetricsAggregates}
    />
}
