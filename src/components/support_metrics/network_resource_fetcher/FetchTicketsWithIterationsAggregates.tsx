import { SUPPORT_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchConvert } from '../../common/network_resource_fetcher/FetchOrDefault'
import { ContainerState } from '../store/ContainerReducer'
import { SetState } from '../store/sets/Interfaces'
import { BaseContainerState } from '../../common/store/multiset_container/BaseContainerState'
import { BaseSetState } from '../../common/store/multiset_container/sets/Interfaces'
import { getAliasedSet } from '../store/sets/SetDescriptor'
import { Agg } from '../../common/components/multiset_container/graph/ComparisonGraph'
import { anyValueIsEmpty } from '../../common/store/multiset_container/Utils'


interface TicketsWithIterationsAggregate {
    period: string
    agg: number
    name: string
}

const EMPTY_AGGREGATES = {
    periods: [],
    aggs: [],
    customdata: [],
}

function aggregatesConverter(aggregates: Array<TicketsWithIterationsAggregate> | undefined) {
    if (aggregates) {
        const periods = []
        const aggs = []
        for (const agg of aggregates) {
            periods.push(agg.period)
            aggs.push(agg.agg)
        }
        return {
            periods: periods,
            aggs: aggs,
            customdata: []
        }
    }
    return EMPTY_AGGREGATES
}

function getConverter(setTitle: string) {
    return (aggregates: Array<TicketsWithIterationsAggregate> | undefined): Agg => {
        return {
            name: setTitle,
            ...aggregatesConverter(aggregates),
        }
    }
}

export async function fetchTicketsWithIterationsAggregates(
    containerState: BaseContainerState,
    set: BaseSetState,
): Promise<FetchResult<Agg>> {
    const [rangeStart, rangeEnd] = containerState.range

    if (anyValueIsEmpty(rangeStart, rangeEnd, containerState.groupByPeriod, containerState.metric))
        return {
            success: false,
            data: {
                name: '',
                ...EMPTY_AGGREGATES,
            }
        }

    return fetchConvert(getConverter(set.title),
        `${SUPPORT_METRICS_END_POINT}/TicketsWithIterationsAggregates?` +
        `group_by_period=${containerState.groupByPeriod}` +
        `&range_start=${rangeStart}` +
        `&range_end=${rangeEnd}` +
        `&baseline_aligned_mode_enabled=${(containerState as ContainerState).baselineAlignedModeEnabled}` +
        `&metric=${containerState.metric}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...getAliasedSet(set as SetState),
                Percentile: { metric: containerState.metric, value: (set as SetState).percentile }
            }),
        })
}
