import { SUPPORT_METRICS_END_POINT } from '../../../common/EndPoint'
import FetchResult from '../../../common/Typing'
import { fetchArray } from '../../../common/network_resource_fetcher/FetchOrDefault'

export interface TicketsTag {
    id: string
    name: string
}

export async function fetchTicketsTags(): Promise<FetchResult<Array<TicketsTag>>> {
    return fetchArray(`${SUPPORT_METRICS_END_POINT}/TicketsTags`)
}
