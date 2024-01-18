import FetchResult from '../common/Typing'
import { Metric } from '../common/components/multiset_container/graph/MetricSelector'
import { getFetchResult } from '../common/network_resource_fetcher/FetchOrDefault'
import { HelpItem } from '../common/Typing'
import {
    fetchMetrics as fetchSupportMetrics,
    fetchMetricDesc as fetchSupportMetricsDesc
} from '../support_metrics/network_resource_fetcher/Metrics'
import {
    fetchMetrics as fetchCostMetrics,
    fetchMetricDesc as fetchCostMetricsDesc
} from '../cost_metrics/network_resource_fetcher/Metrics'
import {
    fetchMetrics as fetchPerformanceMetrics,
    fetchMetricDesc as fetchPerformanceMetricsDesc
} from '../performance_metrics/network_resource_fetcher/Metrics'
import { title } from 'process'

export async function fetchMetrics(): Promise<FetchResult<Array<Metric>>> {
    const metrics: Array<Metric> = await Promise.all([
        fetchSupportMetrics().then(x => x.data),
        fetchCostMetrics().then(x => x.data),
        fetchPerformanceMetrics().then(x => x.data),
    ]).then(res => res.reduce((a, b) => [...a, ...b]))
    return getFetchResult<Array<Metric>>(true, metrics)
}

export async function fetchMetricDesc(metric: string, signal: AbortSignal): Promise<FetchResult<HelpItem>> {
    const helpItem: HelpItem = await Promise.all([
        fetchSupportMetricsDesc(metric, signal).then(x => x.data),
        fetchCostMetricsDesc(metric, signal).then(x => x.data),
        fetchPerformanceMetricsDesc(metric, signal).then(x => x.data),
    ]).then(res => res.find(x => !!x.title) || res[0])
    return getFetchResult<HelpItem>(true, helpItem)
}
