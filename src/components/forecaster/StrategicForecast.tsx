import React, { useState, useReducer, useEffect } from 'react'
import Plot from 'react-plotly.js'
import SelectBox, { DropDownOptions } from 'devextreme-react/select-box'
import TagBox, { DropDownOptions as DropDownOptionsTagBox } from 'devextreme-react/tag-box'
import ForecastMissing from './utils/ForecastMissing'
import GetColor from './utils/ColorPalette'

import FetchResult from './dataFetcher/FetchResult'
import { IncomeForecast, FetchTribeIncomeForecast, emptyIncomeForecast } from './dataFetcher/FetchTribeIncomeForecast'
import { DailyTribeReplies, FetchDailyTribeReplies, emptyDailyTribeReplies } from './dataFetcher/FetchTribeDailyReplies'

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
}

type ForecastHorizonChangeCallable = (forecastHorizon: string) => void
type TileChangeCallable = (tile: number) => void

function PositionsSelector() {
    return (
        <TagBox className='PositionsSelector'
            placeholder='Select positions to filter by...'
            dataSource={['Support', 'Developer']}
            multiline={true}
            selectAllMode='allPages'
            showSelectionControls={true}
            showDropDownButton={false}
            label='Display only positions'
            labelMode='static'>
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
        onTileChange
    }:
        ForecastSettingsValues &
        ForecastSettings &
        { onForecastHorizonChange: ForecastHorizonChangeCallable } &
        { onTileChange: TileChangeCallable }
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
            <PositionsSelector />
        </div>
    )
}

interface State {
    incomeForecastLoaded: boolean
    incomeForecast: IncomeForecast
    tribeRepliesLoaded: boolean
    tribeReplies: Array<DailyTribeReplies>
}

interface Action {
    type: string,
    payload: any,
}

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'fetchIncomeForecast':
            if (state.incomeForecast === action.payload) {
                return state;
            }
            return { ...state, incomeForecast: action.payload }
        case 'fetchDailyTribeReplies':
            return { ...state, tribeReplies: action.payload }
        default:
            throw new Error('Invalid action type ' + action.type);
    }
}

function Graph({ tribeID, forecastHorizon, incomeType, tile }: ForecastParams) {
    console.log(`forecastHorizon = ${forecastHorizon}`)
    console.log(`tile = ${tile}`)

    const initialState: State = {
        incomeForecastLoaded: emptyIncomeForecast.success,
        incomeForecast: emptyIncomeForecast.data,
        tribeRepliesLoaded: emptyDailyTribeReplies.success,
        tribeReplies: emptyDailyTribeReplies.data,
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        (async () => {
            const fetchedIncomeForecast: FetchResult<IncomeForecast> = await FetchTribeIncomeForecast({ tribeID, forecastHorizon, incomeType })
            dispatch({ type: 'fetchIncomeForecast', payload: fetchedIncomeForecast })
            const fetchedDailyTribeReplies: FetchResult<Array<DailyTribeReplies>> = await FetchDailyTribeReplies({ tile, tribeID, forecastHorizon })
            dispatch({ type: 'fetchDailyTribeReplies', payload: fetchedDailyTribeReplies })
            console.log('use effect')
        })()
    }, [tribeID, forecastHorizon, incomeType, tile])

    if (state.incomeForecastLoaded || state.tribeRepliesLoaded) {
        console.log(`incomeForecastLoaded || tribeRepliesLoaded`)

        const yaxisMin = 0
        const yaxisMax = Math.max(
            Math.max(...state.incomeForecast.yhat_rmse_upper),
            Math.max(...state.incomeForecast.y),
            // tribe_members_replies.groupby(by=TribeDailyRepliesMeta.reply_date)[TribeDailyRepliesMeta.iteration_count].sum().max()
        ) + 5

        let xaxisMin = new Date(state.incomeForecast.ds.reduce((a, b) => a < b ? a : b))
        xaxisMin.setDate(xaxisMin.getDate() - 1)
        let xaxisMax = new Date(state.incomeForecast.ds.reduce((a, b) => a > b ? a : b))
        xaxisMax.setDate(xaxisMax.getDate() + 1)

        console.log(state.incomeForecast)
        return (
            <div className='ForecastGraph'>
                <Plot
                    data={[{
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
                        //{ type: 'bar', x: [2, 3], y: [5, 3] }
                    ]}
                    layout={{
                        height: 400, width: 1510, margin: {
                            t: 10,
                            l: 30,
                            r: 10,
                            b: 30
                        },
                        yaxis: { range: [yaxisMin, yaxisMax], 'showgrid': true, zeroline: false },
                        xaxis: { range: [xaxisMin, xaxisMax], 'showgrid': false },
                        barmode: 'stack',
                        paper_bgcolor: 'rgba(0,0,0,0)',
                        plot_bgcolor: 'rgba(0,0,0,0)',
                    }}
                    config={{ displayModeBar: false }}
                />
            </div>
        )
    }
    return <ForecastMissing />
}

function Body({ tribeID, forecastHorizon, incomeType, tile }: ForecastParams) {
    return (
        <div className='ForecastBody'>
            <Graph
                tribeID={tribeID}
                forecastHorizon={forecastHorizon}
                incomeType={incomeType}
                tile={tile} />
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

    return (
        <div className='ForforecastHorizonecastContainer'>
            <Header
                dailyForecastHorizons={dailyForecastHorizons}
                tiles={tiles}
                forecastHorizon={forecastHorizon}
                tile={tile}
                onForecastHorizonChange={setForecastHorizon}
                onTileChange={setTile} />
            <Body
                tribeID={tribeID}
                forecastHorizon={forecastHorizon}
                incomeType={incomeType}
                tile={tile} />
        </div>
    )
}
