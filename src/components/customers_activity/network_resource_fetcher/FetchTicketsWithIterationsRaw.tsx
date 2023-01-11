import FetchResult from '../../common/Interfaces'
import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'
import { FilterParametersNode } from '../store/SetsReducer'


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
    range_start: string,
    range_end: string,
    trackedCustomersGroupsModeEnabled: boolean,
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
): Promise<FetchResult<Array<TicketsWithIterationsRaw>>> {
    try {
        const raw_data: Array<TicketsWithIterationsRaw> = await fetch(
            `${SUPPORT_ANALYTICS_END_POINT}/get_tickets_with_iterations_raw?` +
            new URLSearchParams({
                range_start: range_start,
                range_end: range_end,
                tracked_customer_groups_mode_enabled: trackedCustomersGroupsModeEnabled.toString(),
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
                    positions: positions,
                    emp_tribes: empTribes,
                    employees: employees,
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
