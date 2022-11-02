import React, { useState, useEffect } from 'react'
import Plot from 'react-plotly.js'
import SelectBox, { DropDownOptions } from 'devextreme-react/select-box'
import ForecastMissing from './utils/ForecastMissing'

import FetchResult from './dataFetcher/FetchResult'
import { HourlyTacticalForecast, emptyTacticalForecast, FetchTacticalForecast } from './dataFetcher/FetchTacticalForecast'
import GetColor from './utils/ColorPalette'


interface ForecastParams {
    tribeID: string
    incomeType: string
}

interface ForecastSettingsValues {
    replyTypes: Array<string>
}

interface ForecastSettings {
    replyType: string
}

type ReplyTypeChangeCallable = (replyType: string) => void

function Header(
    {
        replyTypes,
        replyType,
        onReplyTypeChange
    }:
        ForecastSettingsValues &
        ForecastSettings &
        { onReplyTypeChange: ReplyTypeChangeCallable }
) {
    return (
        <div className='ForecastHeader'>
            <SelectBox
                dataSource={replyTypes}
                defaultValue={replyType}
                onValueChange={onReplyTypeChange}
                label='Forecast Mode'
                labelMode='static'
                width={'22%'}>
                <DropDownOptions
                    hideOnOutsideClick={true}
                    hideOnParentScroll={true}
                    container='#tribe_accordion' />
            </SelectBox>
        </div>
    )
}

function Metric() {
    return (
        <div className='TacticalForecastMetric'>
            <label>Expected to close today</label>
            <label style={{ fontSize: '2em' }} >+14</label>
            {/* <Plot
                data={[
                    { type: 'bar', x: [1], y: [2] },
                ]}
                layout={{ width: 300, height: 300, title: 'Will close today' }}
            /> */}
        </div >
    )
}

function Graph({ tribeID, incomeType, replyType }: ForecastParams & ForecastSettings) {
    console.log(`replyType = ${replyType}`)
    console.log(`tile = ${incomeType}`)

    const [{ success: forecastLoaded, data: tacticalForecast }, setForecastLoaded] = useState<FetchResult<HourlyTacticalForecast>>(emptyTacticalForecast)

    useEffect(() => {
        (async () => {
            const fetchResult: FetchResult<HourlyTacticalForecast> = await FetchTacticalForecast({ tribeID, incomeType, replyType })
            setForecastLoaded(fetchResult)
            console.log('use effect')
        })()
    }, [tribeID, incomeType, replyType])

    if (forecastLoaded) {
        console.log(`forecastLoaded ${forecastLoaded}`)

        const dtNow = new Date().getTime()
        const maxY = Math.max(...tacticalForecast.yhat_rmse_upper)

        return (
            <div className='ForecastGraph'>
                <Plot
                    data={[
                        {
                            type: 'scatter',
                            x: tacticalForecast.ds,
                            y: tacticalForecast.yhat,
                            name: 'forecast_transparent',
                            showlegend: false,
                            line: { shape: 'spline', color: GetColor('transparent') },
                            hoverinfo: 'none',
                            connectgaps: true,
                        },
                        {
                            type: 'scatter',
                            x: tacticalForecast.ds,
                            y: tacticalForecast.upper_replies,
                            name: 'upper_replies',
                            showlegend: false,
                            line: { shape: 'spline', color: GetColor('transparent') },
                            fill: 'tonexty',
                            fillcolor: GetColor('tribe_replies_greater_fill'),
                            mode: 'lines',
                            hoverinfo: 'none',
                            connectgaps: true,
                        },
                        {
                            type: 'scatter',
                            x: tacticalForecast.ds,
                            y: tacticalForecast.iteration_count,
                            name: 'tribe_replies',
                            showlegend: false,
                            line: { shape: 'spline', color: GetColor('tribe_replies') },
                            fill: 'tonexty',
                            fillcolor: GetColor('tribe_replies_lower_fill'),
                            mode: 'lines',
                            hovertemplate: 'Tribe replies: <b>%{y}</b><extra></extra>',
                            connectgaps: true,
                        },
                        {
                            type: 'scatter',
                            x: tacticalForecast.ds,
                            y: tacticalForecast.yhat_rmse_upper,
                            name: 'forecast_upper',
                            showlegend: false,
                            line: { shape: 'spline', color: GetColor('forecast_boundary') },
                            mode: 'lines',
                            hovertemplate: 'Income forecast (upper boundary): <b>%{y}</b><extra></extra>',
                            connectgaps: true,
                        },
                        {
                            type: 'scatter',
                            x: tacticalForecast.ds,
                            y: tacticalForecast.yhat,
                            name: 'forecast',
                            showlegend: false,
                            fill: 'tonexty',
                            line: { shape: 'spline', color: GetColor('forecast') },
                            fillcolor: GetColor('forecast_fill'),
                            hovertemplate: 'Income forecast: <b>%{y}</b><br>Date: %{x}<br><extra></extra>',
                            connectgaps: true,
                            mode: 'lines',
                        },
                        {
                            type: 'scatter',
                            x: tacticalForecast.ds,
                            y: tacticalForecast.yhat_rmse_lower,
                            name: 'forecast_lower',
                            fill: 'tonexty',
                            showlegend: false,
                            line: { shape: 'spline', color: GetColor('forecast_boundary') },
                            fillcolor: GetColor('forecast_fill'),
                            mode: 'lines',
                            hovertemplate: 'Income forecast (lower boundary): <b>%{y}</b><extra></extra>',
                            connectgaps: true,
                        },
                    ]}
                    layout={{
                        height: 300,
                        width: 1200,
                        margin: { t: 10, l: 30, r: 10 },
                        xaxis: { 'showgrid': false, autorange: true, automargin: false },
                        yaxis: { 'showgrid': true, zeroline: false, autorange: true, automargin: false },
                        autosize: true,
                        paper_bgcolor: 'rgba(0,0,0,0)',
                        plot_bgcolor: 'rgba(0,0,0,0)',
                        hovermode: 'x',
                        shapes: [{
                            type: 'line',
                            x0: dtNow,
                            x1: dtNow,
                            y0: 0,
                            y1: maxY,
                            line: { color: GetColor('vline'), width: 3, dash: 'dash' }
                        },]
                    }}
                    config={{ displayModeBar: false, doubleClick: 'autosize' }}
                />
            </div>
        )
    }
    return <ForecastMissing />
}

function Body({ tribeID, incomeType, replyType }: ForecastParams & ForecastSettings) {
    return (
        <div className='ForecastBody'>
            <Graph
                tribeID={tribeID}
                incomeType={incomeType}
                replyType={replyType} />
            <Metric />
        </div>
    )
}

export default function TacticalForecast(
    {
        tribeID,
        incomeType,
        replyTypes
    }:
        ForecastParams &
        ForecastSettingsValues
) {
    const [replyType, setReplyType] = useState<string>(replyTypes[0])
    console.log(`replyType = ${replyType}`)

    return (
        <div className='ForecastContainer'>
            <Header
                replyTypes={replyTypes}
                replyType={replyType}
                onReplyTypeChange={setReplyType} />
            <Body
                tribeID={tribeID}
                incomeType={incomeType}
                replyType={replyType} />
        </div>
    )
}
