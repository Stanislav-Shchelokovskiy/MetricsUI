import React from "react";
import Plot from 'react-plotly.js';
import SelectBox from 'devextreme-react/select-box';

function Header() {
    return (
        <div className="ForecastHeader">
            <SelectBox
                dataSource={["D_14", "D_90"]}
                label="Forecast Horizon"
                labelMode="static"
                value="D_14"
            />
            <SelectBox
                dataSource={[3, 4, 5]}
                label="Performance Level"
                labelMode="static"
                value={4}
            />
        </div>
    )
}

function Graph() {
    return (
        <div className="ForecastGraph">
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

function Body() {
    return (
        <div className="ForecastBody">
            <Graph />
        </div>
    )
}

function StrategicForecast() {
    return (
        <div className="ForecastContainer">
            <Header />
            <Body />
        </div>
    )
}

export default StrategicForecast