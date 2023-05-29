import { SUPPORT_ANALYTICS_END_POINT } from '../../../common/EndPoint'
import FetchResult from '../../../common/Interfaces'
import { fetchArray } from '../../../common/network_resource_fetcher/FetchOrDefault'

export interface Position {
    id: string
    name: string
}

export async function fetchPositions(): Promise<FetchResult<Array<Position>>> {
    return fetchArray(`${SUPPORT_ANALYTICS_END_POINT}/get_positions`)
}
