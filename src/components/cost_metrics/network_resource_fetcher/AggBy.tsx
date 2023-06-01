import { SUPPORT_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'

export interface AggBy {
    name: string
}

export async function fetchAggBy(): Promise<FetchResult<Array<AggBy>>> {
    return fetchArray(`${SUPPORT_METRICS_END_POINT}/CostMetrics/AggBy`)
}
