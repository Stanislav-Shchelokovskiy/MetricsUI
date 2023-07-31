import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Token } from '../../../Interfaces'
import { MultisetContainerStore } from '../../../store/multiset_container/Store'
import LoadIndicator from '../../LoadIndicator'
import GraphPlot, { GraphData } from './GraphPlot'
import { useMultisetContainerContext } from '../MultisetContainerContext'

export interface Agg {
    name: string
    periods: Array<string> | Array<number>
    aggs: Array<number>
    customdata: Array<string> | Array<number>
}

export default function ComparisonGraph() {
    const context = useMultisetContainerContext()
    const containerState = useSelector((state: MultisetContainerStore) => state.container)
    const setsState = useSelector((state: MultisetContainerStore) => state.sets)

    const [[categories, aggregates], setAggregates] = useState<[Array<string> | Array<number>, Array<GraphData>]>([[], []])
    const [dataLoading, setDataLoading] = useState<boolean>(false)

    const cancellationToken = useRef<Token>({ cancel: () => { } })

    useEffect(() => {
        setDataLoading(true);
        cancellationToken.current.cancel();
        (async (token: Token) => {
            let cancelled = false
            token.cancel = () => {
                cancelled = true
            }

            const [periods_array, ...sets] = await Promise.all([
                context.graph.fetchPeriods(containerState),
                ...setsState.map((set) => context.graph.fetchAggs(containerState, set))
            ])

            if (!cancelled) {
                let aggs: Array<GraphData> = []
                if (periods_array.success) {
                    aggs = sets.map(x => {
                        return {
                            name: x.data.name,
                            x: x.data.periods,
                            y: x.data.aggs,
                            visible: (containerState.hiddenLegends.includes(x.data.name) ? 'legendonly' : true) as 'legendonly' | boolean | undefined,
                            customdata: x.data.customdata,
                        }
                    })
                }

                if (!cancelled) {
                    setAggregates([periods_array.data, aggs])
                    setDataLoading(false)
                }
            }
        })(cancellationToken.current)
    },
        [
            containerState.groupByPeriod,
            containerState.metric,
            ...containerState.range,
            ...context.graph.containerDepsSelector(containerState),
            setsState,
        ])
    return (
        <div className='ComparisonGraph'>
            {dataLoading ? <LoadIndicator className='ComparisonGraph_LoadingIndicator' width={100} height={100} /> : null}
            <GraphPlotMempized
                categories={categories}
                aggs={aggregates}
                comparisonMethod={containerState.comparisonMethod}
            />
        </div>
    )
}

const GraphPlotMempized = React.memo(GraphPlot)
