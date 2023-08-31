import { SUPPORT_METRICS_END_POINT } from '../../common/EndPoint'
import { fetchArray, fetchConvert } from '../../common/network_resource_fetcher/FetchOrDefault'
import FetchResult from '../../common/Interfaces'
import { Metric } from '../../common/components/multiset_container/graph/MetricSelector'
import { HelpItem } from '../../common/Interfaces'

export async function fetchMetrics(): Promise<FetchResult<Array<Metric>>> {
    return fetchArray(`${SUPPORT_METRICS_END_POINT}/Metrics`)
}

function converter(value: HelpItem | undefined): HelpItem {
    return value || {
        title: '',
        content: ''
    }
}

export async function fetchMetricDesc(metric: string): Promise<FetchResult<HelpItem>> {
    return fetchConvert(converter,
        `${SUPPORT_METRICS_END_POINT}/Help/MetricDescription?` +
        `metric=${metric}`
    )
}
