import FetchResult from '../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'
import { FilterParametersNode } from '../store/SetsReducer'


interface TicketsWithIterationsAggregate {
    period: string
    tickets: number
    iterations: number
    people: number
}

export interface TicketsWithIterationsAggregates {
    periods: Array<string>
    tickets: Array<number>
    iterations: Array<number>
    people: Array<number>
}


export const EMPTY_TICKETS_WITH_ITERATIONS_AGGREGATES = {
    periods: [],
    tickets: [],
    iterations: [],
    people: [],
}


export const fetchTicketsWithIterationsAggregates: (
    group_by_period: string,
    range_start: string,
    range_end: string,
    customersGroups: FilterParametersNode<string>,
    ticketsTypes: FilterParametersNode<number>,
    ticketsTags: FilterParametersNode<number>,
    tribes: FilterParametersNode<string>,
    repliesTypes: FilterParametersNode<string>,
    components: FilterParametersNode<string>,
    features: FilterParametersNode<string>,
    customersTypes: FilterParametersNode<number>,
    conversionsTypes: FilterParametersNode<number>,
    platforms: FilterParametersNode<string>,
    products: FilterParametersNode<string>,
) => Promise<FetchResult<TicketsWithIterationsAggregates>> =
    async function (
        group_by_period: string,
        range_start: string,
        range_end: string,
        customersGroups: FilterParametersNode<string>,
        ticketsTypes: FilterParametersNode<number>,
        ticketsTags: FilterParametersNode<number>,
        tribes: FilterParametersNode<string>,
        repliesTypes: FilterParametersNode<string>,
        components: FilterParametersNode<string>,
        features: FilterParametersNode<string>,
        customersTypes: FilterParametersNode<number>,
        conversionsTypes: FilterParametersNode<number>,
        platforms: FilterParametersNode<string>,
        products: FilterParametersNode<string>,
    ) {
        try {
            const aggregates: Array<TicketsWithIterationsAggregate> = await fetch(
                `${SUPPORT_ANALYTICS_END_POINT}/get_tickets_with_iterations_aggregates?` +
                new URLSearchParams({
                    group_by_period: group_by_period,
                    range_start: range_start,
                    range_end: range_end,
                }),
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        customers_groups: customersGroups,
                        tickets_types: ticketsTypes,
                        tickets_tags: ticketsTags,
                        tribes: tribes,
                        replies_types: repliesTypes,
                        components: components,
                        features: features,
                        license_statuses: customersTypes,
                        conversion_statuses: conversionsTypes,
                        platforms: platforms,
                        products: products,
                    }),
                },
            ).then(response => response.json())

            const periods = []
            const tickets = []
            const iterations = []
            const people = []
            for (const agg of aggregates) {
                periods.push(agg.period)
                tickets.push(agg.tickets)
                iterations.push(agg.iterations)
                people.push(agg.people)
            }

            return {
                success: true,
                data: {
                    periods: periods,
                    tickets: tickets,
                    iterations: iterations,
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
