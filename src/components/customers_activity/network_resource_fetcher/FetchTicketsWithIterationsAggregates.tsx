import FetchResult from '../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'
import { FilterParametersNode } from '../store/SetsReducer'


interface TicketsWithIterationsAggregate {
    period: string
    tickets: number
    iterations: number
    iterations_to_tickets: number
    people: number
}

export interface TicketsWithIterationsAggregates {
    periods: Array<string>
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
    positions: FilterParametersNode<string>,
    empTribes: FilterParametersNode<string>,
    employees: FilterParametersNode<string>,
    selectTop: number,
): Promise<FetchResult<TicketsWithIterationsAggregates>> {
    try {
        const aggregates: Array<TicketsWithIterationsAggregate> = await fetch(
            `${SUPPORT_ANALYTICS_END_POINT}/get_tickets_with_iterations_aggregates?` +
                `group_by_period=${groupByPeriod}` +
                `&range_start=${rangeStart}` +
                `&range_end=${rangeEnd}` +
                `&tracked_customer_groups_mode_enabled=${trackedCustomersGroupsModeEnabled}` +
                (isTicketsMetricSelected ? `&tickets_rank=${selectTop}` : `&iterations_rank=${selectTop}`),
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
                    positions: positions,
                    emp_tribes: empTribes,
                    employees: employees,
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
