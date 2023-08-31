import { PERFORMANCE_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchArray, fetchConvert } from '../../common/network_resource_fetcher/FetchOrDefault'
import { Metric } from '../../common/components/multiset_container/graph/MetricSelector'
import { HelpItem } from '../../common/Interfaces'

export async function fetchMetrics(): Promise<FetchResult<Array<Metric>>> {
    return fetchArray(`${PERFORMANCE_METRICS_END_POINT}/Metrics`)
}

export async function fetchMetricDesc(metric: string): Promise<FetchResult<HelpItem>> {
    return fetchConvert(converter,
        `${PERFORMANCE_METRICS_END_POINT}/MetricDescription?` +
        `metric=${metric}`
    )
}

function converter(value: HelpItem | undefined): HelpItem {
    return value || {
        title: '',
        content: ''
    }
}