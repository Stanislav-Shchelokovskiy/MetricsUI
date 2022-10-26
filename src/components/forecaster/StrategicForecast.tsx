import React from 'react';
import Plot from 'react-plotly.js';
import SelectBox from 'devextreme-react/select-box';
import { TribeID } from './Tribe';

function Header({ forecastHorizons, tiles }: Settings) {
    return (
        <div className='ForecastHeader'>
            <SelectBox
                dataSource={forecastHorizons}
                label='Forecast Horizon'
                labelMode='static'
                value={forecastHorizons?.[0]}
            />
            <SelectBox
                dataSource={tiles}
                label='Performance Level'
                labelMode='static'
                value={tiles?.[tiles?.length % 2]}
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
                        x: [1, 3],
                        y: [2, 3],
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'red' },
                    },
                    { type: 'bar', x: [2, 3], y: [5, 3] },
                ]}
                layout={{
                    height: 400, width: 1510, margin: {
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
            <Graph
                tribeID={tribeID} />
        </div>
    )
}

interface Settings {
    forecastHorizons: Array<string>
    tiles: Array<number>
}

export default function StrategicForecast({ tribeID, forecastHorizons, tiles }: TribeID & Settings) {
    return (
        <div className='ForecastContainer'>
            <Header
                forecastHorizons={forecastHorizons}
                tiles={tiles} />
            <Body
                tribeID={tribeID} />
        </div>
    )
}
