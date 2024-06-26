import { COST_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Typing'
import { fetchArray, fetchConvert } from '../../common/network_resource_fetcher/FetchOrDefault'
import { Metric } from '../../common/components/multiset_container/graph/metric_selector/Metric'
import { HelpItem } from '../../common/Typing'


export async function fetchMetrics(): Promise<FetchResult<Array<Metric>>> {
    return fetchArray(`${COST_METRICS_END_POINT}/CostMetrics/Metrics`)
}

function converter(value: HelpItem | undefined): HelpItem {
    return value || {
        title: '',
        content: ''
    }
}

export async function fetchMetricDesc(metric: string, signal: AbortSignal): Promise<FetchResult<HelpItem>> {
    return fetchConvert(converter,
        `${COST_METRICS_END_POINT}/CostMetrics/MetricDescription?` +
        `metric=${metric}`,
        { signal: signal },
    )
}
