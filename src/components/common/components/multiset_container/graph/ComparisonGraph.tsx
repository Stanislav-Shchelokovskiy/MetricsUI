import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import FetchResult, { Token } from '../../../Interfaces'
import { MultisetContainerStore } from '../../../store/multiset_container/Store'
import { BaseContainerState } from '../../../store/multiset_container/BaseContainerState'
import { BaseSetState } from '../../../store/multiset_container/sets/Interfaces'
import LoadIndicator from '../../LoadIndicator'
import GraphPlot, { GraphData } from './GraphPlot'

interface BaseAgg {
    name: string
    index: number
    periods: Array<string> | Array<number>
}

interface ComparisonGraphProps<ContainerStateT extends BaseContainerState, SetStateT extends BaseSetState, AggT extends BaseAgg> {
    className: string
    aggSelector: (container: ContainerStateT, agg: AggT) => Array<number>
    fetchPeriods: (container: ContainerStateT) => Promise<FetchResult<Array<string> | Array<number>>>
    fetchAggs: (container: ContainerStateT, set: SetStateT, setIndex: number) => Promise<FetchResult<AggT>>
    containerDepsSelector: (container: ContainerStateT) => Array<any>
}

export default function ComparisonGraph<ContainerStateT extends BaseContainerState, SetStateT extends BaseSetState, AggT extends BaseAgg>(props: ComparisonGraphProps<ContainerStateT, SetStateT, AggT>) {
    const containerState = useSelector((state: MultisetContainerStore<ContainerStateT>)=> state.container)
    const setsState = useSelector((state: MultisetContainerStore<ContainerStateT, SetStateT>)=> state.sets)

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
                props.fetchPeriods(containerState),
                ...setsState.map((set, index) => props.fetchAggs(containerState, set, index))
            ])

            let aggs: Array<GraphData> = []
            if (periods_array.success) {
                aggs = sets.map(x => {
                    return {
                        name: x.data.name,
                        metric: containerState.metric,
                        x: x.data.periods,
                        y: props.aggSelector(containerState, x.data),
                        visible: (containerState.hiddenLegends.includes(x.data.name) ? 'legendonly' : true) as 'legendonly' | boolean | undefined,
                        index: x.data.index
                    }
                }).sort((a, b) => a.index - b.index)
            }
            if (!cancelled) {
                setAggregates([periods_array.data, aggs])
                setDataLoading(false)
            }
        })(cancellationToken.current)
    },
        [
            containerState.groupByPeriod,
            containerState.metric,
            ...containerState.range,
            ...props.containerDepsSelector(containerState),
            setsState,
        ])
    return (
        <div className={props.className}>
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

function defaultContainerDepsSelector(container: any) { return [] }
const defaultProps = {
    containerDepsSelector: defaultContainerDepsSelector,
}
ComparisonGraph.defaultProps = defaultProps
