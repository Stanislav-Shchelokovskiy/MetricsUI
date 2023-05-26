import FetchResult from '../../common/Interfaces'
import { SUPPORT_METRICS_END_POINT } from '../../common/EndPoint'
import { ContainerState } from '../store/ContainerReducer'
import { SetState } from '../store/SetsReducer'
// import { getAliasedSet } from '../store/sets_reducer/SetDescriptor'
// import { isTicketsMetricSelected } from '../../common/components/multiset_container/graph/MetricSelector'

interface CostMetricsAggregate {
    year_month: string
    sc_hours: number
}

export interface CostMetricsAggregates {
    index: number
    name: string
    periods: Array<string> | Array<number>
    sc_hours: Array<number>
}

export const EMPTY_AGGREGATES: CostMetricsAggregates = {
    index: 0,
    name: '',
    periods: [],
    sc_hours: [],
}

export async function fetchCostMetricsAggregates(
    containerState: ContainerState,
    set: SetState,
    index: number
): Promise<FetchResult<CostMetricsAggregates>> {
    try {
        const [rangeStart, rangeEnd] = containerState.range
        const aggregates: Array<CostMetricsAggregate> = await fetch(
            `${SUPPORT_METRICS_END_POINT}/CostMetrics`, //+
            // `group_by_period=${containerState.groupByPeriod}` +
            // `&range_start=${rangeStart}` +
            // `&range_end=${rangeEnd}` +
            // `&baseline_aligned_mode_enabled=${containerState.baselineAlignedModeEnabled}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify({
                //     ...getAliasedSet(set),
                //     Percentile: { metric: (isTicketsMetricSelected(containerState.metric) ? 'tickets' : 'iterations'), value: set.percentile }
                // }),
            },
        ).then(response => response.json())

        const periods = []
        const sc_hours = []
        for (const agg of aggregates) {
            periods.push(agg.year_month)
            sc_hours.push(agg.sc_hours)
        }

        return {
            success: true,
            data: {
                index: index,
                name: set.title,
                periods: periods,
                sc_hours: sc_hours,
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
