import { SUPPORT_ANALYTICS_END_POINT } from '../../../common/EndPoint'
import FetchResult from '../../../common/Interfaces'
import { fetchArray } from '../../../common/network_resource_fetcher/FetchOrDefault'

export interface TicketsTag {
    id: string
    name: string
}

export async function fetchTicketsTags(): Promise<FetchResult<Array<TicketsTag>>> {
    return fetchArray(`${SUPPORT_ANALYTICS_END_POINT}/get_tickets_tags`)
}
