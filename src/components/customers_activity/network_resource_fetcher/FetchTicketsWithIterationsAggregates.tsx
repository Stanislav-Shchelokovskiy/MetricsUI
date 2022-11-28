import FetchResult from '../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'


interface TicketsWithIterationsAggregate {
    period: string
    tickets: number
    iterations: number
}

export interface TicketsWithIterationsAggregates {
    periods: Array<string>
    tickets: Array<number>
    iterations: Array<number>
}

export const EMPTY_TICKETS_WITH_ITERATIONS_AGGREGATES = {
    periods: [],
    tickets: [],
    iterations: [],
}

export const fetchTicketsWithIterationsAggregates: (
    group_by_period: string,
    range_start: string,
    range_end: string,) => Promise<FetchResult<TicketsWithIterationsAggregates>> =
    async function (
        group_by_period: string,
        range_start: string,
        range_end: string) {
        try {
            const aggregates: Array<TicketsWithIterationsAggregate> = await fetch(
                `${SUPPORT_ANALYTICS_END_POINT}/get_tickets_with_iterations_aggregates?` +
                new URLSearchParams({
                    group_by_period: group_by_period,
                    range_start: range_start,
                    range_end: range_end,
                })).then(response => response.json())


            const periods = aggregates.map(aggregate => aggregate.period)
            const tickets = aggregates.map(aggregate => aggregate.tickets)
            const iterations = aggregates.map(aggregate => aggregate.iterations)
            return {
                success: true,
                data: {
                    periods: periods,
                    tickets: tickets,
                    iterations: iterations,
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
