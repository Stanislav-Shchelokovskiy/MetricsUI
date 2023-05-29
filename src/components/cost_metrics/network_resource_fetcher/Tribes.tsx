import { SUPPORT_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'

export interface Tribe {
    name: string
}

export async function fetchTribes(): Promise<FetchResult<Array<Tribe>>> {
    return fetchArray(`${SUPPORT_METRICS_END_POINT}/CostMetrics/Tribes`)
}
