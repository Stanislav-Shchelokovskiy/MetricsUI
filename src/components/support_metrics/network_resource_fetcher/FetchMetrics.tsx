import { SUPPORT_METRICS_END_POINT } from '../../common/EndPoint'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'
import FetchResult from '../../common/Interfaces'
import { Metric } from '../../common/components/multiset_container/graph/MetricSelector'

export async function fetchMetrics(): Promise<FetchResult<Array<Metric>>> {
    return fetchArray(`${SUPPORT_METRICS_END_POINT}/Metrics`)
}
