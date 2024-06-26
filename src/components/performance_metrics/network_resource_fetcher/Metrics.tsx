import { PERFORMANCE_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Typing'
import { fetchArray, fetchConvert } from '../../common/network_resource_fetcher/FetchOrDefault'
import { Metric } from '../../common/components/multiset_container/graph/metric_selector/Metric'
import { HelpItem } from '../../common/Typing'

export async function fetchMetrics(): Promise<FetchResult<Array<Metric>>> {
    return fetchArray(`${PERFORMANCE_METRICS_END_POINT}/Metrics`)
}

export async function fetchMetricDesc(metric: string, signal: AbortSignal): Promise<FetchResult<HelpItem>> {
    return fetchConvert(converter,
        `${PERFORMANCE_METRICS_END_POINT}/MetricDescription?` +
        `metric=${metric}`,
        { signal: signal },
    )
}

function converter(value: HelpItem | undefined): HelpItem {
    return value || {
        title: '',
        content: ''
    }
}