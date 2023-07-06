import { SUPPORT_METRICS_END_POINT } from '../../../common/EndPoint'
import FetchResult from '../../../common/Interfaces'
import { fetchArray } from '../../../common/network_resource_fetcher/FetchOrDefault'

export interface TicketStatus {
    id: string
    name: string
}

export async function fetchTicketStatuses(): Promise<FetchResult<Array<TicketStatus>>> {
    return fetchArray(`${SUPPORT_METRICS_END_POINT}/TicketStatuses`)
}
