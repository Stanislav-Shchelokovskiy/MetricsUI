import FetchResult from '../../common/Interfaces'
import { SUPPORT_METRICS_END_POINT } from '../../common/EndPoint'
import { ContainerState } from '../store/ContainerReducer'
import { SetState } from '../store/sets_reducer/SetsReducer'
import { getAliasedSet } from '../store/sets_reducer/SetDescriptor'
import { BaseAgg } from '../../common/components/multiset_container/graph/ComparisonGraph'

interface CostMetricsAggregate {
    year_month: string
    agg: number
    name: string
}

export interface CostMetricsAggregates extends BaseAgg {
    aggs: Array<number>
}

export const EMPTY_AGGREGATES: CostMetricsAggregates = {
    name: '',
    periods: [],
    aggs: [],
    customdata: [],
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
        const agg_names = Array<string>()
        for (const agg of aggregates) {
            periods.push(agg.year_month)
            aggs.push(agg.agg)
            agg_names.push(get_agg_name(agg, set))
        }

        return {
            success: true,
            data: {
                name: set.title,
                periods: periods,
                aggs: aggs,
                customdata: get_agg_names(agg_names),
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
function get_agg_names(agg_names: Array<string>): Array<string> {
    return (agg_names.length > 1 && agg_names.every(x => x === agg_names[0])) ? agg_names.map(x => '') : agg_names
}

function get_agg_name(agg: CostMetricsAggregate, set: SetState): string {
    return agg.agg > 0 && agg.name !== '' && agg.name !== set.title ? `(${agg.name})` : ''
}

