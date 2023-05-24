import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSelector, useDispatch, useStore } from 'react-redux'
import { CustomersActivityStore } from './store/Store'
import { Token } from '../common/Interfaces'
import { toFriendlyTitle } from '../common/components/multiset_container/set/set_header/Title'
import { isAbsoluteAreaSelected, isAbsoluteBarSelected } from './graph/ComparisonMethodSelector'
import {
    fetchTicketsWithIterationsAggregates,
    TicketsWithIterationsAggregates
} from './network_resource_fetcher/FetchTicketsWithIterationsAggregates'
import { fetchPeriodsArray } from './network_resource_fetcher/FetchPeriodsArray'
import {
    isTicketsMetricSelected,
    isIterationsMetricSelected,
    isIterationsToTicketsMetricSelected
} from './common_settings_panel/MetricSelector'
import LoadIndicator from '../common/components/LoadIndicator'
import GraphPlot, { GraphData } from './graph/GraphPlot'



export default function ComparisonGraph() {
    const [aggregates, setAggregates] = useState<Array<GraphData>>([])
    const [dataLoading, setDataLoading] = useState<boolean>(false)

    const customersActivityState = useSelector((store: CustomersActivityStore) => store.customersActivity)
    const customersActivitySets = useSelector((store: CustomersActivityStore) => store.customersActivitySets)

    const store = useStore<CustomersActivityStore>().getState()
    const hiddenLegends = store.customersActivity.hiddenLegends

    const aggSelector = useCallback((aggs: TicketsWithIterationsAggregates) => {
        if (isTicketsMetricSelected(customersActivityState.metric))
            return aggs.tickets

        if (isIterationsMetricSelected(customersActivityState.metric))
            return aggs.iterations

        if (isIterationsToTicketsMetricSelected(customersActivityState.metric))
            return aggs.iterations_to_tickets

        return aggs.people
    }, [customersActivityState.metric])


    const cancellationToken = useRef<Token>({ cancel: () => { } })

    useEffect(() => {
        setDataLoading(true);
        cancellationToken.current.cancel();
        (async (token: Token) => {
            let cancelled = false
            token.cancel = () => {
                cancelled = true
            }
            const [range_start, range_end] = customersActivityState.range
            const [periods_array, ...sets] = await Promise.all([
                fetchPeriodsArray(
                    customersActivityState.groupByPeriod,
                    range_start,
                    range_end,
                    customersActivityState.baselineAlignedModeEnabled,
                ),
                ...customersActivitySets.map((set, index) => fetchTicketsWithIterationsAggregates(
                    customersActivityState.groupByPeriod,
                    range_start,
                    range_end,
                    customersActivityState.baselineAlignedModeEnabled,
                    isTicketsMetricSelected(customersActivityState.metric),
                    set,
                    index,
                ))])

            let aggs: Array<GraphData> = []
            if (periods_array.success) {
                aggs = sets.map(x => {
                    const name = toFriendlyTitle(x.data.name)
                    return {
                        name: name,
                        metric: customersActivityState.metric,
                        x: periods_array.data,
                        y: aggSelector(x.data),
                        visible: (hiddenLegends.includes(name) ? 'legendonly' : true) as 'legendonly' | boolean | undefined,
                        index: x.data.index
                    }
                }).sort((a, b) => a.index - b.index)
            }
            if (!cancelled) {
                setAggregates(aggs)
                setDataLoading(false)
            }
        })(cancellationToken.current)
    },
        [
            customersActivityState.groupByPeriod,
            customersActivityState.metric,
            customersActivityState.range[0],
            customersActivityState.range[1],
            customersActivityState.baselineAlignedModeEnabled,
            customersActivitySets,
        ])
    return (
        <div className='CustomersActivityContent'>
            {dataLoading ? <LoadIndicator className='ComparisonGraph_LoadingIndicator' width={100} height={100} /> : null}
            <GraphPlotMempized
                aggs={aggregates}
                comparisonMethod={customersActivityState.comparisonMethod}
            />
        </div>
    )
}

const GraphPlotMempized = React.memo(GraphPlot)
