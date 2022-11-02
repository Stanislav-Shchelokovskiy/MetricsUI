import React, { useState, useReducer, useEffect } from 'react'
import Plot from 'react-plotly.js'
import { Data as GraphData } from 'plotly.js';
import SelectBox, { DropDownOptions } from 'devextreme-react/select-box'
import TagBox, { DropDownOptions as DropDownOptionsTagBox } from 'devextreme-react/tag-box'
import ForecastMissing from './utils/ForecastMissing'
import GetColor from './utils/ColorPalette'

import FetchResult from './dataFetcher/FetchResult'
import { IncomeForecast, FetchTribeIncomeForecast, EMPTY_INCOME_FORECAST } from './dataFetcher/FetchTribeIncomeForecast'
import { DailyTribeReplies, FetchDailyTribeReplies, EMPTY_DAILY_TRIBE_REPLIES } from './dataFetcher/FetchTribeDailyReplies'

interface ForecastSettingsValues {
    dailyForecastHorizons: Array<string>
    tiles: Array<number>
}

interface ForecastSettings {
    forecastHorizon: string
    tile: number
}

interface ForecastParams {
    tribeID: string
    forecastHorizon: string
    incomeType: string
    tile: number
    positionsFilter: Array<string>
}

type ForecastHorizonChangeCallable = (forecastHorizon: string) => void
type TileChangeCallable = (tile: number) => void
type PositionsChangeCallable = (positions: Array<string>) => void

function PositionsSelector({ onPositionsChange }: { onPositionsChange: PositionsChangeCallable }) {
    return (
        <TagBox className='PositionsSelector'
            placeholder='Select positions to filter by...'
            dataSource={['Support', 'Developer', 'EM', 'PM', 'Technical Writer']}
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

function Header(
    {
        dailyForecastHorizons: forecastHorizons,
        tiles,
        forecastHorizon,
        tile,
        onForecastHorizonChange,
        onTileChange,
        onPositionsChange,
    }:
        ForecastSettingsValues &
        ForecastSettings &
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
                onPositionsChange={onPositionsChange} />
        </div>
    )
}

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

function getBars(state: GraphState, positionsFilter: Array<string>): Array<GraphData> {
    if (state.tribeRepliesLoaded) {
        const data: Array<GraphData> = []
        for (const user of state.tribeReplies) {
            data.push(
                {
                    type: 'bar',
                    name: user.user_display_name,
                    x: user.reply_date,
                    y: user.iteration_count,
                    opacity: 0.6,
                    hovertext: user.user_name,
                    hovertemplate: `<b>${user.user_name}</b><br>` + 'Date: %{x}<br>' + 'Count: %{y}<br>' + '<extra></extra>',
                    // marker_color=color_palette.get_legend_color(
                    //     user_name = user_name,
                    //     belonging = belonging,
                    // ),
                    visible: getBarVisibility(
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

function Graph({ tribeID, forecastHorizon, incomeType, tile, positionsFilter }: ForecastParams) {
    console.log(`forecastHorizon = ${forecastHorizon}`)
    console.log(`tile = ${tile}`)

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
            console.log('use effect')
        })()
    }, [tribeID, forecastHorizon, incomeType, tile])

    if (state.incomeForecastLoaded || state.tribeRepliesLoaded) {
        console.log(`incomeForecastLoaded || tribeRepliesLoaded`)

        const data: Array<GraphData> = []
        data.push(...getScatters(state))
        data.push(...getBars(state, positionsFilter))

        console.log(state.incomeForecast)
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
                />
            </div>
        )
    }
    return <ForecastMissing />
}

function Body({ tribeID, forecastHorizon, incomeType, tile, positionsFilter }: ForecastParams) {
    return (
        <div className='ForecastBody'>
            <Graph
                tribeID={tribeID}
                forecastHorizon={forecastHorizon}
                incomeType={incomeType}
                tile={tile}
                positionsFilter={positionsFilter} />
        </div>
    )
}

export default function StrategicForecast(
    {
        tribeID,
        incomeType,
        dailyForecastHorizons,
        tiles
    }:
        { tribeID: string, incomeType: string } &
        ForecastSettingsValues
) {
    const [forecastHorizon, setForecastHorizon] = useState<string>(dailyForecastHorizons[0])
    const [tile, setTile] = useState<number>(tiles[tiles.length % 2])
    const [positionsFilter, setPositionsFilter] = useState<Array<string>>([])

    return (
        <div className='ForforecastHorizonecastContainer'>
            <Header
                dailyForecastHorizons={dailyForecastHorizons}
                tiles={tiles}
                forecastHorizon={forecastHorizon}
                tile={tile}
                onForecastHorizonChange={setForecastHorizon}
                onTileChange={setTile}
                onPositionsChange={setPositionsFilter} />
            <Body
                tribeID={tribeID}
                forecastHorizon={forecastHorizon}
                incomeType={incomeType}
                tile={tile}
                positionsFilter={positionsFilter} />
        </div>
    )
}
