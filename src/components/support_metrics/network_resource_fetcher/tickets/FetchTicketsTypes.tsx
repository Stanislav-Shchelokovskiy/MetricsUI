import { SUPPORT_METRICS_END_POINT } from '../../../common/EndPoint'
import FetchResult from '../../../common/Interfaces'
import { fetchArray } from '../../../common/network_resource_fetcher/FetchOrDefault'

export interface TicketsType {
    id: number
    name: string
}

export async function fetchTicketsTypes(): Promise<FetchResult<Array<TicketsType>>> {
    return fetchArray(`${SUPPORT_METRICS_END_POINT}/TicketsTypes`)
}
