import React, { useState, useEffect } from 'react'
import Plot from 'react-plotly.js'
import { useSelector } from 'react-redux'
import { ForecasterStore } from '../store/Store'
import { replyTypeSelector } from '../store/tactical_forecast/Selectors'
import { incomeTypeSelector, lastUpdatedSelector } from '../store/forecaster/Selectors'
import ForecastMissing from '../utils/ForecastMissing'
import GetColor from '../utils/ColorPalette'
import FetchResult from '../../common/Typing'
import {
    HourlyTacticalForecast,
    EMPTY_TACTICAL_FORECAST,
    fetchTacticalForecast
} from '../network_resource_fetcher/TacticalForecast'
import { useTentId } from '../tent/TentContext'

export default function ForecastPanel() {
    const tentId = useTentId()
    const replyType = useSelector((store: ForecasterStore) => replyTypeSelector(store, tentId))
    const incomeType = useSelector((store: ForecasterStore) => incomeTypeSelector(store))
    const lastUpdated = useSelector((store: ForecasterStore) => lastUpdatedSelector(store))

    const [[forecastLoaded, tacticalForecast], setForecastLoaded] = useState<[boolean, HourlyTacticalForecast]>([false, EMPTY_TACTICAL_FORECAST])

    useEffect(() => {
        (async () => {
            if (replyType === '')
                return
            const fetchResult: FetchResult<HourlyTacticalForecast> = await fetchTacticalForecast(incomeType, tentId, replyType)
            setForecastLoaded([fetchResult.success, fetchResult.data])
        })();
    }, [tentId, incomeType, replyType, lastUpdated])

    if (forecastLoaded)
        return <ForecastBody tacticalForecast={tacticalForecast} />
    return <ForecastMissing />
}

const ForecastBody = React.memo(function ForecastBody({ tacticalForecast }: { tacticalForecast: HourlyTacticalForecast }) {
    // const renderCount = React.useRef(0)
    // console.log('Tactical ForecastBody render: ', renderCount.current++)
    return (
        <div className='ForecastBody'>
            <Graph tacticalForecast={tacticalForecast} />
            <Metric tacticalForecast={tacticalForecast} />
        </div>
    )

})


function Metric({ tacticalForecast }: { tacticalForecast: HourlyTacticalForecast }) {
    const today = new Date().setUTCHours(23, 0, 0, 0)
    const idx = tacticalForecast.ts.map(Number).indexOf(today)
    const diff = tacticalForecast.iterations[idx] - tacticalForecast.yhat[idx]
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
                        y: tacticalForecast.upper_iterations,
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
                        y: tacticalForecast.iterations,
                        name: 'tribe_replies',
                        showlegend: false,
                        line: { shape: 'spline', color: GetColor('tribe_replies') },
                        fill: 'tonexty',
                        fillcolor: GetColor('tribe_replies_lower_fill'),
                        mode: 'lines',
                        hovertemplate: 'Tent replies: <b>%{y}</b><extra></extra>',
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
