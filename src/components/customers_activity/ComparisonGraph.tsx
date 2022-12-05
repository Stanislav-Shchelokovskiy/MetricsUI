import React, { useState, useEffect } from 'react'
import Plot from 'react-plotly.js'
import { Data as GraphData } from 'plotly.js'
import { useAppSelector, AppStore } from '../common/AppStore'
import FetchResult from '../common/Interfaces'
import { isTicketsMetricSelected } from './commonSettingsPanel/MetricSelector'
import { isAbsoluteComparisonMethodSelected } from './commonSettingsPanel/ComparisonMethodSelector'
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
    const customersActivityState = useAppSelector((store: AppStore) => store.customersActivity)
    const customersActivitySets = useAppSelector((store: AppStore) => store.customersActivitySets)

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
            comparisonMethod }:
            {
                aggregates: Array<SetAggregates>,
                metric: string,
                comparisonMethod: string
            }) {
        return (
            <Plot
                className='CustomersActivity_ComparisonGraph'
                data={getPlots(aggregates, metric, comparisonMethod)}
                useResizeHandler={true}
                layout={{
                    margin: {
                        t: 10,
                        l: 30,
                        r: 10,
                        b: 30
                    },
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
            data.push(
                isAbsoluteComparisonMethodSelected(comparisonMethod) ?
                    createBar(set, metric) :
                    createChart(set, metric)
            )
        }
        return data
    }
    return []
}


function createBar(set: SetAggregates, metric: string): GraphData {
    return {
        ...getCommonGraphSettings(set, metric),
        type: 'bar',
        hovertemplate: `<b>${set.name}</b><br>Period: %{x}<br>${metric}: %{y}<br><extra></extra>`,
    }
}

//NormalizedStackedAreaChart
function createChart(set: SetAggregates, metric: string): GraphData {
    return {
        ...getCommonGraphSettings(set, metric),
        type: 'scatter',
        hovertemplate: `<b>${set.name}</b><br>Period: %{x}<br>Value: %{y}%<br><extra></extra>`,
        connectgaps: true,
        stackgroup: 'one',
        groupnorm: 'percent'
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
