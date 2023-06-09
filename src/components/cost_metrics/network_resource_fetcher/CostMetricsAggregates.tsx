import FetchResult from '../../common/Interfaces'
import { fetchConvert } from '../../common/network_resource_fetcher/FetchOrDefault'
import { SUPPORT_METRICS_END_POINT } from '../../common/EndPoint'
import { ContainerState } from '../store/ContainerReducer'
import { SetState } from '../store/sets_reducer/SetsReducer'
import { getAliasedSet } from '../store/sets_reducer/SetDescriptor'
import { BaseAgg } from '../../common/components/multiset_container/graph/ComparisonGraph'
import { anyValueIsEmpty } from '../../common/store/multiset_container/Utils'

interface CostMetricsAggregate {
    period: string
    agg: number
    name: string
}

export interface CostMetricsAggregates extends BaseAgg {}

const EMPTY_AGGREGATES = {
    periods: [],
    aggs: [],
    customdata: [],
}

function aggregatesConverter(aggregates: Array<CostMetricsAggregate> | undefined, setTitle: string) {
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
            customdata: [],
        }
    }
    return EMPTY_AGGREGATES
}

function getConverter(setTitle: string) {
    return (aggregates: Array<CostMetricsAggregate> | undefined): CostMetricsAggregates => {
        return {
            name: setTitle,
            ...aggregatesConverter(aggregates, setTitle),
        }
    }
}

export async function fetchCostMetricsAggregates(
    containerState: ContainerState,
    set: SetState,
): Promise<FetchResult<CostMetricsAggregates>> {
    const [rangeStart, rangeEnd] = containerState.range

    if (anyValueIsEmpty(rangeStart, rangeEnd, containerState.groupByPeriod, containerState.metric))
        return {
            success: false,
            data: {
                name: set.title,
                ...EMPTY_AGGREGATES
            }
        }

    return fetchConvert(getConverter(set.title),
        `${SUPPORT_METRICS_END_POINT}/CostMetrics/Aggregates?` +
        `group_by_period=${containerState.groupByPeriod}` +
        `&range_start=${rangeStart}` +
        `&range_end=${rangeEnd}` +
        `&metric=${containerState.metric}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...getAliasedSet(set),
            }),
        },
    )
}
