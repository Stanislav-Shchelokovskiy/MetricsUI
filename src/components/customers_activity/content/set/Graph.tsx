import React, { useReducer, useEffect, useCallback, useRef } from 'react'
import Plot from 'react-plotly.js'
import { Data as GraphData } from 'plotly.js'


export default function Graph() {
    return (
        <div className='CustomersActivity_Graph'>
            <Plot
                data={[{ type: 'bar', x: [1, 2, 3], y: [2, 5, 3] }]}
                style={{
                    width: '100%',
                    minHeight: 300,
                    height: '100%'
                }}
                useResizeHandler={true}
                layout={{
                    margin: {
                        t: 10,
                        l: 30,
                        r: 10,
                        b: 30
                    },
                    xaxis: { autorange: true, automargin: true },
                    yaxis: { 'showgrid': true, zeroline: false, autorange: true, automargin: true },
                    barmode: 'stack',
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    autosize: true
                }}
                config={{ displayModeBar: false, doubleClick: 'autosize', responsive: true }}
            //onLegendClick={onLegendClick}
            />
        </div>
    )
}