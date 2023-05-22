import React, { useState, useEffect, useRef, useCallback } from 'react'
import Plot from 'react-plotly.js'
import { Data as GraphData } from 'plotly.js'
import { useSelector, useDispatch, useStore } from 'react-redux'
import { CustomersActivityStore } from './store/Store'
import { hideLegends } from '../common/store/set_container/Actions'
import { Token } from '../common/Interfaces'
import { toFriendlyTitle } from '../common/components/multiset_container/set/set_header/Title'
import { isAbsoluteAreaSelected, isAbsoluteBarSelected } from './common_settings_panel/ComparisonMethodSelector'
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

interface Aggregates {
    periods: Array<string>
    setAggregates: Array<SetAggregates>
}

interface SetAggregates {
    name: string
    aggregates: TicketsWithIterationsAggregates
}


const INITIAL_STATE = {
    periods: [],
    setAggregates: []
}

export default function ComparisonGraph() {
    const [aggregates, setAggregates] = useState<Aggregates>(INITIAL_STATE)
    const [dataLoading, setDataLoading] = useState<boolean>(false)

    const customersActivityState = useSelector((store: CustomersActivityStore) => store.customersActivity)
    const customersActivitySets = useSelector((store: CustomersActivityStore) => store.customersActivitySets)

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

            let aggs: Aggregates = INITIAL_STATE
            if (periods_array.success) {
                aggs = {
                    periods: periods_array.data,
                    setAggregates: sets.map(x => {
                        return { name: toFriendlyTitle(x.data.title), aggregates: x.data }
                    }).sort((a, b) => a.aggregates.index - b.aggregates.index)
                }
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
            <GraphPlot
                aggs={aggregates}
                metric={customersActivityState.metric}
                comparisonMethod={customersActivityState.comparisonMethod}
            />
        </div>
    )
}

interface LegendClickObject {
    data: Array<GraphData>
}
const GraphPlot = React.memo(
    function GraphPlotMemoized(
        {
            aggs,
            metric,
            comparisonMethod
        }: {
            aggs: Aggregates,
            metric: string,
            comparisonMethod: string
        }
    ) {
        const dispatch = useDispatch()
        const onLegendClick = useCallback(({ data }: LegendClickObject) => {
            const timerId = setTimeout(() => {
                const hiddenLegends = (data.filter(legend => (legend as any).visible === 'legendonly').map(legend => legend.hovertext) as Array<string>)
                dispatch(hideLegends(hiddenLegends))
                clearTimeout(timerId)
            }, 500)
            return true
        }, [])

        const store = useStore<CustomersActivityStore>().getState()
        const hiddenLegends = store.customersActivity.hiddenLegends
        return (
            <Plot
                divId='CustomersActivity_ComparisonGraph'
                className='CustomersActivity_ComparisonGraph'
                data={getPlots(aggs.setAggregates, metric, comparisonMethod, hiddenLegends)}
                useResizeHandler={true}
                layout={{
                    margin: { t: 10, l: 30, r: 10, b: 30 },
                    xaxis: { autorange: true, automargin: true, type: 'category', categoryorder: 'array', categoryarray: aggs.periods },
                    yaxis: { 'showgrid': true, zeroline: false, autorange: true, automargin: true },
                    barmode: 'group',
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    autosize: true,
                }}
                config={{ displayModeBar: false, doubleClick: 'autosize', responsive: true }}
                onLegendClick={onLegendClick} />
        )
    }
)

function getPlots(setAggregates: Array<SetAggregates>, metric: string, comparisonMethod: string, hiddenLegends: Array<string>): Array<GraphData> {
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
            return createAbsoluteBar(set, metric, hiddenLegends)
        }
        if (isAbsoluteAreaSelected(comparisonMethod)) {
            return createAbsoluteArea(set, metric, hiddenLegends)
        }
        return createNormalizedStackedArea(set, metric, hiddenLegends)
    }
}


function createAbsoluteBar(set: SetAggregates, metric: string, hiddenLegends: Array<string>): GraphData {
    return {
        ...getCommonGraphSettings(set, metric, hiddenLegends),
        ...getAbsoluteGraphSettings(set, metric),
        type: 'bar',
    }
}

function createAbsoluteArea(set: SetAggregates, metric: string, hiddenLegends: Array<string>): GraphData {
    return {
        ...getCommonGraphSettings(set, metric, hiddenLegends),
        ...getAbsoluteGraphSettings(set, metric),
        type: 'scatter',
        fill: 'tozeroy',
        mode: 'none',
        line: { shape: 'spline' },
    }
}

//NormalizedStackedAreaChart
function createNormalizedStackedArea(set: SetAggregates, metric: string, hiddenLegends: Array<string>): GraphData {
    return {
        ...getCommonGraphSettings(set, metric, hiddenLegends),
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

function getCommonGraphSettings(set: SetAggregates, metric: string, hiddenLegends: Array<string>) {
    return {
        name: set.name,
        x: set.aggregates.periods,
        y: isTicketsMetricSelected(metric) ? set.aggregates.tickets :
            isIterationsMetricSelected(metric) ? set.aggregates.iterations :
                isIterationsToTicketsMetricSelected(metric) ? set.aggregates.iterations_to_tickets : set.aggregates.people,
        opacity: 0.6,
        hovertext: set.name,
        visible: (hiddenLegends.includes(set.name) ? 'legendonly' : true) as 'legendonly' | boolean | undefined
    }
}
