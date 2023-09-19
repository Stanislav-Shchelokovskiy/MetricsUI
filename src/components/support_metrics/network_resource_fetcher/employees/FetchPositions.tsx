import { SUPPORT_METRICS_END_POINT } from '../../../common/EndPoint'
import FetchResult from '../../../common/Typing'
import { fetchArray } from '../../../common/network_resource_fetcher/FetchOrDefault'

export interface Position {
    id: string
    name: string
}

export async function fetchPositions(): Promise<FetchResult<Array<Position>>> {
    return fetchArray(`${SUPPORT_METRICS_END_POINT}/Positions`)
}
