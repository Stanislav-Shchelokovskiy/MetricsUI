import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react'
import Plot from 'react-plotly.js'
import { Data as GraphData } from 'plotly.js'
import SelectBox, { DropDownOptions } from 'devextreme-react/select-box'
import TagBox, { DropDownOptions as DropDownOptionsTagBox } from 'devextreme-react/tag-box'
import ForecastMissing from './utils/ForecastMissing'
import GetColor from './utils/ColorPalette'
import { ForecastMainParams } from './Tribe'

import FetchResult from './network_resource_fetcher/FetchResult'
import { IncomeForecast, FetchTribeIncomeForecast, EMPTY_INCOME_FORECAST } from './network_resource_fetcher/FetchTribeIncomeForecast'
import { DailyTribeReplies, FetchDailyTribeReplies, EMPTY_DAILY_TRIBE_REPLIES } from './network_resource_fetcher/FetchTribeDailyReplies'
import getValueFromStoreOrDefault, { saveValueToStore } from './utils/LocalStorage'



function PositionsSelector({ positions, positionsFilter, onPositionsChange }: { positions: Array<string>, positionsFilter: Array<string>, onPositionsChange: PositionsChangeCallable }) {
    return (
        <TagBox className='PositionsSelector'
            placeholder='Select positions to filter by...'
            dataSource={positions}
            defaultValue={positionsFilter}
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

const ForecastSettingsPanel = React.memo(function ForecastSettingsPanel(
    {
        forecastHorizons,
        tiles,
        forecastHorizon,
        tile,
        positions,
        positionsFilter,
        onForecastHorizonChange,
        onTileChange,
        onPositionsChange,
    }:
        ForecastSettingsValues &
        ForecastSettings &
        { positions: Array<string> } &
        { positionsFilter: Array<string> } &
        { onForecastHorizonChange: ForecastHorizonChangeCallable } &
        { onTileChange: TileChangeCallable } &
        { onPositionsChange: PositionsChangeCallable }
) {
    return (
        <div className='ForecastHeader'>
            <SelectBox
                dataSource={forecastHorizons}
                defaultValue={forecastHorizon}
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
                defaultValue={tile}
                onValueChange={onTileChange}
                label='Performance Level'
                labelMode='static'>
                <DropDownOptions
                    hideOnOutsideClick={true}
                    hideOnParentScroll={true}
                    container='#tribe_accordion' />
            </SelectBox>
            <PositionsSelector
                positions={positions}
                positionsFilter={positionsFilter}
                onPositionsChange={onPositionsChange} />
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

function Graph({ tribeID, forecastHorizon, incomeType, tile, positionsFilter, lastUpdate }: ForecastParams) {

    const [state, dispatch] = useReducer(graphStateReducer, initialGraphState)

    useEffect(() => {
        (async () => {
            const fetchedIncomeForecast: FetchResult<IncomeForecast> = await FetchTribeIncomeForecast({ tribeID, forecastHorizon, incomeType })
            dispatch({
                type: 'fetchIncomeForecast',
                ...initialGraphState,
                incomeForecastLoaded: fetchedIncomeForecast.success,
                incomeForecast: fetchedIncomeForecast.data,
            })
            const fetchedDailyTribeReplies: FetchResult<Array<DailyTribeReplies>> = await FetchDailyTribeReplies({ tile, tribeID, forecastHorizon })
            dispatch({
                type: 'fetchDailyTribeReplies',
                ...initialGraphState,
                tribeRepliesLoaded: fetchedDailyTribeReplies.success,
                tribeReplies: fetchedDailyTribeReplies.data,
            })
        })()
    }, [tribeID, forecastHorizon, incomeType, tile, lastUpdate])

    const hiddenLegendsKey = `${tribeID}_hiddenLegends`
    const onLegendClick = useCallback(({ data }: LegendClickObject) => {
        setTimeout(() => {
            const legendsToStore = data.filter(legend => legend.type === 'bar' && legend.visible === 'legendonly').map(legend => legend.hovertext)
            saveValueToStore(hiddenLegendsKey, legendsToStore)
        }, 500)
        return true
    }, [hiddenLegendsKey])
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

const ForecastPanel = React.memo(function ForecastPanel({ tribeID, forecastHorizon, lastUpdate, incomeType, tile, positionsFilter }: ForecastParams) {
    return (
        <div className='ForecastBody'>
            <Graph
                tribeID={tribeID}
                forecastHorizon={forecastHorizon}
                incomeType={incomeType}
                tile={tile}
                positionsFilter={positionsFilter}
                lastUpdate={lastUpdate} />
        </div>
    )
})


type ForecastHorizonChangeCallable = (forecastHorizon: string) => void
type TileChangeCallable = (tile: number) => void
type PositionsChangeCallable = (positions: Array<string>) => void

interface ForecastSettings {
    forecastHorizon: string
    tile: number
}

interface ForecastSettingsValues {
    forecastHorizons: Array<string>
    tiles: Array<number>
}

interface ForecastParams extends ForecastMainParams, ForecastSettings {
    positionsFilter: Array<string>
}

export type StrategicForecastState = ForecastMainParams & ForecastSettings & ForecastSettingsValues


export default function StrategicForecast({ state }: { state: StrategicForecastState }) {

    const forecastHorizonKey = `${state.tribeID}_forecastHorizon`
    const defaultForecastHorizon = getValueFromStoreOrDefault<string>(forecastHorizonKey, state.forecastHorizon, state.forecastHorizons)
    const [forecastHorizon, setForecastHorizon] = useState<string>(defaultForecastHorizon)
    const onForecastHorizonChange: ForecastHorizonChangeCallable = useCallback((forecastHorizon: string) => {
        saveValueToStore(forecastHorizonKey, forecastHorizon)
        setForecastHorizon(forecastHorizon)
    }, [forecastHorizonKey])

    const tileKey = `${state.tribeID}_tile`
    const defaultTile = getValueFromStoreOrDefault<number>(tileKey, state.tile, state.tiles)
    const [tile, setTile] = useState<number>(defaultTile)
    const onTileChange: TileChangeCallable = useCallback((tile: number) => {
        saveValueToStore(tileKey, tile)
        setTile(tile)
    }, [tileKey])

    const positions = useMemo<Array<string>>(() => { return ['Support', 'Developer', 'EM', 'PM', 'Technical Writer'] }, [])
    const positionsKey = `${state.tribeID}_positionsKey`
    const defaultPositions = getValueFromStoreOrDefault<Array<string>>(positionsKey, [], positions)
    const [positionsFilter, setPositionsFilter] = useState<Array<string>>(defaultPositions)
    const onPositionsChange: PositionsChangeCallable = useCallback((positions: Array<string>) => {
        saveValueToStore(positionsKey, positions)
        setPositionsFilter(positions)
    }, [positionsKey])

    return (
        <div className='ForforecastHorizonecastContainer'>
            <ForecastSettingsPanel
                forecastHorizons={state.forecastHorizons}
                tiles={state.tiles}
                forecastHorizon={forecastHorizon}
                tile={tile}
                positions={positions}
                positionsFilter={positionsFilter}
                onForecastHorizonChange={onForecastHorizonChange}
                onTileChange={onTileChange}
                onPositionsChange={onPositionsChange} />
            <ForecastPanel
                tribeID={state.tribeID}
                forecastHorizon={forecastHorizon}
                incomeType={state.incomeType}
                tile={tile}
                positionsFilter={positionsFilter}
                lastUpdate={state.lastUpdate} />
        </div>
    )
}
