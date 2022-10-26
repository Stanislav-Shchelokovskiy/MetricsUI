import React from "react";
import Plot from 'react-plotly.js';
import SelectBox from 'devextreme-react/select-box';


function Header() {
    return (
        <div className="Header">
            <label>Tactical Forecast</label>
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
        <div className="Metric">
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
        <div className="Graph">
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
                layout={{ height: 300, width: 1200, title: 'A Fancy Plot' }}
            />
        </div>
    )
}

function Body() {
    return (
        <div className="Body">
            <Graph />
            <Metric />
        </div>
    )
}

function TacticalForecast() {
    return (
        <div className="Forecast">
            <Header />
            <Body />
        </div>
    )
}

export default TacticalForecast