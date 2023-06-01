import FetchResult from '../../common/Interfaces'
import { SUPPORT_METRICS_END_POINT } from '../../common/EndPoint'
import { ContainerState } from '../store/ContainerReducer'
import { SetState } from '../store/sets_reducer/SetsReducer'
import { getAliasedSet } from '../store/sets_reducer/SetDescriptor'
// import { isTicketsMetricSelected } from '../../common/components/multiset_container/graph/MetricSelector'

interface CostMetricsAggregate {
    year_month: string
    agg: number
}

export interface CostMetricsAggregates {
    name: string
    periods: Array<string> | Array<number>
    aggs: Array<number>
}

export const EMPTY_AGGREGATES: CostMetricsAggregates = {
    name: '',
    periods: [],
    aggs: [],
}

export async function fetchCostMetricsAggregates(
    containerState: ContainerState,
    set: SetState,
): Promise<FetchResult<CostMetricsAggregates>> {
    try {
        const [rangeStart, rangeEnd] = containerState.range
        const aggregates: Array<CostMetricsAggregate> = await fetch(
            `${SUPPORT_METRICS_END_POINT}/CostMetrics/Aggregates?` +
            `group_by_period=${containerState.groupByPeriod}` +
            `&range_start=${rangeStart}` +
            `&range_end=${rangeEnd}` +
            `&metric=${containerState.metric}` +
            `&agg_by=${containerState.aggBy}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...getAliasedSet(set),
                }),
            },
        ).then(response => response.json())

        const periods = []
        const aggs = []
        for (const agg of aggregates) {
            periods.push(agg.year_month)
            aggs.push(agg.agg)
        }

        return {
            success: true,
            data: {
                name: set.title,
                periods: periods,
                aggs: aggs,
            }
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: EMPTY_AGGREGATES
        }
    }
}
