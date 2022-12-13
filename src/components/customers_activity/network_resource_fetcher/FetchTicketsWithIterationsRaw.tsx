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
    user_groups: string
    ticket_tags: string
    reply_id: string
    control_id: string
    feature_id: string
}


export const EMPTY_TICKETS_WITH_ITERATIONS_RAW = {
    user_id: '',
    tribe_id: '',
    scid: '',
    ticket_type: 0,
    creation_date: '',
    iterations: 0,
    user_groups: '',
    ticket_tags: '',
    reply_id: '',
    control_id: '',
    feature_id: '',
}


export const fetchTicketsWithIterationsRaw: (
    range_start: string,
    range_end: string,
    customersGroups: FilterParametersNode<string>,
    ticketsTypes: FilterParametersNode<number>,
    ticketsTags: FilterParametersNode<number>,
    tribes: FilterParametersNode<string>,
    repliesTypes: FilterParametersNode<string>,
    controls: FilterParametersNode<string>,
    features: FilterParametersNode<string>,
) => Promise<FetchResult<Array<TicketsWithIterationsRaw>>> =
    async function (
        range_start: string,
        range_end: string,
        customersGroups: FilterParametersNode<string>,
        ticketsTypes: FilterParametersNode<number>,
        ticketsTags: FilterParametersNode<number>,
        tribes: FilterParametersNode<string>,
        repliesTypes: FilterParametersNode<string>,
        controls: FilterParametersNode<string>,
        features: FilterParametersNode<string>,
    ) {
        try {
            const raw_data: Array<TicketsWithIterationsRaw> = await fetch(
                `${SUPPORT_ANALYTICS_END_POINT}/get_tickets_with_iterations_raw?` +
                new URLSearchParams({
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
                        controls: controls,
                        features: features,
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
