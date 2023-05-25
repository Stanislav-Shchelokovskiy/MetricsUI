import React, { useCallback } from 'react'
import { BaseContainerState } from '../common/store/set_container/Interfaces'
import { SetState } from './store/sets_reducer/Interfaces'
import { CustomersActivityStore } from './store/Store'
import { CustomersActivityState } from './store/CustomersActivityReducer'
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
    const containerSelector = useCallback((store: CustomersActivityStore) => store.customersActivity, [])
    const setsSelector = useCallback((store: CustomersActivityStore) => store.customersActivitySets, [])
    const aggSelector = useCallback((containerState: BaseContainerState, aggs: TicketsWithIterationsAggregates) => {
        if (isTicketsMetricSelected(containerState.metric))
            return aggs.tickets

        if (isIterationsMetricSelected(containerState.metric))
            return aggs.iterations

        if (isIterationsToTicketsMetricSelected(containerState.metric))
            return aggs.iterations_to_tickets

        return aggs.people
    }, [])
    const containerDepsSelector = useCallback((containerState: CustomersActivityState) => [containerState.baselineAlignedModeEnabled], [])

    return <ComparisonGraph<CustomersActivityStore, CustomersActivityState, SetState, TicketsWithIterationsAggregates>
        className='CustomersActivityContent'
        containerSelector={containerSelector}
        setsSelector={setsSelector}
        aggSelector={aggSelector}
        fetchPeriods={fetchPeriodsArray}
        fetchAggs={fetchTicketsWithIterationsAggregates}
        containerDepsSelector={containerDepsSelector}
    />
}
