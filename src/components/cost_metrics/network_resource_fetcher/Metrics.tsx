import { COST_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'
import { Metric } from '../../common/components/multiset_container/graph/MetricSelector'

export async function fetchMetrics(): Promise<FetchResult<Array<Metric>>> {
    return fetchArray(`${COST_METRICS_END_POINT}/CostMetrics/Metrics`)
}
