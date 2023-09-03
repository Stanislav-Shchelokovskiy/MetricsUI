import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import Plot from 'react-plotly.js'
import { Data as PlotData, PlotType } from 'plotly.js'
import { hideLegends } from '../../../store/multiset_container/Actions'
import { isAbsoluteAreaSelected, isAbsoluteBarSelected } from './ComparisonMethodSelector'
import ScrollView from 'devextreme-react/scroll-view'
import { PlotOrientation, isHorzOrientation } from '../MultisetContainerContext'

interface LegendClickArgs {
    data: Array<PlotData>
}

interface PlotProps {
    categories: Array<string> | Array<number>
    aggs: Array<GraphData>
    comparisonMethod: string
    orientation: PlotOrientation
}

export interface GraphData {
    name: string
    x: Array<string> | Array<number>
    y: Array<number>
    visible: 'legendonly' | boolean | undefined
    customdata: Array<string> | Array<number>
    xName: string
    yName: string
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
        <ScrollView
            className='GraphPlot_ScrollView'
            id='GraphPlot_ScrollView_id'
            showScrollbar='onHover'
            scrollByThumb={true}
            scrollByContent={false}
        >
            <Plot
                divId='ComparisonPlot'
                className='ComparisonPlot'
                data={getPlots(props)}
                useResizeHandler={true}
                layout={{
                    xaxis: {
                        autorange: true,
                        automargin: true,
                        ...axisType(props),
                    },
                    yaxis: {
                        showgrid: true,
                        zeroline: false,
                        autorange: true,
                        automargin: true,
                        ...tickMode(props)
                    },
                    margin: { t: 10, l: 30, r: 10, b: 30 },
                    barmode: 'group',
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    autosize: true,
                    ...plotHeight(props)
                }}
                config={{ displayModeBar: false, doubleClick: 'autosize', responsive: true }}
                onLegendClick={onLegendClick}
            />
        </ScrollView>
    )
}


function plotHeight(props: PlotProps) {
    if (isHorzOrientation(props.orientation)) {
        let h = 0
        for (const agg of props.aggs)
            h += 40 * agg.y.length
        return { height: h }
    }
    return { height: -1 }
}

function tickMode(props: PlotProps) {
    if (isHorzOrientation(props.orientation))
        return { tickmode: 'linear' as const }
    return undefined
}

function axisType(props: PlotProps) {
    if (isHorzOrientation(props.orientation))
        return undefined
    return {
        type: 'category' as const,
        categoryorder: 'array' as const,
        categoryarray: props.categories
    }

}


function getPlots({ aggs, comparisonMethod, orientation }: PlotProps): Array<PlotData> {
    return aggs.map(x => toPlot(x))

    function toPlot(data: GraphData) {
        if (isAbsoluteBarSelected(comparisonMethod)) {
            return createAbsoluteBar(data, orientation)
        }
        if (isAbsoluteAreaSelected(comparisonMethod)) {
            return createAbsoluteArea(data, orientation)
        }
        return createNormalizedStackedArea(data, orientation)
    }
}


function createAbsoluteBar(data: GraphData, orientation: PlotOrientation) {
    return {
        ...getCommonGraphSettings(data, orientation),
        ...getAbsoluteGraphSettings(data),
        type: 'bar' as PlotType,
    }
}

function createAbsoluteArea(data: GraphData, orientation: PlotOrientation) {
    return {
        ...getCommonGraphSettings(data, orientation),
        ...getAbsoluteGraphSettings(data),
        type: 'scatter' as PlotType,
        fill: 'tozeroy',
        mode: 'none',
        line: { shape: 'spline' },
    }
}

//NormalizedStackedAreaChart
function createNormalizedStackedArea(data: GraphData, orientation: PlotOrientation) {
    return {
        ...getCommonGraphSettings(data, orientation),
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

function getCommonGraphSettings(data: GraphData, orientation: PlotOrientation) {
    return {
        name: data.name,
        ...xy(data, orientation),
        opacity: 0.6,
        hovertext: data.name,
        visible: data.visible,
        customdata: data.customdata,
        hovertemplate: hoverTemplate(data, orientation),
        orientation: orientation,
    }
}
function hoverTemplate(data: GraphData, orientation: PlotOrientation) {
    let { xName, yName } = data
    if (isHorzOrientation(orientation))
        return `<b>${data.name} </b><br>${yName}: %{y}<br> ${xName}: %{x}<br><extra></extra>`
    return `<b>${data.name} </b><br>${xName}: %{x}<br> ${yName}: %{y}<br><extra></extra>`
}

function xy(data: GraphData, orientation: PlotOrientation) {
    let { x, y } = data
    if (isHorzOrientation(orientation))
        return {
            x: y,
            y: x,
        }
    return {
        x: x,
        y: y,
    }
}
