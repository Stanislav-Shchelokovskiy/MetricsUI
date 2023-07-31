import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import Plot from 'react-plotly.js'
import { Data as PlotData, PlotType } from 'plotly.js'
import { hideLegends } from '../../../store/multiset_container/Actions'
import { isAbsoluteAreaSelected, isAbsoluteBarSelected } from './ComparisonMethodSelector'

interface LegendClickArgs {
    data: Array<PlotData>
}

interface PlotProps {
    categories: Array<string> | Array<number>
    aggs: Array<GraphData>
    comparisonMethod: string
}

export interface Aggregate {
    period: string
    agg: number
    name: string
}

export interface GraphData {
    name: string
    x: Array<string> | Array<number>
    y: Array<number>
    visible: 'legendonly' | boolean | undefined
    customdata: Array<string> | Array<number>
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

    return (
        <Plot
            divId='ComparisonGraph'
            className='ComparisonGraph'
            data={getPlots(props)}
            useResizeHandler={true}
            layout={{
                margin: { t: 10, l: 30, r: 10, b: 30 },
                xaxis: { autorange: true, automargin: true, type: 'category', categoryorder: 'array', categoryarray: props.categories },
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
        connectgaps: true,
        stackgroup: 'one',
        groupnorm: 'percent'
    }
}

function getAbsoluteGraphSettings(data: GraphData) {
    //%{customdata}
    return {}
}

function getCommonGraphSettings(data: GraphData) {
    return {
        name: data.name,
        x: data.x,
        y: data.y,
        opacity: 0.6,
        hovertext: data.name,
        visible: data.visible,
        customdata: data.customdata,
        hovertemplate: `<b>${data.name} </b><br>Period: %{x}<br>Value: %{y}<br><extra></extra>`,
    }
}
