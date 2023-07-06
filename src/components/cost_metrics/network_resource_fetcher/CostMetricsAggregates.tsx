import FetchResult from '../../common/Interfaces'
import { fetchConvert } from '../../common/network_resource_fetcher/FetchOrDefault'
import { COST_METRICS_END_POINT } from '../../common/EndPoint'
import { SetState } from '../store/sets/SetsReducer'
import { getAliasedSet } from '../store/sets/SetDescriptor'
import { Agg } from '../../common/components/multiset_container/graph/ComparisonGraph'
import { anyValueIsEmpty } from '../../common/store/multiset_container/Utils'
import { BaseContainerState } from '../../common/store/multiset_container/BaseContainerState'
import { BaseSetState } from '../../common/store/multiset_container/sets/Interfaces'

interface CostMetricsAggregate {
    period: string
    agg: number
    name: string
}

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
    return (aggregates: Array<CostMetricsAggregate> | undefined): Agg => {
        return {
            name: setTitle,
            ...aggregatesConverter(aggregates, setTitle),
        }
    }
}

export async function fetchCostMetricsAggregates(
    containerState: BaseContainerState,
    set: BaseSetState,
): Promise<FetchResult<Agg>> {
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
        `${COST_METRICS_END_POINT}/CostMetrics/Aggregates?` +
        `group_by_period=${containerState.groupByPeriod}` +
        `&range_start=${rangeStart}` +
        `&range_end=${rangeEnd}` +
        `&metric=${containerState.metric}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...getAliasedSet(set as SetState),
            }),
        },
    )
}
