import React from "react";
import Plot from 'react-plotly.js';
import SelectBox from 'devextreme-react/select-box';


function Header() {
    return (
        <div className="ForecastHeader">
            <SelectBox
                dataSource={["Support", "Support & Team"]}
                label="Forecast Mode"
                labelMode="static"
                value="Support"
            />
        </div>
    )
}

function Metric() {
    return (
        <div className="TacticalForecastMetric">
            <Plot
                data={[
                    { type: 'bar', x: [1], y: [2] },
                ]}
                layout={{ width: 300, height: 300, title: 'A Fancy Plot' }}
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

function Body() {
    return (
        <div className="ForecastBody">
            <Graph />
            <Metric />
        </div>
    )
}

function TacticalForecast() {
    return (
        <div className="ForecastContainer">
            <Header />
            <Body />
        </div>
    )
}

export default TacticalForecast