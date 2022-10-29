import React, { useState, useEffect } from 'react'
import Plot from 'react-plotly.js'
import SelectBox, { DropDownOptions } from 'devextreme-react/select-box'
import TagBox, { DropDownOptions as DropDownOptionsTagBox } from 'devextreme-react/tag-box'
import { FetchTribeIncomeForecast, emptyIncomeForecast, FetchResult } from './TribeLoadServer'
import { IncomeForecast } from './Forecaster'
import LoadIndicator from './utils/LoadIndicator'
import GetColor from './utils/ColorPalette'

interface ForecastSettingsValues {
    forecastHorizons: Array<string>
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
        forecastHorizons,
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

function Graph({ tribeID, forecastHorizon, incomeType, tile }: ForecastParams) {
    const [{ success: forecastLoaded, data: income_Forecast }, setForecastLoaded] = useState<FetchResult<Array<IncomeForecast>>>(emptyIncomeForecast)

    useEffect(() => {
        (async () => {
            const fetchResult: FetchResult<Array<IncomeForecast>> = await FetchTribeIncomeForecast({ tribeID, forecastHorizon, incomeType })
            setForecastLoaded(fetchResult)
            console.log('use effect')
        })()
    }, [])

    if (forecastLoaded) {
        console.log(`forecastLoaded ${forecastLoaded}`)
        const ds = income_Forecast.map(forecast => new Date(forecast.ds))
        const y = income_Forecast.map(forecast => forecast.y)
        const yhat_rmse_upper = income_Forecast.map(forecast => forecast.yhat_rmse_upper)
        const yhat = income_Forecast.map(forecast => forecast.yhat)
        const yhat_rmse_lower = income_Forecast.map(forecast => forecast.yhat_rmse_lower)

        const yaxisMin = 0
        const yaxisMax = Math.max(
            Math.max(...yhat_rmse_upper),
            Math.max(...y),
            // tribe_members_replies.groupby(by=TribeDailyRepliesMeta.reply_date)[TribeDailyRepliesMeta.iteration_count].sum().max()
        ) + 5

        let xaxisMin = new Date(ds.reduce((a, b) => a < b ? a : b))
        xaxisMin.setDate(xaxisMin.getDate() - 1)
        let xaxisMax = new Date(ds.reduce((a, b) => a > b ? a : b))
        xaxisMax.setDate(xaxisMax.getDate() + 1)


        console.log(income_Forecast)
        return (
            <div className='ForecastGraph'>
                <Plot
                    data={[
                        {
                            type: 'scatter',
                            x: ds,
                            y: y,
                            name: 'fact',
                            line: { shape: 'spline', color: GetColor('fact') },
                            hovertemplate: 'Actual income: <b>%{y}</b><br>Date: %{x}<br><extra></extra>',
                            connectgaps: true,
                        },
                        {
                            type: 'scatter',
                            x: ds,
                            y: yhat_rmse_upper,
                            name: 'Income forecast (upper boundary)',
                            showlegend: false,
                            line: { shape: 'spline', color: GetColor('forecast_boundary') },
                            hovertemplate: 'Income forecast (upper boundary): <b>%{y}</b><br>Date: %{x}<br><extra></extra>',
                            connectgaps: true,
                        },
                        {
                            type: 'scatter',
                            x: ds,
                            y: yhat,
                            name: 'Income forecast',
                            fill: 'tonexty',
                            line: { shape: 'spline', color: GetColor('forecast') },
                            fillcolor: GetColor('forecast_fill'),
                            hovertemplate: 'Income forecast: <b>%{y}</b><br>Date: %{x}<br><extra></extra>',
                            connectgaps: true,
                        },
                        {
                            type: 'scatter',
                            x: ds,
                            y: yhat_rmse_lower,
                            name: 'Income forecast (lower boundary)',
                            fill: 'tonexty',
                            showlegend: false,
                            line: { shape: 'spline', color: GetColor('forecast_boundary') },
                            fillcolor: GetColor('forecast_fill'),
                            hovertemplate: 'Income forecast (lower boundary): <b>%{y}</b><br>Date: %{x}<br><extra></extra>',
                            connectgaps: true,
                        }
                        // { type: 'bar', x: [2, 3], y: [5, 3] },
                    ]}
                    layout={{
                        height: 400, width: 1510, margin: {
                            t: 10,
                            l: 30,
                            r: 10,
                            b: 30
                        },
                        yaxis: { range: [yaxisMin, yaxisMax] },
                        xaxis: { range: [xaxisMin, xaxisMax] },
                        barmode: 'stack',
                        paper_bgcolor: 'rgba(0,0,0,0)',
                        plot_bgcolor: 'rgba(0,0,0,0)',
                    }}
                    config={{ displayModeBar: false }}
                />
            </div>
        )
    }
    return <LoadIndicator />
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
        forecastHorizons,
        tiles
    }:
        { tribeID: string, incomeType: string } &
        ForecastSettingsValues
) {
    const [forecastHorizon, setForecastHorizon] = useState<string>(forecastHorizons[0])
    const [tile, setTile] = useState<number>(tiles[tiles.length % 2])
    console.log(`forecastHorizon = ${forecastHorizon}`)
    console.log(`tile = ${tile}`)


    return (
        <div className='ForforecastHorizonecastContainer'>
            <Header
                forecastHorizons={forecastHorizons}
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
