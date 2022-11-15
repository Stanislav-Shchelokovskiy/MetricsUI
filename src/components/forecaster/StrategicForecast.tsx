import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react'
import Plot from 'react-plotly.js'
import { Data as GraphData } from 'plotly.js'
import SelectBox, { DropDownOptions } from 'devextreme-react/select-box'
import TagBox, { DropDownOptions as DropDownOptionsTagBox } from 'devextreme-react/tag-box'
import ForecastMissing from './utils/ForecastMissing'
import GetColor from './utils/ColorPalette'

import FetchResult from './network_resource_fetcher/FetchResult'
import { fetchForecastHorizons, fetchTiles } from './network_resource_fetcher/FetchForecastSettingsValues'
import { IncomeForecast, FetchTribeIncomeForecast, EMPTY_INCOME_FORECAST } from './network_resource_fetcher/FetchTribeIncomeForecast'
import { DailyTribeReplies, FetchDailyTribeReplies, EMPTY_DAILY_TRIBE_REPLIES } from './network_resource_fetcher/FetchTribeDailyReplies'
import getValueFromStoreOrDefault, { saveValueToStore } from './utils/LocalStorage'
import {
    useForecasterDispatch,
    useForecasterSelector,
    ForecasterStore
} from './store/ForecasterStore'

import { ForecasterState } from './store/ForecasterReducer'
import { changeForecastHorizon, changeTile, changePositionsFilter, legendClick } from './store/Actions'
import { INITIAL_STRATEGIC_FORECAST_STATE, StrategicForecastState } from './store/TribeContainerReducer'



function PositionsSelector({ tribeId }: { tribeId: string }) {
    const positions = useMemo<Array<string>>(() => { return ['Support', 'Developer', 'EM', 'PM', 'Technical Writer'] }, [])
    const positionsKey = `${tribeId}_positionsKey`
    const defaultPositions = getValueFromStoreOrDefault<Array<string>>(positionsKey, [], positions)

    const dispatch = useForecasterDispatch()
    const onPositionsChange = useCallback((positions: Array<string>) => {
        saveValueToStore(positionsKey, positions)
        dispatch(changePositionsFilter(tribeId, positions))
    }, [positionsKey, tribeId, dispatch])

    return (
        <TagBox className='PositionsSelector'
            placeholder='Select positions to filter by...'
            dataSource={positions}
            defaultValue={defaultPositions}
            multiline={true}
            selectAllMode='allPages'
            showSelectionControls={true}
            showDropDownButton={false}
            label='Display only positions'
            labelMode='static'
            onValueChange={onPositionsChange}>
            <DropDownOptionsTagBox
                hideOnOutsideClick={true}
                hideOnParentScroll={true}
                container='#tribe_accordion' />
        </TagBox>
    )
}

const ForecastSettingsPanel = React.memo(function ForecastSettingsPanel({ state }: { state: StrategicForecastState }) {

    const [forecastHorizons, setForecastHorizons] = useState<Array<string>>([])
    const [tiles, setTiles] = useState<Array<number>>([])

    useEffect(() => {
        (async () => {
            const horizonsFetchResult: FetchResult<Array<string>> = await fetchForecastHorizons()
            if (horizonsFetchResult.success) {
                setForecastHorizons(horizonsFetchResult.data)
            }
            const tilesFetchResult: FetchResult<Array<number>> = await fetchTiles()
            if (tilesFetchResult.success) {
                setTiles(tilesFetchResult.data)
            }
        })()
    }, [])

    const dispatch = useForecasterDispatch()

    const forecastHorizonKey = `${state.tribeId}_forecastHorizon`
    const defaultForecastHorizon = getValueFromStoreOrDefault<string>(forecastHorizonKey, state.forecastHorizon, forecastHorizons)

    const onForecastHorizonChange = useCallback((forecastHorizon: string) => {
        saveValueToStore(forecastHorizonKey, forecastHorizon)
        dispatch(changeForecastHorizon(state.tribeId, forecastHorizon))
    }, [forecastHorizonKey, state.tribeId, dispatch])

    const tileKey = `${state.tribeId}_tile`
    const defaultTile = getValueFromStoreOrDefault<number>(tileKey, state.tile, tiles)

    const onTileChange = useCallback((tile: number) => {
        saveValueToStore(tileKey, tile)
        dispatch(changeTile(state.tribeId, tile))
    }, [tileKey, state.tribeId, dispatch])




    return (
        <div className='ForecastHeader'>
            <SelectBox
                dataSource={forecastHorizons}
                defaultValue={defaultForecastHorizon}
                onValueChange={onForecastHorizonChange}
                label='Forecast Horizon'
                labelMode='static'>
                <DropDownOptions
                    hideOnOutsideClick={true}
                    hideOnParentScroll={true}
                    container='#tribe_accordion' />
            </SelectBox>
            <SelectBox
                dataSource={tiles}
                defaultValue={defaultTile}
                onValueChange={onTileChange}
                label='Performance Level'
                labelMode='static'>
                <DropDownOptions
                    hideOnOutsideClick={true}
                    hideOnParentScroll={true}
                    container='#tribe_accordion' />
            </SelectBox>
            <PositionsSelector tribeId={state.tribeId} />
        </div>
    )
})

