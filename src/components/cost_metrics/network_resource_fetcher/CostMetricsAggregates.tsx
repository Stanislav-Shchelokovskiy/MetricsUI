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

export interface CostMetricsAggregates extends BaseAgg {
    aggs: Array<number>
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
        const agg_names = Array<string>()
        for (const agg of aggregates) {
            periods.push(agg.period)
            aggs.push(agg.agg)
            agg_names.push(get_agg_name(agg, setTitle))

        }
        return {
            periods: periods,
            aggs: aggs,
            agg_names: agg_names,
            customdata: get_agg_names(agg_names),
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
function get_agg_names(agg_names: Array<string>): Array<string> {
    return (agg_names.length > 1 && agg_names.every(x => x === agg_names[0])) ? agg_names.map(x => '') : agg_names
}

function get_agg_name(agg: CostMetricsAggregate, setTitle: string): string {
    return agg.agg > 0 && agg.name !== '' && agg.name !== setTitle ? `(${agg.name})` : ''
}

