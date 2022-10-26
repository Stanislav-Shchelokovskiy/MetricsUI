import React from "react";
import Plot from 'react-plotly.js';
import SelectBox from 'devextreme-react/select-box';

function Header() {
    return (
        <div className="Header">
            <label>Strtegic Forecast</label>
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
        <div className="Graph">
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
                layout={{ height: 400, width: 1510, title: 'A Fancy Plot' }}
            />
        </div>
    )
}

function Body() {
    return (
        <div className="Body">
            <Graph />
        </div>
    )
}

function StrategicForecast() {
    return (
        <div className="Forecast">
            <Header />
            <Body />
        </div>
    )
}

export default StrategicForecast