function getScatters(state: GraphState): Array<GraphData> {
    if (state.incomeForecastLoaded) {
        return [{
            type: 'scatter',
            x: state.incomeForecast.ds,
            y: state.incomeForecast.y,
            name: 'fact',
            line: { shape: 'spline', color: GetColor('fact') },
            hovertemplate: 'Actual income: <b>%{y}</b><br>Date: %{x}<br><extra></extra>',
            connectgaps: true,
        },
        {
            type: 'scatter',
            x: state.incomeForecast.ds,
            y: state.incomeForecast.yhat_rmse_upper,
            name: 'Income forecast (upper boundary)',
            showlegend: false,
            line: { shape: 'spline', color: GetColor('forecast_boundary') },
            hovertemplate: 'Income forecast (upper boundary): <b>%{y}</b><br>Date: %{x}<br><extra></extra>',
            connectgaps: true,
        },
        {
            type: 'scatter',
            x: state.incomeForecast.ds,
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
            x: state.incomeForecast.ds,
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

function getBars(state: GraphState, positionsFilter: Array<string>, hiddenLegends: Array<string>): Array<GraphData> {
    if (state.tribeRepliesLoaded) {

        const data: Array<GraphData> = []
        for (const user of state.tribeReplies) {
            const visible = positionsFilter.length === 0 && hiddenLegends.includes(user.user_name) ? 'legendonly' : undefined
            data.push(
                {
                    type: 'bar',
                    name: user.user_display_name,
                    x: user.reply_date,
                    y: user.iteration_count,
                    opacity: 0.6,
                    hovertext: user.user_name,
                    hovertemplate: `<b>${user.user_name}</b><br>Date: %{x}<br>Count: %{y}<br><extra></extra>`,
                    visible: visible || getBarVisibility(
                        user.tribe_belonging_status,
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


interface GraphState {
    incomeForecastLoaded: boolean
    incomeForecast: IncomeForecast
    tribeRepliesLoaded: boolean
    tribeReplies: Array<DailyTribeReplies>
}

const initialGraphState: GraphState = {
    incomeForecastLoaded: EMPTY_INCOME_FORECAST.success,
    incomeForecast: EMPTY_INCOME_FORECAST.data,
    tribeRepliesLoaded: EMPTY_DAILY_TRIBE_REPLIES.success,
    tribeReplies: EMPTY_DAILY_TRIBE_REPLIES.data,
}

interface GraphAction {
    type: string
    incomeForecastLoaded: boolean
    incomeForecast: IncomeForecast
    tribeRepliesLoaded: boolean
    tribeReplies: Array<DailyTribeReplies>
}

function graphStateReducer(state: GraphState, action: GraphAction): GraphState {
    switch (action.type) {
        case 'fetchIncomeForecast':
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
        case 'fetchDailyTribeReplies':
            if (state.tribeReplies === action.tribeReplies) {
                return state;
            }
            if (action.tribeRepliesLoaded) {
                return {
                    ...state,
                    tribeRepliesLoaded: action.tribeRepliesLoaded,
                    tribeReplies: action.tribeReplies
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

function Graph(
    {
        tribeId,
        forecastHorizon,
        incomeType,
        tile,
        positionsFilter,
        lastUpdated
    }:
        {
            tribeId: string,
            forecastHorizon: string,
            incomeType: string,
            tile: number,
            positionsFilter: Array<string>,
            lastUpdated: number
        }) {

    const [state, dispatch] = useReducer(graphStateReducer, initialGraphState)

    useEffect(() => {
        (async () => {
            const fetchedIncomeForecast: FetchResult<IncomeForecast> = await FetchTribeIncomeForecast({ tribeID: tribeId, forecastHorizon, incomeType })
            dispatch({
                type: 'fetchIncomeForecast',
                ...initialGraphState,
                incomeForecastLoaded: fetchedIncomeForecast.success,
                incomeForecast: fetchedIncomeForecast.data,
            })
            const fetchedDailyTribeReplies: FetchResult<Array<DailyTribeReplies>> = await FetchDailyTribeReplies({ tile, tribeID: tribeId, forecastHorizon })
            dispatch({
                type: 'fetchDailyTribeReplies',
                ...initialGraphState,
                tribeRepliesLoaded: fetchedDailyTribeReplies.success,
                tribeReplies: fetchedDailyTribeReplies.data,
            })
        })()
    }, [tribeId, forecastHorizon, incomeType, tile, lastUpdated])

    const hiddenLegendsKey = `${tribeId}_hiddenLegends`
    const forecasterDispatch = useForecasterDispatch()
    const onLegendClick = useCallback(({ data }: LegendClickObject) => {
        setTimeout(() => {
            const legendsToStore = (data.filter(legend => legend.type === 'bar' && legend.visible === 'legendonly').map(legend => legend.hovertext) as Array<string>)
            saveValueToStore(hiddenLegendsKey, legendsToStore)
            forecasterDispatch(legendClick(tribeId, legendsToStore))
        }, 500)
        return true
    }, [hiddenLegendsKey, tribeId, forecasterDispatch])
    const hiddenLegends = getValueFromStoreOrDefault<Array<string>>(hiddenLegendsKey, [])

    if (state.incomeForecastLoaded || state.tribeRepliesLoaded) {

        const data: Array<GraphData> = []
        data.push(...getScatters(state))
        data.push(...getBars(state, positionsFilter, hiddenLegends))

        return (
            <div className='ForecastGraph'>
                <Plot
                    data={data}
                    layout={{
                        height: 400, width: 1510, margin: {
                            t: 10,
                            l: 30,
                            r: 10,
                            b: 30
                        },
                        xaxis: { autorange: true, automargin: false },
                        yaxis: { 'showgrid': true, zeroline: false, autorange: true, automargin: false },
                        barmode: 'stack',
                        paper_bgcolor: 'rgba(0,0,0,0)',
                        plot_bgcolor: 'rgba(0,0,0,0)',
                        autosize: true
                    }}
                    config={{ displayModeBar: false, doubleClick: 'autosize' }}
                    onLegendClick={onLegendClick}
                />
            </div>
        )
    }
    return <ForecastMissing />
}

const ForecastPanel = React.memo(function ForecastPanel(
    {
        tribeId,
        forecastHorizon,
        incomeType,
        tile,
        positionsFilter,
        lastUpdated
    }: {
        tribeId: string
        forecastHorizon: string
        incomeType: string
        tile: number
        positionsFilter: Array<string>
        lastUpdated: number
    }) {
    return (
        <div className='ForecastBody'>
            <Graph
                tribeId={tribeId}
                forecastHorizon={forecastHorizon}
                incomeType={incomeType}
                tile={tile}
                positionsFilter={positionsFilter}
                lastUpdated={lastUpdated} />
        </div>
    )
})


export default function StrategicForecast({ tribeId }: { tribeId: string }) {
    const strategicForecastState: StrategicForecastState = useForecasterSelector((state: ForecasterStore) => state.strategicForecast.find(x => x.tribeId === tribeId) || INITIAL_STRATEGIC_FORECAST_STATE)
    const forecasterState: ForecasterState = useForecasterSelector((state: ForecasterStore) => state.forecaster)

    return (
        <div className='ForforecastHorizonecastContainer'>
            <ForecastSettingsPanel state={strategicForecastState} />
            <ForecastPanel
                tribeId={strategicForecastState.tribeId}
                forecastHorizon={strategicForecastState.forecastHorizon}
                incomeType={forecasterState.incomeType}
                tile={strategicForecastState.tile}
                positionsFilter={strategicForecastState.positionsFilter}
                lastUpdated={forecasterState.lastUpdated} />
        </div>
    )
}
