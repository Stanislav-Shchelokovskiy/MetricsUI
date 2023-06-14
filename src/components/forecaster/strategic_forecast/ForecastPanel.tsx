import React, { useReducer, useEffect, useCallback, useRef } from 'react'
import Plot from 'react-plotly.js'
import { useDispatch } from 'react-redux'
import { Data as GraphData } from 'plotly.js'
import ForecastMissing from '../utils/ForecastMissing'
import GetColor from '../utils/ColorPalette'
import FetchResult from '../../common/Interfaces'
import { legendClick } from '../store/strategic_forecast/Actions'
import { DailyTentReplies, fetchDailyTentReplies, EMPTY_DAILY_TENT_REPLIES } from '../network_resource_fetcher/TentDailyReplies'
import { IncomeForecast, fetchTentIncomeForecast, EMPTY_INCOME_FORECAST } from '../network_resource_fetcher/TentIncomeForecast'


export interface ForecastPanelState {
    tentId: string
    forecastHorizon: string
    incomeType: string
    tile: number
    positionsFilter: Array<string>
    hiddenLegends: Array<string>
    lastUpdated: number
}

function ForecastPanel({ state }: { state: ForecastPanelState }) {
    return (
        <div className='ForecastBody'>
            <Graph state={state} />
        </div>
    )
}

function areEqual(prevProps: { state: ForecastPanelState }, nextProps: { state: ForecastPanelState }) {
    const res = (prevProps.state.tentId === nextProps.state.tentId) &&
        (prevProps.state.forecastHorizon === nextProps.state.forecastHorizon) &&
        (prevProps.state.incomeType === nextProps.state.incomeType) &&
        (prevProps.state.tile === nextProps.state.tile) &&
        (prevProps.state.lastUpdated === nextProps.state.lastUpdated) &&
        // Never enable rendering on hiddenLegends change as this will break working with legends because
        // all initial legends filtering logic (like in the getBarVisibility function) will be executed on each legend click.
        // (prevProps.state.hiddenLegends.sort().join(',') === nextProps.state.hiddenLegends.sort().join(',')) &&
        (prevProps.state.positionsFilter.sort().join(',') === nextProps.state.positionsFilter.sort().join(','))
    return res
}

export default React.memo(ForecastPanel, areEqual)


function getScatters(state: GraphState): Array<GraphData> {
    if (state.incomeForecastLoaded) {
        return [{
            type: 'scatter',
            x: state.incomeForecast.ts,
            y: state.incomeForecast.y,
            name: 'fact',
            line: { shape: 'spline', color: GetColor('fact') },
            hovertemplate: 'Actual income: <b>%{y}</b><br>Date: %{x}<br><extra></extra>',
            connectgaps: true,
        },
        {
            type: 'scatter',
            x: state.incomeForecast.ts,
            y: state.incomeForecast.yhat_rmse_upper,
            name: 'Income forecast (upper boundary)',
            showlegend: false,
            line: { shape: 'spline', color: GetColor('forecast_boundary') },
            hovertemplate: 'Income forecast (upper boundary): <b>%{y}</b><br>Date: %{x}<br><extra></extra>',
            connectgaps: true,
        },
        {
            type: 'scatter',
            x: state.incomeForecast.ts,
            y: state.incomeForecast.yhat,
            name: 'Income forecast',
            fill: 'tonexty',
            line: { shape: 'spline', color: GetColor('forecast') },
            fillcolor: GetColor('forecast_fill'),
            hovertemplate: 'Income forecast: <b>%{y}</b><br>Date: %{x}<br><extra></extra>',
            connectgaps: true,
        },
        {
            type: 'scatter',
            x: state.incomeForecast.ts,
            y: state.incomeForecast.yhat_rmse_lower,
            name: 'Income forecast (lower boundary)',
            fill: 'tonexty',
            showlegend: false,
            line: { shape: 'spline', color: GetColor('forecast_boundary') },
            fillcolor: GetColor('forecast_fill'),
            hovertemplate: 'Income forecast (lower boundary): <b>%{y}</b><br>Date: %{x}<br><extra></extra>',
            connectgaps: true,
        }
        ]
    }
    return []
}


function getBars(state: GraphState, positionsFilter: Array<string>, hiddenLegends: Array<string>): Array<GraphData> {
    if (state.tentRepliesLoaded) {
        const data: Array<GraphData> = []
        for (const user of state.tentReplies) {
            const visible = positionsFilter.length === 0 && hiddenLegends.includes(user.name) ? 'legendonly' : undefined
            data.push(
                {
                    type: 'bar',
                    name: user.user_display_name,
                    x: user.reply_date,
                    y: user.iterations,
                    opacity: 0.6,
                    hovertext: user.name,
                    hovertemplate: `<b>${user.name}</b><br>Date: %{x}<br>Count: %{y}<br><extra></extra>`,
                    visible: visible || getBarVisibility(
                        user.tent_belonging_status,
                        user.position_name,
                        positionsFilter,
                    ),
                }
            )
        }
        return data
    }
    return []
}

