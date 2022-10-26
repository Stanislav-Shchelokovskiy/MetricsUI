import React from 'react';
import Plot from 'react-plotly.js';
import SelectBox from 'devextreme-react/select-box';
import { RepliesForecast } from './Forecaster';
import { TribeID } from './Tribe';


function Header({ replyTypes }: { replyTypes: Array<string> }) {
    return (
        <div className='ForecastHeader'>
            <SelectBox
                dataSource={replyTypes}
                label='Forecast Mode'
                labelMode='static'
                value={replyTypes?.[0]}
                width={'22%'}
            />
        </div>
    )
}

function Metric() {
    return (
        <div className='TacticalForecastMetric'>
            <Plot
                data={[
                    { type: 'bar', x: [1], y: [2] },
                ]}
                layout={{ width: 300, height: 300, title: 'A Fancy Plot' }}
            />
        </div>
    )
}

function Graph({ tribeID }: TribeID) {
    return (
        <div className='ForecastGraph'>
            <Plot
                data={[
                    {
                        x: [1, 2, 3],
                        y: [2, 6, 3],
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'red' },
                    },
                    { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
                ]}
                layout={{
                    height: 300, width: 1200, margin: {
                        t: 10,
                        l: 10,
                        r: 10,
                    },
                }}
            />
        </div>
    )
}

function Body({ tribeID }: TribeID) {
    return (
        <div className='ForecastBody'>
            <Graph tribeID={tribeID} />
            <Metric />
        </div>
    )
}

interface Settings {
    tribeID: string
    replyTypes: Array<string>
}

export default function TacticalForecast({ tribeID, replyTypes }: Settings) {
    return (
        <div className='ForecastContainer'>
            <Header replyTypes={replyTypes} />
            <Body tribeID={tribeID} />
        </div>
    )
}