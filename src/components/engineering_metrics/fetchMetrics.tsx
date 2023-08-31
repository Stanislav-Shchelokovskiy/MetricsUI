import FetchResult from '../common/Interfaces'
import { fetchMetrics as fetchSupportMetrics } from '../support_metrics/network_resource_fetcher/Metrics'
import { fetchMetrics as fetchCostMetrics } from '../cost_metrics/network_resource_fetcher/Metrics'
import { Metric } from '../common/components/multiset_container/graph/MetricSelector'
import { getFetchResult } from '../common/network_resource_fetcher/FetchOrDefault'

export async function fetchMetrics(): Promise<FetchResult<Array<Metric>>> {
    const metrics: Array<Metric>  = await Promise.all([
        fetchSupportMetrics().then(x=>x.data),
        fetchCostMetrics().then(x=>x.data),
    ]).then(res => res.reduce((a, b) => [...a, ...b]))
    return getFetchResult<Array<Metric>>(true, metrics)
}
