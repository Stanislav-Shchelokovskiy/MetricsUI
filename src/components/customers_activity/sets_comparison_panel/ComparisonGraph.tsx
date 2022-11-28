import React, { useState, useEffect, useCallback, useRef } from 'react'
import Plot from 'react-plotly.js'
import { Data as GraphData } from 'plotly.js'
import { useAppDispatch, useAppSelector, AppStore } from '../../common/AppStore'
import { CustomersActivityState } from '../store/CustomersActivityReducer'
import FetchResult from '../../common/Interfaces'
import {
    fetchTicketsWithIterationsAggregates,
    TicketsWithIterationsAggregates,
    EMPTY_TICKETS_WITH_ITERATIONS_AGGREGATES
} from '../network_resource_fetcher/FetchTicketsWithIterationsAggregates'


interface SetAggregates {
    name: string
    aggregates: TicketsWithIterationsAggregates
}

const INITIAL_STATE = {
    name: '',
    aggregates: EMPTY_TICKETS_WITH_ITERATIONS_AGGREGATES,
}

function getBars(setAggregates: Array<SetAggregates>): Array<GraphData> {
    if (setAggregates.length > 0) {

        const data: Array<GraphData> = []
        for (const set of setAggregates) {
            // const visible = positionsFilter.length === 0 && hiddenLegends.includes(user.user_name) ? 'legendonly' : undefined
            data.push(
                {
                    type: 'bar',
                    name: set.name,
                    x: set.aggregates.periods,
                    y: set.aggregates.tickets,
                    opacity: 0.6,
                    hovertext: set.name,
                    hovertemplate: `<b>${set.name}</b><br>Period: %{x}<br>Count: %{y}<br><extra></extra>`,
                    // visible: visible || getBarVisibility(
                    //     user.tribe_belonging_status,
                    //     user.position_name,
                    //     positionsFilter,
                    // ),
                }
            )
        }
        return data
    }
    return []
}

export default function ComparisonGraph() {
    const renderCount = useRef(0)
    console.log('ComparisonGraph render ', renderCount.current++)

    const [aggregates, setAggregates] = useState<Array<SetAggregates>>([INITIAL_STATE])
    const customersActivityState = useAppSelector((store: AppStore) => store.customersActivity)

    //const [graphState, dispatch] = useReducer(graphStateReducer, initialGraphState)

    useEffect(() => {
        (async () => {
            const fetchedAggregates: FetchResult<TicketsWithIterationsAggregates> = await fetchTicketsWithIterationsAggregates(
                customersActivityState.groupByPeriod,
                customersActivityState.range[0],
                customersActivityState.range[1],
            )
            if (fetchedAggregates.success) {
                setAggregates([{
                    name: 'set 0',
                    aggregates: fetchedAggregates.data
                }])
            }
        })()
    },
        [
            customersActivityState.groupByPeriod,
            customersActivityState.metric,
            customersActivityState.range,
            customersActivityState.sets,
        ])


    return (
        <div className='CustomersActivity_ComparisonGraph'>
            <Plot
                data={getBars(aggregates)}
                style={{
                    width: '100%',
                    minHeight: 400,
                    height: '100%'
                }}
                useResizeHandler={true}
                layout={{
                    margin: {
                        t: 10,
                        l: 30,
                        r: 10,
                        b: 30
                    },
                    xaxis: { autorange: true, automargin: true, type: 'category' },
                    yaxis: { 'showgrid': true, zeroline: false, autorange: true, automargin: true },
                    barmode: 'stack',
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    autosize: true,
                }}
                config={{ displayModeBar: false, doubleClick: 'autosize', responsive: true }}
            // onLegendClick={onLegendClick}
            />
        </div>
    )
}
