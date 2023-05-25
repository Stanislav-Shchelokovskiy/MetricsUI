import FetchResult from '../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'
import { CustomersActivityState } from '../store/CustomersActivityReducer'
import { SetState } from '../store/sets_reducer/Interfaces'
import { getAliasedSet } from '../store/sets_reducer/SetDescriptor'
import { isTicketsMetricSelected } from '../../common/components/multiset_container/graph/MetricSelector'

interface TicketsWithIterationsAggregate {
    period: string
    tickets: number
    iterations: number
    iterations_to_tickets: number
    people: number
}

export interface TicketsWithIterationsAggregates {
    index: number
    name: string
    periods: Array<string> | Array<number>
    tickets: Array<number>
    iterations: Array<number>
    iterations_to_tickets: Array<number>
    people: Array<number>
}

export const EMPTY_TICKETS_WITH_ITERATIONS_AGGREGATES: TicketsWithIterationsAggregates = {
    index: 0,
    name: '',
    periods: [],
    tickets: [],
    iterations: [],
    iterations_to_tickets: [],
    people: [],
}

export async function fetchTicketsWithIterationsAggregates(
    containerState: CustomersActivityState,
    set: SetState,
    index: number
): Promise<FetchResult<TicketsWithIterationsAggregates>> {
    try {
        const [rangeStart, rangeEnd] = containerState.range
        const aggregates: Array<TicketsWithIterationsAggregate> = await fetch(
            `${SUPPORT_ANALYTICS_END_POINT}/get_tickets_with_iterations_aggregates?` +
            `group_by_period=${containerState.groupByPeriod}` +
            `&range_start=${rangeStart}` +
            `&range_end=${rangeEnd}` +
            `&baseline_aligned_mode_enabled=${containerState.baselineAlignedModeEnabled}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...getAliasedSet(set),
                    Percentile: { metric: (isTicketsMetricSelected(containerState.metric) ? 'tickets' : 'iterations'), value: set.percentile }
                }),
            },
        ).then(response => response.json())

        const periods = []
        const tickets = []
        const iterations = []
        const iterations_to_tickets = []
        const people = []
        for (const agg of aggregates) {
            periods.push(agg.period)
            tickets.push(agg.tickets)
            iterations.push(agg.iterations)
            iterations_to_tickets.push(agg.iterations / agg.tickets)
            people.push(agg.people)
        }

        return {
            success: true,
            data: {
                index: index,
                name: set.title,
                periods: periods,
                tickets: tickets,
                iterations: iterations,
                iterations_to_tickets: iterations_to_tickets,
                people: people,
            }
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: EMPTY_TICKETS_WITH_ITERATIONS_AGGREGATES
        }
    }
}
