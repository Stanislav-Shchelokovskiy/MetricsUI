import React, { useState, useEffect } from 'react'
import Plot from 'react-plotly.js'
import ForecastMissing from '../utils/ForecastMissing'
import GetColor from '../utils/ColorPalette'
import FetchResult from '../../common/Interfaces'
import {
    HourlyTacticalForecast,
    EMPTY_TACTICAL_FORECAST,
    fetchTacticalForecast
} from '../network_resource_fetcher/FetchTacticalForecast'


interface ForecastPanelProps {
    tribeId: string
    incomeType: string
    replyType: string
    lastUpdated: number
}

const ForecastPanel = React.memo(
    function ForecastPanel(
        {
            tribeId,
            incomeType,
            replyType,
            lastUpdated,
        }: ForecastPanelProps) {
        // const renderCount = useRef(0)
        // console.log('Tactical ForecastPanel render: ', renderCount.current++)

        const [[forecastLoaded, tacticalForecast], setForecastLoaded] = useState<[boolean, HourlyTacticalForecast]>([false, EMPTY_TACTICAL_FORECAST])

        useEffect(() => {
            (async () => {
                if (replyType === '')
                    return
                const fetchResult: FetchResult<HourlyTacticalForecast> = await fetchTacticalForecast(incomeType, tribeId, replyType)
                setForecastLoaded([fetchResult.success, fetchResult.data])
            })();
        }, [tribeId, incomeType, replyType, lastUpdated])

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

export default ForecastPanel


function Metric({ tacticalForecast }: { tacticalForecast: HourlyTacticalForecast }) {
    const today = new Date().setUTCHours(23, 0, 0, 0)
    const idx = tacticalForecast.ts.map(Number).indexOf(today)
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
                        x: tacticalForecast.ts,
                        y: tacticalForecast.yhat,
                        name: 'forecast_transparent',
                        showlegend: false,
                        line: { shape: 'spline', color: GetColor('transparent') },
                        hoverinfo: 'none',
                        connectgaps: true,
                    },
                    {
                        type: 'scatter',
                        x: tacticalForecast.ts,
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
                        x: tacticalForecast.ts,
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
                        x: tacticalForecast.ts,
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
                        x: tacticalForecast.ts,
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
                        x: tacticalForecast.ts,
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
                style={{
                    width: '100%',
                    minHeight: 300,
                    height: '100%'
                }}
                useResizeHandler={true}
                layout={{
                    margin: { t: 10, l: 30, r: 10 },
                    xaxis: { 'showgrid': false, autorange: true, automargin: true },
                    yaxis: { 'showgrid': true, zeroline: false, autorange: true, automargin: true },
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
                config={{ displayModeBar: false, doubleClick: 'autosize', responsive: true }}
            />
        </div>
    )
}
