import React, { useState, useEffect, useCallback, useRef } from 'react'
import Plot from 'react-plotly.js'
import SelectBox, { DropDownOptions } from 'devextreme-react/select-box'
import ForecastMissing from './utils/ForecastMissing'
import { ForecastMainParams } from './Tribe'
import GetColor from './utils/ColorPalette'
import LoadIndicator from './utils/LoadIndicator'

import FetchResult from './network_resource_fetcher/FetchResult'
import { HourlyTacticalForecast, EMPTY_TACTICAL_FORECAST, FetchTacticalForecast } from './network_resource_fetcher/FetchTacticalForecast'
import getValueFromStoreOrDefault, { saveValueToStore } from './utils/LocalStorage'

import { ForecasterState } from './store/ForecasterState'
import { useForecasterDispatch, useForecasterSelector } from './store/Hooks'
import { fetchReplyTypes } from './network_resource_fetcher/FetchForecastSettingsValues'


const ForecastSettingsPanel = React.memo(function ForecastSettingsPanel({ defaultReplyType, onReplyTypeChange }: { defaultReplyType: string } & { onReplyTypeChange: OnReplyTypeChangeCallable }) {
    const renderCount = useRef(0)
    console.log('ForecastSettingsPanel render: ', renderCount.current++)

    const [replyTypes, setReplyTypes] = useState<Array<string>>([])

    useEffect(() => {
        (async () => {
            const fetchResult: FetchResult<Array<string>> = await fetchReplyTypes()
            if (fetchResult.success) {
                setReplyTypes(fetchResult.data)
            }
        })()
    }, [])

    if (replyTypes.length > 0) {
        return (
            <div className='ForecastHeader'>
                <SelectBox
                    dataSource={replyTypes}
                    defaultValue={defaultReplyType}
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
    return <LoadIndicator width={undefined} height={25} />
})

function Metric({ tacticalForecast }: { tacticalForecast: HourlyTacticalForecast }) {
    const today = new Date().setUTCHours(23, 0, 0, 0)
    const idx = tacticalForecast.ds.map(Number).indexOf(today)
    const diff = tacticalForecast.iteration_count[idx] - tacticalForecast.yhat[idx]
    return (
        <div className='TacticalForecastMetric'>
            <label>Expected to close today</label>
            <label style={{ fontSize: '2em' }}>{diff >= 0 ? `+${diff}` : `${diff}`}</label>
        </div >
    )
}

function Graph({ tacticalForecast }: { tacticalForecast: HourlyTacticalForecast }) {
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

const ForecastPanel = React.memo(function ForecastPanel({ tribeID, incomeType, replyType, lastUpdate }: ForecastParams) {
    const [{ success: forecastLoaded, data: tacticalForecast }, setForecastLoaded] = useState<FetchResult<HourlyTacticalForecast>>(EMPTY_TACTICAL_FORECAST)

    useEffect(() => {
        (async () => {
            const fetchResult: FetchResult<HourlyTacticalForecast> = await FetchTacticalForecast({ tribeID, incomeType, replyType })
            setForecastLoaded(fetchResult)
        })()
    }, [tribeID, incomeType, replyType, lastUpdate])

    if (forecastLoaded) {
        return (
            <div className='ForecastBody'>
                <Graph tacticalForecast={tacticalForecast} />
                <Metric tacticalForecast={tacticalForecast} />
            </div>
        )
    }
    return <ForecastMissing />
})


type OnReplyTypeChangeCallable = (replyType: string) => void

type ForecastParams = ForecastMainParams & { replyType: string }

export type TacticalForecastState = ForecastMainParams & { replyTypes: Array<string> } & { replyType: string }

export default function TacticalForecast(tribeId: string) {
    const state = useForecasterSelector((state: ForecasterState) => state.forecaster.currentTribeContainersStates.find(x => x.tribeId === tribeId))

    const replyTypeKey = `${tribeId}_replyType`
    const defaultReplyType = getValueFromStoreOrDefault<string>(replyTypeKey, (state?.tacticalForecastState.replyType as string))
    const [replyType, setReplyType] = useState<string>(defaultReplyType)
    const onReplyTypeChange: OnReplyTypeChangeCallable = useCallback((replyType: string) => {
        saveValueToStore(replyTypeKey, replyType)
        setReplyType(replyType)
    }, [replyTypeKey])

    return (
        <div className='ForecastContainer'>
            <ForecastSettingsPanel
                defaultReplyType={defaultReplyType}
                onReplyTypeChange={onReplyTypeChange} />
            <ForecastPanel
                tribeID={tribeId}
                incomeType={(state?.incomeType as string)}
                replyType={replyType}
                lastUpdate={(state?.lastUpdated as number)} />
        </div>
    )
}
