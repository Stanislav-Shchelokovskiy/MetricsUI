import FetchResult from '../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'
import { SetState } from '../store/SetsReducer'


export interface TicketsWithIterationsRaw {
    user_id: string
    tribe_id: string
    scid: string
    ticket_type: number
    creation_date: string
    iterations: number
    reply: string
    component: string
    feature: string
}


export const EMPTY_TICKETS_WITH_ITERATIONS_RAW = {
    user_id: '',
    tribe_id: '',
    scid: '',
    ticket_type: 0,
    creation_date: '',
    iterations: 0,
    reply: '',
    component: '',
    feature: '',
}


export async function fetchTicketsWithIterationsRaw(
    rangeStart: string,
    rangeEnd: string,
    trackedCustomersGroupsModeEnabled: boolean,
    isTicketsMetricSelected: boolean,
    set: SetState,
): Promise<FetchResult<Array<TicketsWithIterationsRaw>>> {
    try {
        const raw_data: Array<TicketsWithIterationsRaw> = await fetch(
            `${SUPPORT_ANALYTICS_END_POINT}/get_tickets_with_iterations_raw?` +
            `&range_start=${rangeStart}` +
            `&range_end=${rangeEnd}` +
            `&tracked_customer_groups_mode_enabled=${trackedCustomersGroupsModeEnabled}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Percentile: { metric: (isTicketsMetricSelected ? 'tickets' : 'iterations'), value: set.percentile },
                    Tribes: set.tribes,
                    Platforms: set.platforms,
                    Products: set.products,
                    'Ticket tags': set.ticketsTags,
                    'Ticket types': set.ticketsTypes,
                    'User groups': set.customersGroups,
                    'User types': set.customersTypes,
                    'User conversion types': set.conversionsTypes,
                    'Employees positions': set.positions,
                    'Employees tribes': set.empTribes,
                    'Employees': set.employees,
                    'CAT replies types': set.repliesTypes,
                    'CAT components': set.components,
                    'CAT features': set.features,
                    'Customers': set.customers,
                }),
            },
        ).then(response => response.json())
        return {
            success: true,
            data: raw_data
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: [EMPTY_TICKETS_WITH_ITERATIONS_RAW]
        }
    }
}
