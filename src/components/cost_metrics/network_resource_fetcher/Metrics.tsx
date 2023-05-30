import { SUPPORT_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'

interface Metric {
    name: string
}

export async function fetchMetrics(): Promise<FetchResult<Array<Metric>>> {
    return fetchArray(`${SUPPORT_METRICS_END_POINT}/CostMetrics/Metrics`)
}
