import React, { useCallback, useMemo } from 'react'
import Plot from 'react-plotly.js'
import { Data as PlotData, PlotType } from 'plotly.js'
import { useDispatch } from 'react-redux'
import { hideLegends } from '../../common/store/set_container/Actions'
import { isAbsoluteAreaSelected, isAbsoluteBarSelected } from './ComparisonMethodSelector'

interface LegendClickArgs {
    data: Array<PlotData>
}

interface PlotProps {
    aggs: Array<GraphData>
    comparisonMethod: string
}

export interface GraphData {
    name: string
    metric: string
    x: Array<string> | Array<number>
    y: Array<number>
    visible: 'legendonly' | boolean | undefined
}

export default function GraphPlot(props: PlotProps) {
    const dispatch = useDispatch()
    const onLegendClick = useCallback((e: LegendClickArgs) => {
        const timerId = setTimeout(() => {
            const hiddenLegends = (e.data.filter(legend => (legend as any).visible === 'legendonly').map(legend => legend.hovertext) as Array<string>)
            dispatch(hideLegends(hiddenLegends))
            clearTimeout(timerId)
        }, 500)
        return true
    }, [])

    const categories = useMemo(() => props.aggs.length > 0 ? props.aggs[0].x : [], [props.aggs])
    return (
        <Plot
            divId='CustomersActivity_ComparisonGraph'
            className='CustomersActivity_ComparisonGraph'
            data={getPlots(props)}
            useResizeHandler={true}
            layout={{
                margin: { t: 10, l: 30, r: 10, b: 30 },
                xaxis: { autorange: true, automargin: true, type: 'category', categoryorder: 'array', categoryarray: categories },
                yaxis: { 'showgrid': true, zeroline: false, autorange: true, automargin: true },
                barmode: 'group',
                paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: 'rgba(0,0,0,0)',
                autosize: true,
            }}
            config={{ displayModeBar: false, doubleClick: 'autosize', responsive: true }}
            onLegendClick={onLegendClick} />
    )
}

function getPlots({ aggs, comparisonMethod }: PlotProps): Array<PlotData> {
    return aggs.map(x => getPlot(x))


    function getPlot(data: GraphData) {
        if (isAbsoluteBarSelected(comparisonMethod)) {
            return createAbsoluteBar(data)
        }
        if (isAbsoluteAreaSelected(comparisonMethod)) {
            return createAbsoluteArea(data)
        }
        return createNormalizedStackedArea(data)
    }
}


function createAbsoluteBar(data: GraphData) {
    return {
        ...getCommonGraphSettings(data),
        ...getAbsoluteGraphSettings(data),
        type: 'bar' as PlotType,
    }
}

function createAbsoluteArea(data: GraphData) {
    return {
        ...getCommonGraphSettings(data),
        ...getAbsoluteGraphSettings(data),
        type: 'scatter' as PlotType,
        fill: 'tozeroy',
        mode: 'none',
        line: { shape: 'spline' },
    }
}

//NormalizedStackedAreaChart
function createNormalizedStackedArea(data: GraphData) {
    return {
        ...getCommonGraphSettings(data),
        type: 'scatter' as PlotType,
        hovertemplate: `<b>${data.name}</b><br>Period: %{x}<br>Value: %{y}%<br><extra></extra>`,
        connectgaps: true,
        stackgroup: 'one',
        groupnorm: 'percent'
    }
}

function getAbsoluteGraphSettings(data: GraphData) {
    return {
        hovertemplate: `<b>${data.name}</b><br>Period: %{x}<br>${data.metric}: %{y}<br><extra></extra>`,
    }
}

function getCommonGraphSettings(data: GraphData) {
    return {
        name: data.name,
        x: data.x,
        y: data.y,
        opacity: 0.6,
        hovertext: data.name,
        visible: data.visible
    }
}
