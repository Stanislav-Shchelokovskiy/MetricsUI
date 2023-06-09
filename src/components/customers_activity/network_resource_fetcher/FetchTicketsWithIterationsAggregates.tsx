import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchConvert } from '../../common/network_resource_fetcher/FetchOrDefault'
import { ContainerState } from '../store/ContainerReducer'
import { SetState } from '../store/sets_reducer/Interfaces'
import { getAliasedSet } from '../store/sets_reducer/SetDescriptor'
import { BaseAgg } from '../../common/components/multiset_container/graph/ComparisonGraph'
import { anyValueIsEmpty } from '../../common/store/multiset_container/Utils'


interface TicketsWithIterationsAggregate {
    period: string
    agg: number
    name: string
}

export interface TicketsWithIterationsAggregates extends BaseAgg {}

const EMPTY_AGGREGATES = {
    periods: [],
    aggs: [],
    customdata: [],
}

function aggregatesConverter(aggregates: Array<TicketsWithIterationsAggregate> | undefined, setTitle: string) {
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
    return (aggregates: Array<TicketsWithIterationsAggregate> | undefined): TicketsWithIterationsAggregates => {
        return {
            name: setTitle,
            ...aggregatesConverter(aggregates, setTitle),
        }
    }
}

export async function fetchTicketsWithIterationsAggregates(
    containerState: ContainerState,
    set: SetState,
): Promise<FetchResult<TicketsWithIterationsAggregates>> {
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
        `${SUPPORT_ANALYTICS_END_POINT}/TicketsWithIterationsAggregates?` +
        `group_by_period=${containerState.groupByPeriod}` +
        `&range_start=${rangeStart}` +
        `&range_end=${rangeEnd}` +
        `&baseline_aligned_mode_enabled=${containerState.baselineAlignedModeEnabled}` +
        `&metric=${containerState.metric}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...getAliasedSet(set),
                Percentile: { metric: containerState.metric, value: set.percentile }
            }),
        })
}
