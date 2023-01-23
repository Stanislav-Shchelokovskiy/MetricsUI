import FetchResult from '../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'
import { Set, getAliasedSet } from '../store/SetsReducer'


interface TicketsWithIterationsAggregate {
    period: string
    tickets: number
    iterations: number
    iterations_to_tickets: number
    people: number
}

export interface TicketsWithIterationsAggregates {
    periods: Array<string | number>
    tickets: Array<number>
    iterations: Array<number>
    iterations_to_tickets: Array<number>
    people: Array<number>
}


export const EMPTY_TICKETS_WITH_ITERATIONS_AGGREGATES = {
    periods: [],
    tickets: [],
    iterations: [],
    iterations_to_tickets: [],
    people: [],
}


export async function fetchTicketsWithIterationsAggregates(
    groupByPeriod: string,
    rangeStart: string,
    rangeEnd: string,
    trackedCustomersGroupsModeEnabled: boolean,
    isTicketsMetricSelected: boolean,
    set: Set,
): Promise<FetchResult<TicketsWithIterationsAggregates>> {
    try {
        const aggregates: Array<TicketsWithIterationsAggregate> = await fetch(
            `${SUPPORT_ANALYTICS_END_POINT}/get_tickets_with_iterations_aggregates?` +
            `group_by_period=${groupByPeriod}` +
            `&range_start=${rangeStart}` +
            `&range_end=${rangeEnd}` +
            `&tracked_customer_groups_mode_enabled=${trackedCustomersGroupsModeEnabled}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...getAliasedSet(set),
                    Percentile: { metric: (isTicketsMetricSelected ? 'tickets' : 'iterations'), value: set.percentile }
                }),
            },
        ).then(response => response.json())

        const periods = []
        const tickets = []
        const iterations = []
        const iterations_to_tickets = []
        const people = []
        let periodNumber = 1
        for (const agg of aggregates) {
            periods.push(trackedCustomersGroupsModeEnabled ? periodNumber++ : agg.period)
            tickets.push(agg.tickets)
            iterations.push(agg.iterations)
            iterations_to_tickets.push(agg.iterations / agg.tickets)
            people.push(agg.people)
        }

        return {
            success: true,
            data: {
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
