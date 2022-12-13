import React, { useState, useEffect } from 'react'
import Plot from 'react-plotly.js'
import { Data as GraphData } from 'plotly.js'
import { useCustomersActivitySelector, CustomersActivityStore } from './store/Store'
import FetchResult from '../common/Interfaces'
import { isTicketsMetricSelected } from './commonSettingsPanel/MetricSelector'
import { isAbsoluteAreaSelected, isAbsoluteBarSelected } from './commonSettingsPanel/ComparisonMethodSelector'
import {
    fetchTicketsWithIterationsAggregates,
    TicketsWithIterationsAggregates,
    EMPTY_TICKETS_WITH_ITERATIONS_AGGREGATES
} from './network_resource_fetcher/FetchTicketsWithIterationsAggregates'


interface SetAggregates {
    name: string
    aggregates: TicketsWithIterationsAggregates
}


const INITIAL_STATE = {
    name: '',
    aggregates: EMPTY_TICKETS_WITH_ITERATIONS_AGGREGATES,
}


export default function ComparisonGraph() {
    const [aggregates, setAggregates] = useState<Array<SetAggregates>>([INITIAL_STATE])
    const customersActivityState = useCustomersActivitySelector((store: CustomersActivityStore) => store.customersActivity)
    const customersActivitySets = useCustomersActivitySelector((store: CustomersActivityStore) => store.customersActivitySets)

    useEffect(() => {
        (async () => {
            let aggs: Array<SetAggregates> = []
            for (const set of customersActivitySets) {
                const fetchedAggregates: FetchResult<TicketsWithIterationsAggregates> = await fetchTicketsWithIterationsAggregates(
                    customersActivityState.groupByPeriod,
                    customersActivityState.range[0],
                    customersActivityState.range[1],
                    set.customersGroups,
                    set.ticketsTypes,
                    set.ticketsTags,
                    set.tribes,
                    set.repliesTypes,
                    set.components,
                    set.features,
                )
                if (fetchedAggregates.success) {
                    aggs.push({
                        name: `Set ${set.title}`,
                        aggregates: fetchedAggregates.data
                    })
                }
            }
            setAggregates(aggs)
        })()
    },
        [
            customersActivityState.groupByPeriod,
            customersActivityState.range,
            customersActivitySets,
        ])

    return <GraphPlot
        aggregates={aggregates}
        metric={customersActivityState.metric}
        comparisonMethod={customersActivityState.comparisonMethod}
    />
}

const GraphPlot = React.memo(
    function GraphPlotMemoized(
        {
            aggregates,
            metric,
            comparisonMethod
        }: {
            aggregates: Array<SetAggregates>,
            metric: string,
            comparisonMethod: string
        }
    ) {
        return (
            <Plot
                divId='CustomersActivity_ComparisonGraph'
                className='CustomersActivity_ComparisonGraph'
                data={getPlots(aggregates, metric, comparisonMethod)}
                useResizeHandler={true}
                layout={{
                    margin: { t: 10, l: 30, r: 10, b: 30 },
                    xaxis: { autorange: true, automargin: true, type: 'category', categoryorder: 'category ascending' },
                    yaxis: { 'showgrid': true, zeroline: false, autorange: true, automargin: true },
                    barmode: 'group',
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    autosize: true,
                }}
                config={{ displayModeBar: false, doubleClick: 'autosize', responsive: true }} />
        )
    }
)

function getPlots(setAggregates: Array<SetAggregates>, metric: string, comparisonMethod: string): Array<GraphData> {
    if (setAggregates.length > 0) {
        const data: Array<GraphData> = []
        for (const set of setAggregates) {
            data.push(getPlot(set, metric,))
        }
        return data
    }
    return []

    function getPlot(set: SetAggregates, metric: string): GraphData {
        if (isAbsoluteBarSelected(comparisonMethod)) {
            return createAbsoluteBar(set, metric)
        }
        if (isAbsoluteAreaSelected(comparisonMethod)) {
            return createAbsoluteArea(set, metric)
        }
        return createNormalizedStackedArea(set, metric)
    }
}


function createAbsoluteBar(set: SetAggregates, metric: string): GraphData {
    return {
        ...getCommonGraphSettings(set, metric),
        ...getAbsoluteGraphSettings(set, metric),
        type: 'bar',
    }
}

function createAbsoluteArea(set: SetAggregates, metric: string): GraphData {
    return {
        ...getCommonGraphSettings(set, metric),
        ...getAbsoluteGraphSettings(set, metric),
        type: 'scatter',
        fill: 'tozeroy',
        mode: 'none',
        line: { shape: 'spline' },
    }
}

//NormalizedStackedAreaChart
function createNormalizedStackedArea(set: SetAggregates, metric: string): GraphData {
    return {
        ...getCommonGraphSettings(set, metric),
        type: 'scatter',
        hovertemplate: `<b>${set.name}</b><br>Period: %{x}<br>Value: %{y}%<br><extra></extra>`,
        connectgaps: true,
        stackgroup: 'one',
        groupnorm: 'percent'
    }
}

function getAbsoluteGraphSettings(set: SetAggregates, metric: string) {
    return {
        hovertemplate: `<b>${set.name}</b><br>Period: %{x}<br>${metric}: %{y}<br><extra></extra>`,
    }
}

function getCommonGraphSettings(set: SetAggregates, metric: string) {
    return {
        name: set.name,
        x: set.aggregates.periods,
        y: isTicketsMetricSelected(metric) ? set.aggregates.tickets : set.aggregates.iterations,
        opacity: 0.6,
        hovertext: set.name
    }
}
