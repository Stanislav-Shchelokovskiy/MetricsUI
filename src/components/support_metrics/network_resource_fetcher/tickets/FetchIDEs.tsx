import { SUPPORT_METRICS_END_POINT } from '../../../common/EndPoint'
import FetchResult from '../../../common/Typing'
import { fetchArray } from '../../../common/network_resource_fetcher/FetchOrDefault'

export interface IDE {
    id: string
    name: string
}

export async function fetchIDEs(): Promise<FetchResult<Array<IDE>>> {
    return fetchArray(`${SUPPORT_METRICS_END_POINT}/Ides`)
}