function getBarVisibility(
    belonging: number,
    positionName: string,
    positionsFilter: Array<string>
): boolean | 'legendonly' | undefined {
    if (!positionsFilter.length) {
        const differentTribe = 3
        return belonging === differentTribe ? 'legendonly' : undefined
    }

    for (const posName of positionsFilter) {
        if (posName === positionName || (posName !== 'Developer' && positionName.includes(posName))) {
            return undefined
        }
    }
    return 'legendonly'
}


interface GraphState {
    incomeForecastLoaded: boolean
    incomeForecast: IncomeForecast
    tentRepliesLoaded: boolean
    tentReplies: Array<DailyTentReplies>
}

const initialGraphState: GraphState = {
    incomeForecastLoaded: false,
    incomeForecast: EMPTY_INCOME_FORECAST,
    tentRepliesLoaded: false,
    tentReplies: EMPTY_DAILY_TENT_REPLIES,
}

interface GraphAction {
    type: string
    incomeForecastLoaded: boolean
    incomeForecast: IncomeForecast
    tentRepliesLoaded: boolean
    tentReplies: Array<DailyTentReplies>
}

const FETCH_INCOME_FORECAST = 'fetchIncomeForecast'
const FETCH_DAILY_TRIBE_REPLIES = 'fetchDailyTribeReplies'
function graphStateReducer(state: GraphState, action: GraphAction): GraphState {
    switch (action.type) {
        case FETCH_INCOME_FORECAST:
            if (state.incomeForecast === action.incomeForecast) {
                return state;
            }
            if (action.incomeForecastLoaded) {
                return {
                    ...state,
                    incomeForecastLoaded: action.incomeForecastLoaded,
                    incomeForecast: action.incomeForecast
                }
            }
            return state
        case FETCH_DAILY_TRIBE_REPLIES:
            if (state.tentReplies === action.tentReplies) {
                return state;
            }
            if (action.tentRepliesLoaded) {
                return {
                    ...state,
                    tentRepliesLoaded: action.tentRepliesLoaded,
                    tentReplies: action.tentReplies
                }
            }
            return state
        default:
            throw new Error('Invalid action type ' + action.type);
    }
}


interface LegendClickObject {
    data: Array<GraphData>
}

function Graph({ state }: { state: ForecastPanelState }) {
    // const renderCount = useRef(0)
    // console.log('Graph render: ', renderCount.current++)

    const [graphState, updateGraphState] = useReducer(graphStateReducer, initialGraphState)

    useEffect(() => {
        (async () => {
            if (state.forecastHorizon === '')
                return
            const fetchedIncomeForecast: FetchResult<IncomeForecast> = await fetchTentIncomeForecast(state.tentId, state.forecastHorizon, state.incomeType)
            updateGraphState({
                type: FETCH_INCOME_FORECAST,
                ...initialGraphState,
                incomeForecastLoaded: fetchedIncomeForecast.success,
                incomeForecast: fetchedIncomeForecast.data,
            })
            const fetchedDailyTribeReplies: FetchResult<Array<DailyTentReplies>> = await fetchDailyTentReplies(state.tile, state.tentId, state.forecastHorizon)
            updateGraphState({
                type: FETCH_DAILY_TRIBE_REPLIES,
                ...initialGraphState,
                tentRepliesLoaded: fetchedDailyTribeReplies.success,
                tentReplies: fetchedDailyTribeReplies.data,
            })
        })()
    }, [state.tentId, state.forecastHorizon, state.incomeType, state.tile, state.lastUpdated])

    const dispatch = useDispatch()
    const onLegendClick = useCallback(({ data }: LegendClickObject) => {
        const timerId = setTimeout(() => {
            const legendsToStore = (data.filter(legend => legend.type === 'bar' && legend.visible === 'legendonly').map(legend => legend.hovertext) as Array<string>)
            dispatch(legendClick(state.tentId, legendsToStore))
            clearTimeout(timerId)
        }, 500)
        return true
    }, [state.tentId, dispatch])

    if (graphState.incomeForecastLoaded || graphState.tentRepliesLoaded) {

        const data: Array<GraphData> = []
        data.push(...getScatters(graphState))
        data.push(...getBars(graphState, state.positionsFilter, state.hiddenLegends))

        return (
            <div className='ForecastGraph'>
                <Plot
                    data={data}
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
                        xaxis: { autorange: true, automargin: true },
                        yaxis: { 'showgrid': true, zeroline: false, autorange: true, automargin: true },
                        barmode: 'stack',
                        paper_bgcolor: 'rgba(0,0,0,0)',
                        plot_bgcolor: 'rgba(0,0,0,0)',
                        autosize: true
                    }}
                    config={{ displayModeBar: false, doubleClick: 'autosize', responsive: true }}
                    onLegendClick={onLegendClick}
                />
            </div>
        )
    }
    return <ForecastMissing />
}
